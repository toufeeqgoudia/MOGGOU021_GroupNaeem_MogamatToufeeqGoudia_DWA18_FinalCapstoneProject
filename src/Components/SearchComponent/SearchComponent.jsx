import { useState } from "react";
import { genreMapping } from "../../Utils/genreMapping";
import Fuse from "fuse.js";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const SearchComponent = ({ shows, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("")
  const [sortDate, setSortDate] = useState("newest")
  const [sortTitle, setSortTitle] = useState("asc") 

  const handleSearch = (event) => {
    const { value } = event.target
    setSearchTerm(value)
    performSearch(value, selectedGenre, sortDate, sortTitle)
  }

  const handleGenreChange = (event) => {
    const { value } = event.target
    setSelectedGenre(value)
    performSearch(searchTerm, value, sortDate, sortTitle)
  }

  const handleSortDateChange = (event) => {
    const { value } = event.target
    setSortDate(value)
    performSearch(searchTerm, selectedGenre, value, sortTitle)
  }

  const handleSortTitleChange = (event) => {
    const { value } = event.target
    setSortTitle(value)
    performSearch(searchTerm, selectedGenre, sortDate, value)
  }

  const sortByDate = (data, sortDate) => {
    if (sortDate === "newest") {
      return data.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (sortDate === "oldest") {
      return data.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    }
  }

  const sortByName = (data, sortTitle) => {
    if (sortTitle === "asc") {
      return data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortTitle === "desc") {
      return data.sort((a, b) => b.title.localeCompare(a.title));
    }
  }

  const handleClearAll = () => {
    setSearchTerm("")
    setSelectedGenre("")
    setSortDate("")
    setSortTitle("")

    performSearch("", "", "", "")
  }

  const performSearch = (searchTerm, genre, sortDate, sortTitle) => {
    const fuseOptions = {
      keys: ["title"],
      threshold: 0.3,
    }

    if (genre !== "") {
      fuseOptions.keys.push("genres")
    }

    const fuse = new Fuse(shows, fuseOptions)

    let results = fuse.search(searchTerm).map((item) => item.item)

    let sortedResults = shows

    if (genre !== "") {
      sortedResults = sortedResults.filter((show) => 
        show.genres.includes(parseInt(genre))
      )
    }

    if (sortDate === "newest" || sortDate === "oldest") {
      sortedResults = sortByDate(sortedResults, sortDate)
    }

    if (sortTitle === "asc" || sortTitle === "desc") {
      sortedResults = sortByName(sortedResults, sortTitle)
    }

    onSearchResults(results.length > 0 ? results : sortedResults)

    if (!searchTerm && !genre && sortDate === "newest" && sortTitle === "asc") {
      onSearchResults(shows);
      return;
    }
  }

  return (
    <div className="max-w-screen mt-16 flex flex-col">
      <div className="flex flex-row justify-between">
        <Paper
          component="form"
          sx={{
            margin: "5px 5px",
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "60%",
            height: "50px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Podcasts"
            inputProps={{ "aria-label": "search google maps" }}
            value={searchTerm}
            onChange={handleSearch}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        <Paper
          component="form"
          sx={{
            margin: "5px 5px",
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "130px",
            height: "50px",
            justifyContent: "center",
          }}
        >
          <Button type="button" sx={{ p: "10px" }} aria-label="sort by title A-Z" value="asc" onClick={handleSortTitleChange}>
            A - Z
          </Button>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Button type="button" sx={{ p: "10px" }} aria-label="sort by title Z-A" value="desc" onClick={handleSortTitleChange}>
            Z - A
          </Button>
        </Paper>
      </div>

      <div className="flex flex-row justify-between">
        <FormControl
          component="form"
          sx={{
            margin: "5px 5px",
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "60%",
            height: "50px",
          }}
        >
          <Select value={selectedGenre} onChange={handleGenreChange} displayEmpty>
            <MenuItem value="">All Genres</MenuItem>
            {Object.entries(genreMapping).map(([key, value]) => (
              <MenuItem key={key} value={key}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Paper
          component="form"
          sx={{
            margin: "5px 5px",
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "150px",
            height: "50px",
            justifyContent: "center",
          }}
        >
          <Button type="button" sx={{ p: "10px" }} aria-label="sort by date newest" value='newest' onClick={handleSortDateChange}>
            Date
            <ArrowUpwardIcon />
          </Button>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Button type="button" sx={{ p: "10px" }} aria-label="sort by date oldest" value="oldest" onClick={handleSortDateChange}>
            Date
            <ArrowDownwardIcon />
          </Button>
        </Paper>
      </div>

      <Button type="button" sx={{ p: "10px" }} onClick={handleClearAll}>
        Clear All
      </Button>
    </div>
  );
};

SearchComponent.propTypes = {
  shows: PropTypes.array,
  onSearchResults: PropTypes.func,
};

export default SearchComponent;

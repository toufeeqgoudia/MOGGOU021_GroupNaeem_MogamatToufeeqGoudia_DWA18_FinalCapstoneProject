
// import Fuse from 'fuse.js';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';

const SearchComponent = () => {
  return (
    <div className='max-w-screen px-3 flex flex-row justify-evenly'>
    <Paper
      component="form"
      sx={{ marginTop: '65px', p: '2px 4px', display: 'flex', alignItems: 'center', width: '40%' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Podcasts"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>

    <Paper
      component="form"
      sx={{ marginTop: '65px', p: '2px 4px', display: 'flex', alignItems: 'center', width: '20%', justifyContent: 'center' }}
    >
      <Button type="button" sx={{ p: '10px' }} aria-label="search">
        A - Z
      </Button>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Button type="button" sx={{ p: '10px' }} aria-label="search">
        Z - A
      </Button>
    </Paper>

    <Paper
      component="form"
      sx={{ marginTop: '65px', p: '2px 4px', display: 'flex', alignItems: 'center', width: '20%', justifyContent: 'center' }}
    >
      <Button type="button" sx={{ p: '10px' }} aria-label="search">
        Date
        <ArrowUpwardIcon />
      </Button>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Button type="button" sx={{ p: '10px' }} aria-label="search">
        Date
        <ArrowDownwardIcon />
      </Button>
    </Paper>
    </div>
  )
}

export default SearchComponent
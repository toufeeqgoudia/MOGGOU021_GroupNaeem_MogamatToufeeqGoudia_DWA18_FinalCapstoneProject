<!-- omit in toc -->
# PodHub

Welcome to PodHub!

<!-- omit in toc -->
## Table of Contents
- [User Stories](#user-stories)
- [Installation and Usage](#installation-and-usage)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Author](#author)

## User Stories

- Project is deployed to a custom Netlify URL
- All views in the app display correctly on the smallest mobile device available, “iPhone SE”. This can be emulated in Chrome Dev tools.
- All favicon information has been created an added correctly via https://realfavicongenerator.net/ 
- All metatag information has been created and added via https://metatags.io/

- All show data loaded via a fetch call from the https://podcast-api.netlify.app/shows
- When viewing a specific show data is loaded via fetch from individual show endpoint
- There is a loading state while initial data is being loaded
- There is a loading state while new data is being loaded

- User can view the details of a show broken down into seasons, sorted by number
- User can listen to any episode in a season of a show
- User can see a view where only episodes for a specifically selected season are shown
- User can toggle between different seasons for the same show

- User can see the name of all available shows on the platform
- User sees preview image of shows when browsing
- User sees the amount of seasons per show as a number when browsing
- User sees a human-readable date as to when a show was last updated
- User sees what genres (as genre titles) a show is associated with when browsing

- User sees a preview image of seasons for a specific show
- User sees the amount of episodes in a season as a number
- User can go back to a show view from a season-specific view

- User can mark specific episodes as favourites to find them again
- User can visit a view where they see all their favourites
- User can see the show and season of any episode in their favourites list
- Episodes related by season/show are grouped in favourites
- User is able to remove episodes from their favourites

- User can arrange the list of shows by title from A-Z
- User can arrange the list of shows by title from Z-A
- User can arrange the list of shows by date updated in ascending order
- User can arrange the list of shows by date updated in descending order
- User can filter shows by title through a text input
- User can find shows based on fuzzy matching of strings
- Automatically filter shows by genre if the genre label is clicked on

- User sees the date and time that an episode was added to their favourites list
- User can arrange favourites by show title from A-Z
- User can arrange favourites by show title from Z-A
- User can arrange favourites by date updated in ascending order
- User can arrange favourites by date updated in descending order

- Audio player shows current progress and episode length as timestamps
- Audio player is always visible, so the user can listen to episodes while they browse
- User is prompted to confirm they want to close the page when audio is playing
- App remembers which show and episode the user listened to last when returning to the platform
- App remembers which shows and episodes the user listened to all the way through
- App remembers the timestamp where the user stopped listening within a 10-second accuracy period of closing
- App remembers and shows the timestamp progress of any episode the user has started listening to
- User can "reset" all their progress, effectively removing their listening history

- User is presented with a sliding carousel of possible shows they might be interested in on the landing page
- User can to log in via https://app.supabase.com authentication
- User favourites are stored in https://app.supabase.com database
- User favourites are automatically synced when logged in, ensuring that they share favourites between devices
- Users can share their favourites as a publicly accessible URL

## Installation and Usage

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies - npm install
4. Start the development server - npm run dev
5. Open your web browser

## Dependencies

- @emotion/react
- @emotion/styled
- @mui/icons-material
- @mui/material
- @supabase/supabase-js
- fuse.js
- react
- react-dom
- react-router-dom
- react-slick
- slick-carousel
- zustand

## Dev Dependencies

- @types/react
- @types/react-dom
- @vitejs/plugin-react
- autoprefixer
- eslint
- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- postcss
- tailwindcss
- vite

## Author

Toufeeq Goudia
- Email: toufeeqgoudia@gmail.com
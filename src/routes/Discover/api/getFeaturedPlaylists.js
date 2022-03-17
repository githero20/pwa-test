import requestHelper from "./requestHelper";

const getFeaturedPlaylists = () => {
  return requestHelper("featured-playlists", "playlists");
};

export default getFeaturedPlaylists;

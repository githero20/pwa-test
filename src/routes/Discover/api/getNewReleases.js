import requestHelper from "./requestHelper";

const getNewReleases = () => {
  return requestHelper("new-releases", "albums");
};

export default getNewReleases;

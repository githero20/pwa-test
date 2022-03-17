import requestHelper from "./requestHelper";

const getGenres = () => {
  return requestHelper("categories", "categories");
};

export default getGenres;

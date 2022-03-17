import axios from "axios";
import config from "../../../config";
import URLSearchParams from "url-search-params";

const { api } = config;

const requestHelper = async (path, type) => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const {
    data: { access_token: token },
  } = await axios.post(api.authUrl, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${api.clientId}:${api.clientSecret}`)}`,
    },
  });

  const res = await axios.get(`${api.baseUrl}/browse/${path}?locale=en_US`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data[type].items;
};

export default requestHelper;

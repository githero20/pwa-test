const config = {
  api: {
    authUrl: "https://accounts.spotify.com/api/token",
    baseUrl: "https://api.spotify.com/v1",
    clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  },
};

export default config;

export var frontend_url = process.env.FRONTEND_URL;
export var public_key = process.env.VAPID_PUBLIC_KEY;

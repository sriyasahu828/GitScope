import axios from "axios";

const headers = {
  Accept: "application/vnd.github+json",
};

export const getUser = async (username) => {
  const res = await axios.get(
    `https://api.github.com/users/${username}`,
    { headers }
  );
  return res.data;
};

export const getRepos = async (username) => {
  const res = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    { headers }
  );
  return res.data;
};
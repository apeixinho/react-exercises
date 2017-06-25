import axios from 'axios';

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(username) {
  return axios.get("https://api.github.com/users/" + username + params)
    .then((user) => user.data);
}

function getRepositories(username) {
  return axios.get(
    "https://api.github.com/users/" + username +
    "/repos" + params + "&per_page=100")
}

function getStartCount(repositories) {
  return repositories.data.reduce((count, repo) => count + repo.stargazers_count, 0);
}

function calculateScore(profile, repositories) {
  const followers = profile.followers;
  const totalStars = getStartCount(repositories);

  return (followers * 3 + totalStars)
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  return axios.all([
    getProfile(player),
    getRepositories(player)
  ]).then((data) => {
    const profile = data[0];
    const repos = data[1];
    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export function battle(players) {
  return axios.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError);
}

export function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

  return axios.get(encodedURI)
    .then((response) => response.data.items);
}
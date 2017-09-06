import axios from 'axios';

const defaultUser = 'github';
const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

function getProfile(username = defaultUser) {
  return axios.get(`https://api.github.com/users/${username}${params}`)
    .then((user) => user.data);
}

function getRepositories(username = defaultUser) {
  return axios.get(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`)
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

async function getUserData(player) {
  try {
    const userData = await Promise.all([getProfile(player), getRepositories(player)]);
    const [profile, repos] = userData;
    return {
      profile,
      score: calculateScore(profile, repos)
    };
  } catch (error) {
    console.warn("Error in getUserData", error);

  }
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export async function battle(players) {
  try {
    const usersData = await Promise.all(players.map(getUserData));
    return sortPlayers(usersData);
  } catch (error) {
    console.warn("Error in battle", error);
  }

}

export async function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

  try {
    const response = await axios.get(encodedURI);
    return response.data.items;
  } catch (error) {
    console.warn("Error in fetchPopularRepos", error);
  }
}
const find = () => {
  const usernameElement = document.getElementById('username');
  if (usernameElement) {
    github(usernameElement.value);
  }
};

async function github(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('User not found or API request failed');
    }

    const data = await response.json();

    const container = document.getElementById('container');
    if (container) {
      container.innerHTML = `
        <h1>${sanitize(data.login)}</h1>
        <img src="${sanitize(data.avatar_url)}" alt="User Avatar">
        <p>following: ${sanitize(data.following)}</p>
        <p>public repos: ${sanitize(data.public_repos)}</p>
        <p>repos url: <a href="${sanitize(data.repos_url)}">${sanitize(data.repos_url)}</a></p>
      `;
    }

    const repo = await fetch(`https://api.github.com/users/${username}/repos`);
    const allrepo = await repo.json();
    const allRepos = document.querySelector('.allRepos');
    if (allRepos) {
      allRepos.innerHTML = allrepo.map(repo => `
        <div class="repos">
          <h5>name: ${sanitize(repo.name)}</h5>
          <h5>created at: ${sanitize(repo.created_at)}</h5>
          <h5>git url: <a href="${sanitize(repo.git_url)}">${repo.git_url}</a></h5>
          <h5>size: ${sanitize(repo.size)}</h5>
          <h5>language: ${sanitize(repo.language)}</h5>
        </div>
      `).join('');
    }
    
  } catch (error) {
    console.error(error); 
    alert("Please verify the username or check your network connection.");
  }
}

function sanitize(input) {
  const temp = document.createElement('div');
  temp.textContent = input;
  return temp.innerHTML;
}

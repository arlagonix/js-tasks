class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

async function loadJson(url) {
  const response = await fetch(url);
  if (response.status === 200) {
    const json = await response.json();
    return json;
  }
  throw new HttpError(response);
}

// Ask for a user name until github returns a valid user
async function demoGithubUser() {
  let repeat = true;
  let user;
  while (repeat) {
    let name = prompt("Enter a name?", "iliakan");
    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      repeat = false;
    } catch (err) {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        continue;
      }
      throw err;
    }
  }
  alert(`Full name: ${user.name}.`);
  return user;
}

demoGithubUser();

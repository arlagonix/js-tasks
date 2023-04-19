// Rewrite using async/await

// Source: tasks in the end of https://javascript.info/async-await

function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}

loadJson("https://javascript.info/no-such-user.json").catch(alert); // Error: 404

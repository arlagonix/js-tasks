/*
Fetch Data from an API:

Write a function that fetches data from a public API (e.g., JSONPlaceholder, PokeAPI, or Open Trivia API) using the Fetch API or XMLHttpRequest. Use Promises to handle the asynchronous nature of the request, and then display the fetched data on the console or the DOM.
 */

// Simple data fetching
if (false) {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((json) => console.log(json));
}

// Self-invoking function
if (true) {
  (async function () {
    await fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((json) => console.log(json));
  })();
}

// Create a post
if (false) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

async function loadJson1(url) {
  const response = await fetch(url);
  if (response.status === 200) {
    const json = await response.json();
    return json;
  }
  throw new Error(response.status);
}

loadJson1("https://javascript.info/no-such-user.json").catch(alert); // Error: 404

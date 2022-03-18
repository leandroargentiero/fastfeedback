/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (url, token) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      token,
      credentials: 'same-origin'
    })
  });

  return res.json();
};

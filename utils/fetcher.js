/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (...args) => {
  const res = await fetch(...args);

  return res.json();
};

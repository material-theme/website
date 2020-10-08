import fetch from 'isomorphic-fetch';

export default async (req, res) => {
  const info = await (await fetch('https://opencollective.com/material-theme.json')).json();
  const members = await (await fetch('https://opencollective.com/material-theme/members.json?limit=3&offset=0')).json();

  res.json({
    info,
    members,
  });
};

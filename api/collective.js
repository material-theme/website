import fetch from 'isomorphic-fetch';

export default async (req, res) => {
  const info = await (await fetch('https://opencollective.com/material-theme.json')).json();
  const golds = await (await fetch('https://opencollective.com/material-theme/tiers/gold-sponsor/all.json')).json();
  const silvers = await (await fetch('https://opencollective.com/material-theme/tiers/silver-sponsor/all.json')).json();
  const backers = await (await fetch('https://opencollective.com/material-theme/tiers/backer/all.json')).json();
  const donations = await (await fetch('https://opencollective.com/material-theme/tiers/donation/all.json')).json();

  const members = [
    ...donations,
    ...backers,
    ...silvers,
    ...golds,
  ].slice(-8).reverse();

  res.json({
    info,
    members,
  });
};

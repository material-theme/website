import fetch from 'isomorphic-fetch';

export default async (req, res) => {
  const info = await (await fetch('https://opencollective.com/material-theme.json')).json();
  const golds = await (await fetch('https://opencollective.com/material-theme/tiers/gold-sponsor/all.json')).json();
  const silvers = await (await fetch('https://opencollective.com/material-theme/tiers/silver-sponsor/all.json')).json();
  const backers = await (await fetch('https://opencollective.com/material-theme/tiers/backer/all.json')).json();
  const donations = await (await fetch('https://opencollective.com/material-theme/tiers/donation/all.json')).json();

  const oneOf = {
    bonusfinder: {
      label: 'bonusfinder',
      found: false,
    },
  };

  const members = [
    ...golds,
    ...silvers,
    ...backers,
    ...donations,
  ]
    .filter((member) => {
      const isBonusFinder = member.name.toLowerCase().includes(oneOf.bonusfinder.label);
      if (isBonusFinder && oneOf.bonusfinder.found) {
        return false;
      }

      oneOf.bonusfinder.found = isBonusFinder;
      return true;
    })
    .slice(0, 8);

  res.json({
    info,
    members,
  });
};

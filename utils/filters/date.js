const appendSuffix = (n) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

module.exports = (value) => {
  const dateObject = new Date(value);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dayWithSuffix = appendSuffix(dateObject.getDate());

  return `${dayWithSuffix} ${
    months[dateObject.getMonth()]
  } ${dateObject.getFullYear()}`;
};

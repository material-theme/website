/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  IS_DEV: process.env.NODE_ENV !== 'production',
  IS_PROD: process.env.NODE_ENV === 'production',
};

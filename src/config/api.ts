import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env` });

export default {
  version: 1,
  issuer: process.env.API_ISSUER,
  secret: process.env.API_SECRET,
};

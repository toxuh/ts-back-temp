import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env` });

export default {
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
};

import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env` });

const dbSettings = {
  collection: process.env.DB_COLLECTION,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export default `mongodb+srv://${dbSettings.user}:${dbSettings.password}@ts.iakxc.mongodb.net/${dbSettings.collection}?retryWrites=true&w=majority`;

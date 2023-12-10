import { type Db, MongoClient } from "mongodb";

import { env } from "@/env.mjs";

const uri = env.DATABASE_URL;

export const getDB = async (): Promise<Db> => {
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return db;
};

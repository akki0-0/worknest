import { Collection, Db } from "mongodb";
import mongodbClientPromise from "./mongodb";

const databaseName = "worknest";

export async function getDatabase(): Promise<Db> {
  const client = await mongodbClientPromise;
  return client.db(databaseName);
}

export async function getUsersCollection(): Promise<Collection> {
  const database = await getDatabase();
  return database.collection("users");
}

// export async function initializeDatabase() {
//   const usersCollection = await getUsersCollection();

//   await usersCollection.createIndex({ email: 1 }, { unique: true });
// }

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

const globalForMongoDB = globalThis as unknown as {
  mongodbClientPromise: Promise<MongoClient> | undefined;
};

const mongodbClientPromise =
  globalForMongoDB.mongodbClientPromise ?? new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongoDB.mongodbClientPromise = mongodbClientPromise;
}

export default mongodbClientPromise;

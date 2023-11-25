import { MongoClient, Db, Collection } from "mongodb";
import { User } from "~/models/schemas/User.schema";

import { config } from "dotenv";
import { RefreshToken } from "~/models/schemas/RefreshToken.scheman";
config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ilof1da.mongodb.net/?retryWrites=true&w=majority`;

class DatabaseService {
  private client: MongoClient;
  private db: Db;

  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(process.env.DB_NAME);
  }

  connect = async () => {
    try {
      await this.db.command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } catch (error) {
      console.error(
        "Unable to ping MongoDB. Check your connection details and ensure your MongoDB deployment is running."
      );
      console.error(error);
    }
  };

  // Create a getter to get the collection users
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_COLLECTION_USERS || "users");
  }

  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(
      process.env.DB_COLLECTION_REFRESH_TOKENS || "refresh_tokens"
    );
  }
}

const databaseService = new DatabaseService();
export default databaseService;

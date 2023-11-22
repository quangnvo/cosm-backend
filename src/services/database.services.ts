import { MongoClient, Db, Collection } from "mongodb";
import { User } from "~/models/schemas/User.schema";

import { config } from "dotenv";
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
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close();
    }
  };

  // Create a getter to get the collection users
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_COLLECTION_USERS || "users");
  }
}

const databaseService = new DatabaseService();
export default databaseService;
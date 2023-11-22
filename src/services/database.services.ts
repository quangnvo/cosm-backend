import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ilof1da.mongodb.net/?retryWrites=true&w=majority`;

class DatabaseService {
  client: MongoClient;

  constructor() {
    this.client = new MongoClient(uri);
  }

  connect = async () => {
    try {
      // Send a ping to confirm a successful connection
      await this.client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close();
    }
  };
}

const databaseService = new DatabaseService();
export default databaseService;

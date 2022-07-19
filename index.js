const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qnprp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(
  uri,
  { useUnifiedTopology: true },
  { useNewUrlParser: true },
  { connectTimeoutMS: 30000 },
  { keepAlive: 1 }
);
client.connect((err) => {
  const serviceCollection = client.db("photoArtistry").collection("services");
  const orderCollection = client.db("photoArtistry").collection("orders");

  app.post("/addService", async (req, res) => {
    const data = req.body;
    const result = await serviceCollection.insertOne(data);
    console.log(result);
    res.json(result);
  });

  app.post("/placeOrder", async (req, res) => {
    const data = req.body;
    const result = await orderCollection.insertOne(data);
    console.log(result);
    res.json(result);
  });

  app.get("/serviceList", async (req, res) => {
    const cursor = serviceCollection.find({});
    const services = await cursor.toArray();
    console.log(services);
    res.json(services);
  });

  app.get("/orderList", async (req, res) => {
    const cursor = orderCollection.find({});
    const services = await cursor.toArray();
    console.log(services);
    res.json(services);
  });

  app.delete("/services/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await serviceCollection.deleteOne(query);
    res.json(result);
  });
});

app.get("/", (req, res) => {
  res.send("Hello Photo Artistry!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

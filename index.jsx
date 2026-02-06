const express = require('express')
const app = express()
const port = 5000
require('dotenv').config()
const cors = require('cors')

app.use(express.json())
 app.use(cors())

 // connect with mongodb

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://2003mdbayzidrahman_db_user:L3hZbPIdBlrKSFHM@cluster0.laf4xbg.mongodb.net/?appName=Cluster0";
//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.laf4xbg.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    const db = client.db("foodieecommerce");
    const productCollection = db.collection("products");
    const orderCollection = db.collection("orders");
    const messageCollection = db.collection("messages");
    
    // get all products
    app.get('/products', async (req, res) => {
        const query = {};
        const cursor = productCollection.find(query);
        const product = await cursor.toArray();
        res.send(product);
    });

    app.get('/product/:id', async (req, res) => {
        const id = req.params.id.trim();
        const query = { _id: new ObjectId(id) };
        const product = await productCollection.findOne(query);
        res.send(product);
    });

    // add new product (admin)
    app.post('/products', async (req, res) => {
        const product = req.body;
        const result = await productCollection.insertOne(product);
        res.send(result);
    });

    // update product (admin)
    app.put('/products/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const update = { $set: req.body };
        const result = await productCollection.updateOne(query, update);
        res.send(result);
    });

    // delete product (admin)
    app.delete('/products/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await productCollection.deleteOne(query);
        res.send(result);
    });

    // post order
    app.post('/orders', async (req, res) => {
        const order = req.body;
        const result = await orderCollection.insertOne(order);
        res.send(result);
    });

    // get all orders
    app.get('/orders', async (req, res) => {
        const query = {};
        const cursor = orderCollection.find(query);
        const orders = await cursor.toArray();
        res.send(orders);
    });

    // get single order by ID
    app.get('/order/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const order = await orderCollection.findOne(query);
        res.send(order);
    });

    // get order by email
    app.get('/orders/:email', async (req, res) => {
        const email = req.params.email;
        const query = { 'userInfo.email': email };
        const cursor = orderCollection.find(query);
        const orders = await cursor.toArray();
        res.send(orders);
    });

    // update order status (admin)
    app.patch('/orders/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const update = { $set: { orderStatus: req.body.orderStatus, updatedAt: new Date() } };
        const result = await orderCollection.updateOne(query, update);
        res.send(result);
    });

    // delete order (user cancellation)
    app.delete('/orders/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await orderCollection.deleteOne(query);
        res.send(result);
    });

    // post customer message - save to messages collection
    app.post('/contact', async (req, res) => {
        const message = req.body;
        message.createdAt = new Date();
        message.status = 'unread';
        const result = await messageCollection.insertOne(message);
        res.send(result);
    });

    // get all messages (from messages collection)
    app.get('/contact', async (req, res) => {
        const query = {};
        const cursor = messageCollection.find(query).sort({ createdAt: -1 });
        const messages = await cursor.toArray();
        res.send(messages);
    });

    // get messages by email
    app.get('/contact/:email', async (req, res) => {
        const email = req.params.email;
        const query = { email: email };
        const cursor = messageCollection.find(query).sort({ createdAt: -1 });
        const messages = await cursor.toArray();
        res.send(messages);
    });

    // delete message
    app.delete('/contact/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await messageCollection.deleteOne(query);
        res.send(result);
    });

    // update message status
    app.patch('/contact/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const update = { $set: { status: req.body.status } };
        const result = await messageCollection.updateOne(query, update);
        res.send(result);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


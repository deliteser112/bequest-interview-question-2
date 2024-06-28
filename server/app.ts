// app.ts

import express from "express";
import cors from "cors";
import { blockchain, Block } from "./blockchain";

const PORT = 8080;
const app = express();
const database = { data: "Hello World" };

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ data: database.data });
});

app.post("/", (req, res) => {
  const newBlock = new Block(
    blockchain.chain.length,
    new Date().toISOString(),
    req.body.data,
    blockchain.getLatestBlock().hash
  );

  blockchain.addBlock(newBlock);
  database.data = req.body.data;
  res.sendStatus(200);
});

app.get("/verify", (req, res) => {
  const isValid = blockchain.isChainValid();
  res.json({ isValid });
});

app.post("/restore", (req, res) => {
  // Restores the data to the initial state stored in the genesis block
  const genesisBlock = blockchain.chain[0];
  database.data = genesisBlock.data;
  res.json({ data: genesisBlock.data });
});

app.post("/tamper", (req, res) => {
  // Tamper the data of the last block in the chain for testing purposes
  const chainLength = blockchain.chain.length;
  if (chainLength > 1) {
    blockchain.chain[chainLength - 1].data = "Tampered Data";
  }
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

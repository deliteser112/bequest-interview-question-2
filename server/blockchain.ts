// blockchain.ts

import crypto from "crypto";

export class Block {
  index: number;
  timestamp: string;
  data: any;
  previousHash: string;
  hash: string;

  constructor(index: number, timestamp: string, data: any, previousHash: string = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data))
      .digest("hex");
  }
}

export class Blockchain {
  chain: Block[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "2023-01-01", "Hello World", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Check if the current block's hash is still valid
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log(`Block ${currentBlock.index} has been tampered.`);
        return false;
      }

      // Check if the current block points to the correct previous block
      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log(`Block ${currentBlock.index} is not linked to the previous block correctly.`);
        return false;
      }
    }
    return true;
  }
}

export const blockchain = new Blockchain();
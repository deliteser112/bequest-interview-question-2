# Tamper Proof Data Solution

## Overview

This project demonstrates a tamper-proof data solution for Bequest, ensuring that important user data is protected from tampering. The solution uses a React frontend and an Express backend, with blockchain technology to verify and restore data integrity.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
    ```bash
    git clone <repository_url>
    ```
2. Navigate to the project directory:
    ```bash
    cd <repository_directory>
    ```
3. Install dependencies for both frontend and backend:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

### Running the Application

1. Start the backend server:
    ```bash
    cd server
    npm run start
    ```
2. Start the frontend application:
    ```bash
    cd client
    npm run start
    ```

The application should now be running on `http://localhost:3000` for the frontend and `http://localhost:8080` for the backend.

## Features

- **View Data**: Fetch and display the current data from the server.
- **Update Data**: Update the data on the server, adding a new block to the blockchain.
- **Verify Data**: Check the integrity of the data by verifying the blockchain.
- **Restore Data**: Restore the data to its original state if tampering is detected.
- **Tamper Data**: Tamper the data in the last block for testing purposes.

## Technical Details

### Frontend

- **React**: For building the user interface.
- **React Toastify**: For displaying notifications.

### Backend

- **Express**: For handling HTTP requests.
- **Blockchain**: For ensuring data integrity.

### Blockchain

The blockchain implementation consists of:

- **Block**: Represents a single block in the blockchain.
- **Blockchain**: Manages the chain of blocks and ensures data integrity by validating hashes.

## Why Blockchain?

Blockchain technology was selected for this solution due to its inherent properties that make it ideal for ensuring data integrity:

1. **Immutability**: Once data is recorded in a block, it cannot be easily altered without changing all subsequent blocks. This makes it difficult for an attacker to tamper with the data without detection.
2. **Transparency**: Each block contains a hash of the previous block, creating a transparent and verifiable chain of data blocks.
3. **Security**: The use of cryptographic hashes ensures that any tampering with the data can be easily detected, as the hashes of subsequent blocks will no longer match.
4. **Decentralization (optional)**: While this implementation uses a centralized server, blockchain technology can be extended to a decentralized network, further enhancing security and reliability.

## Usage

1. **View Data**: Open the application and view the current data.
2. **Update Data**: Enter new data and click "Update Data" to add a new block to the blockchain.
3. **Verify Data**: Click "Verify Data" to check if the data has been tampered with.
4. **Restore Data**: If tampering is detected, click "Restore Data" to revert to the original data.
5. **Tamper Data**: Click "Tamper Data" to simulate tampering with the last block's data for testing purposes.

## Conclusion

This project demonstrates a simple yet effective method for ensuring data integrity using blockchain technology. By leveraging the immutable and transparent nature of blockchains, we can protect critical user data from unauthorized modifications and ensure reliable data distribution.
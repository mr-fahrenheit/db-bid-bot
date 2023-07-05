# OpenSea Bid Bot for 2019 DeepBlacks

This script allows you to make automated offers on assets on OpenSea. 
It's configured to work with Ethereum mainnet.

## Requirements

- Node.js and npm installed on your system.
- An Infura account with an API key.
- An OpenSea account with an API key.
- Ethereum wallet private and public keys.

## Setup

1. Clone this repository to your local machine:

`git clone https://github.com/mr-fahrenheit/db-bid-bot.git`

2. Navigate to the repository folder:

`cd db-bid-bot`

3. Install the necessary dependencies:

`npm install`

4. Create a .env file in the root directory of the project. You can do this by creating a new text file and renaming it to .env.

5. Open the `.env` file in your preferred text editor and fill it in with your credentials:

```dotenv
INFURA_API_KEY=your-infura-api-key
OPENSEA_API_KEY=your-opensea-api-key
WALLET_PRIVATE_KEY=your-wallet-private-key
WALLET_PUBLIC_KEY=your-wallet-public-key
```

Replace the placeholders (your-infura-api-key, your-opensea-api-key, your-wallet-private-key, your-wallet-public-key) with your actual credentials.

## Running the Script
1. Edit `const bidAmount = 1; // 1 eth` to change your bid amount
2. To run the script, use the command:
`node bid_bot.js`
3. The script will make offers on the assets corresponding to the token IDs specified in the bid_bot.js script. It will wait for a specified cooldown period between each offer to avoid rate limiting.

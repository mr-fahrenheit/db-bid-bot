const ethers = require("ethers");
const { OpenSeaSDK, Chain } = require("opensea-js");
const dotenv = require("dotenv");

dotenv.config();

// Amount of ETH to bid on each item
const bidAmount = 1; // 1 eth

// You should have INFURA_API_KEY, OPENSEA_API_KEY, and WALLET_PRIVATE_KEY in your .env file
const infuraApiKey = process.env.INFURA_API_KEY;
const openSeaApiKey = process.env.OPENSEA_API_KEY;
const privateKey = process.env.WALLET_PRIVATE_KEY;
const publicKey = process.env.WALLET_PUBLIC_KEY;

// Set your contract address here:
const contractAddress = "0xd70f41dd5875eee7fa9dd8048567bc932124a8d2"; // DeepBlack contract

// These are the ranges for the token IDs:
const ranges = [
  { start: 5000, end: 5006 },
  { start: 0, end: 5 },
  { start: 5007, end: 5500 },
];

// This is the cooldown period between sends, in milliseconds (5000ms = 5s)
const cooldown = 5000;

// This provider will let you make transactions:
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${infuraApiKey}`
);

// Create a wallet instance with the private key and connect it with the provider
const wallet = new ethers.Wallet(privateKey, provider);

const openseaSDK = new OpenSeaSDK(wallet, {
  chain: Chain.Mainnet,
  apiKey: openSeaApiKey,
});

// This function waits for the specified delay (in milliseconds)
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// This function makes an offer for a given token ID
async function makeOffer(tokenId) {
  try {
    const offer = await openseaSDK.createBuyOrder({
      asset: {
        tokenId,
        tokenAddress: contractAddress,
      },
      accountAddress: publicKey,
      startAmount: bidAmount,
    });

    console.log({
      tokenId: tokenId,
      createdDate: offer.createdDate,
      orderHash: offer.orderHash,
      currentPrice: offer.currentPrice.toString(),
    });
  } catch (error) {
    console.error(`Failed to make offer for token ID ${tokenId}: ${error}`);
    console.log("Retrying in a moment...");
    await delay(cooldown);
    await makeOffer(tokenId);
  }
}

// Main function
async function main() {
  for (const range of ranges) {
    for (let tokenId = range.start; tokenId <= range.end; tokenId++) {
      await makeOffer(tokenId.toString());
      await delay(cooldown);
    }
  }
}

main();

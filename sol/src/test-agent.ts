import { SolanaAgentKit } from 'solana-agent-kit';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PRIVATE_KEY = process.env.PAYER_PRIVATE_KEY;
if (!PRIVATE_KEY) {
  throw new Error('PAYER_PRIVATE_KEY not found in environment variables');
}

async function main() {
  try {
    // Initialize the agent
    console.log('Initializing Solana Agent Kit...');
    const agent = new SolanaAgentKit(
      PRIVATE_KEY,
      'https://api.mainnet-beta.solana.com'
    );

    // Test 1: Check SOL balance
    console.log('\nTest 1: Checking SOL balance...');
    const balance = await agent.get_balance();
    console.log(`SOL Balance: ${balance}`);

    // Test 2: Get price of Jupiter token
    console.log('\nTest 2: Fetching Jupiter token price...');
    const jupPrice = await agent.fetchPrice(
      'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN' // Jupiter token mint
    );
    console.log(`Jupiter Price: $${jupPrice}`);

    // Test 3: Get price of BONK
    console.log('\nTest 3: Fetching BONK token price...');
    const bonkPrice = await agent.fetchPrice(
      'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' // BONK token mint
    );
    console.log(`BONK Price: $${bonkPrice}`);

    // Test 4: Deploy a test token
    console.log('\nTest 4: Deploying a test token...');
    const tokenResult = await agent.deploy_token(
      9, // decimals
      1000000, // initial supply
      'Test Token',
      'https://example.com/metadata.json',
      'TEST'
    );
    console.log(`Deployed token at: ${tokenResult.mint.toString()}`);

    // Test 5: Stake SOL
    console.log('\nTest 5: Staking SOL...');
    const stakeAmount = 0.1; // 0.1 SOL
    const stakeResult = await agent.stakeWithJup(stakeAmount);
    console.log(`Stake transaction: ${stakeResult}`);

  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 
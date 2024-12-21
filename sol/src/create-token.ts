import { Connection, Keypair } from '@solana/web3.js';
import { 
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo
} from '@solana/spl-token';
import dotenv from 'dotenv';
import bs58 from 'bs58';

dotenv.config();

async function createToken() {
  // Connect to devnet
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  // Load your wallet private key from .env
  const privateKeyString = process.env.PAYER_PRIVATE_KEY;
  
  if (!privateKeyString) {
    throw new Error('PAYER_PRIVATE_KEY is not set in .env file');
  }

  // Convert base58 private key to Keypair
  const privateKeyBytes = bs58.decode(privateKeyString);
  const payer = Keypair.fromSecretKey(privateKeyBytes);

  console.log('Creating token...');
  
  try {
    // Create the token
    const mint = await createMint(
      connection,
      payer,
      payer.publicKey,    // mint authority
      payer.publicKey,    // freeze authority
      9                   // decimals
    );

    console.log('Token created successfully!');
    console.log('Token address:', mint.toBase58());

    // Create associated token account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );

    console.log('Token account:', tokenAccount.address.toBase58());

    // Mint some tokens
    const mintAmount = 1000000000000; // 1000 tokens with 9 decimals
    await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer,
      mintAmount
    );

    console.log(`Minted ${mintAmount / 1e9} tokens to ${tokenAccount.address.toBase58()}`);
  } catch (error) {
    console.error('Error creating token:', error);
    throw error;
  }
}

createToken().catch(console.error); 
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { 
  getOrCreateAssociatedTokenAccount,
  mintTo
} from '@solana/spl-token';
import dotenv from 'dotenv';
import bs58 from 'bs58';

dotenv.config();

async function mintMoreTokens() {
  // Connect to devnet
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  // Load your wallet private key from .env (mint authority)
  const privateKeyString = process.env.PAYER_PRIVATE_KEY;
  
  if (!privateKeyString) {
    throw new Error('PAYER_PRIVATE_KEY is not set in .env file');
  }

  // Your token mint address
  const tokenMint = new PublicKey('DXMdksrdx62ECCNZtm7VaAyjZ82ZtW5GHW9UMi7rxu4b');
  
  // Convert base58 private key to Keypair
  const mintAuthority = Keypair.fromSecretKey(bs58.decode(privateKeyString));

  try {
    // Get the token account to mint to
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      mintAuthority,
      tokenMint,
      mintAuthority.publicKey
    );

    // Amount to mint (e.g., 1000 tokens with 9 decimals)
    const mintAmount = 1000 * 1e9;

    console.log(`Minting ${mintAmount / 1e9} tokens to ${tokenAccount.address.toString()}`);

    // Mint the tokens
    const signature = await mintTo(
      connection,
      mintAuthority,
      tokenMint,
      tokenAccount.address,
      mintAuthority,
      mintAmount
    );

    console.log('Minting successful!');
    console.log('Transaction signature:', signature);
    console.log('You can view the transaction at:');
    console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);

    // Get updated token supply
    console.log('Token account:', tokenAccount.address.toString());
  } catch (error) {
    console.error('Error minting tokens:', error);
    throw error;
  }
}

mintMoreTokens().catch(console.error); 
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { 
  getOrCreateAssociatedTokenAccount,
  transfer,
  getAssociatedTokenAddress
} from '@solana/spl-token';
import dotenv from 'dotenv';
import bs58 from 'bs58';

dotenv.config();

async function transferToken() {
  // Connect to devnet
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  // Load your wallet private key from .env
  const privateKeyString = process.env.PAYER_PRIVATE_KEY;
  
  if (!privateKeyString) {
    throw new Error('PAYER_PRIVATE_KEY is not set in .env file');
  }

  // Your token mint address
  const tokenMint = new PublicKey('DXMdksrdx62ECCNZtm7VaAyjZ82ZtW5GHW9UMi7rxu4b');
  
  // Your current wallet (the one that created the tokens)
  const senderAddress = new PublicKey('B23rx1tojnUvyaHHTUSgBaLQthjKyuxJ9U8De4b3qjES');
  
  // The new recipient address (replace with the address from step 2)
  const recipientAddress = new PublicKey('2nkA7t6eayY9d1sa1qiq86m9i2YMj4npcWdHUajc3T7o');

  // Convert base58 private key to Keypair
  const privateKeyBytes = bs58.decode(privateKeyString);
  const payer = Keypair.fromSecretKey(privateKeyBytes);

  try {
    console.log('Sender public key:', payer.publicKey.toString());
    console.log('Recipient address:', recipientAddress.toString());

    // Get sender's token account
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      tokenMint,
      payer.publicKey
    );

    // Get or create recipient's token account
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      tokenMint,
      recipientAddress
    );

    console.log('Sender token account:', senderTokenAccount.address.toString());
    console.log('Recipient token account:', recipientTokenAccount.address.toString());

    // Amount to transfer (e.g., 100 tokens with 9 decimals)
    const amount = 100 * 1e9;

    console.log(`Transferring ${amount / 1e9} tokens to ${recipientAddress.toString()}`);

    // Transfer tokens
    const signature = await transfer(
      connection,
      payer,
      senderTokenAccount.address,
      recipientTokenAccount.address,
      payer,
      amount
    );

    console.log('Transfer successful!');
    console.log('Transaction signature:', signature);
    console.log('You can view the transaction at:');
    console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (error) {
    console.error('Error transferring tokens:', error);
    throw error;
  }
}

transferToken().catch(console.error); 
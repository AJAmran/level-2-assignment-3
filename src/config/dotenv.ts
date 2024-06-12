import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT || !process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  console.error('Please provide PORT, MONGODB_URI, and JWT_SECRET in the .env file');
  process.exit(1);
}

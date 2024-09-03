import { config } from 'dotenv';

config();

export const { PORT, CORS_ORIGIN, CORS_METHODS } = process.env;

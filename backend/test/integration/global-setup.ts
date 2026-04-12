import * as dotenv from 'dotenv';
import * as path from 'path';

export default async function globalSetup() {
  // Carrega .env do backend antes de qualquer módulo ser inicializado
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}

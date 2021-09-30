import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopment = process.env.NODE_ENV !== 'production';
    if (isDevelopment) {
      const envFilePath = path.join(__dirname, '/../../.env');
      const existPath = fs.existsSync(envFilePath);
      if (!existPath) {
        console.log('no .env file');
        process.exit(0);
      }
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }

  get(key: string) {
    return this.envConfig[key];
  }
}

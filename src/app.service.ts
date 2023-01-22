import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}
  getHello(): string {
    const apiKey = this.config.get('API_KEY');
    return `Hola ${apiKey}`;
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  private isApiAuthEnabled: boolean;

  constructor(config: ConfigService) {
    this.isApiAuthEnabled = config.isApiAuthEnabled;
  }

  getHello(): string {
    return 'Hello World!';
  }
}

import { Injectable } from '@nestjs/common';
import { API_PREFIX } from '@fullstack-monorepo-demo/shared';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!' + API_PREFIX;
  }
}

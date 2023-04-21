import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getData(): { text: string } {
    return { text: 'Hello from auth service' };
  }
}

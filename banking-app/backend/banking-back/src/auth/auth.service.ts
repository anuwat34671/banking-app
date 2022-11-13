import { Injectable } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private customersService: CustomersService, 
              private jwtService: JwtService,
  ){}

  async validateUser(email: string, password: string): Promise<any>{
    const user = await this.customersService.findByEmail(email);
    console.log(user);
    
    if(user && await bcrypt.compare(password, user.password)){
      const { password, ...result} = user;
      return result;
    }
    return null;
  }

  async signIn(user: any): Promise<any>{
    const payload = { username: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}
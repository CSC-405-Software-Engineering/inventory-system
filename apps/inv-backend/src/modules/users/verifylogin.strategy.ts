import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class VerifyLogin implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const headers = context.switchToHttp().getRequest().headers;
    const authorizationHeader = headers['authorization'];
    const token = authorizationHeader?.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    const access_token = token || headers['x-access-token'];
    

    // console.log(access_token)

    try {
      const  {sub: id}: any = verify(access_token, process.env.JWT_SECRET);
      console.log("id:",id);
      if (!id) return false;

      const user = await this.usersService.findById(id);
      

      const { auth: { password, ...updatedAuth }, ...updatedUser } = user;
      const updatedUserWithoutPassword = { ...updatedUser, auth: updatedAuth };

      request.user = updatedUserWithoutPassword;
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }
}

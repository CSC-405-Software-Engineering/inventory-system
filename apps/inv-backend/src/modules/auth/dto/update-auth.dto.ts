import { PartialType } from '@nestjs/mapped-types';
import { LoginUserDto } from './login.dto';


export class UpdateAuthDto extends PartialType(LoginUserDto) {}

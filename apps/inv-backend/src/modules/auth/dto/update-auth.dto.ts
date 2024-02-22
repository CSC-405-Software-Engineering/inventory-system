import { PartialType } from '@nestjs/mapped-types';
import { SignInDto } from './signin.dto';

export class UpdateAuthDto extends PartialType(SignInDto) {}

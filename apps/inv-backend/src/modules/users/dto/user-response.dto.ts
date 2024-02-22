import { User } from '../entities/user.entity';

export class UserResponseDto {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  constructor(user: User) {
    this.id = user.userID;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}

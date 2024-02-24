import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyLogin } from './verifylogin.strategy';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Version('1')
  // Sample URL: http://localhost:3000/backend/v1/users
  // GET programs?programName=Electrical%20Engineering
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Retrieve all users' })
  @Get('all')
  async findAll(@Res() response) {
    try {
      const data = await this.usersService.findAll();
      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Users retrieved successfully',
        data: data,
      });
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Version('1')
  @UseGuards(VerifyLogin)
  @Get('user')
  async user(@Req() req, @Res() response) {
    try {
      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Users retrieved successfully',
        data: { user: req.user },
      });
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Version('1')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'Retrieve a user by ID' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response) {
    try {
      const data = await this.usersService.findById(id);
      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'User retrieved successfully',
        data: data,
      });
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  // @Version('1')
  // // @UseGuards(VerifyLogin)
  // @Get('user')
  // @ApiOperation({ summary: 'get user' })
  // @ApiResponse({ status: 201, description: 'User successfully fetched' })
  // async user(@Res() res: any) {
  //     console.log('Here in the user one')
  //     return res.status(200).send({ user: "req.user "});
  // }

  @Version('1')
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res() res: any,
    @Req() req: any,
  ) {
    try {
      console.log("hey");

      const user = await this.usersService.register(createUserDto);
      console.log(user);
       return await res.status(HttpStatus.CREATED).json({
        status: 'success',
        message: 'User registered successfully',
      });
    } catch (error) {
       return await res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }
}

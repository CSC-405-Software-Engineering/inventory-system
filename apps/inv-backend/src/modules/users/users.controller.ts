import { Controller, Get, HttpStatus, Param, Patch, Res, Version } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Version('1')
    // Sample URL: http://localhost:3000/backend/v1/users
  // GET programs?programName=Electrical%20Engineering
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Retrieve all users' })
    @Get()
    async findAll(@Res() response){
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
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'Retrieve a user by ID' })
    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response){
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
}

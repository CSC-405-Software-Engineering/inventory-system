import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(@Res() response){
        try {
            const data = await this.usersService.findAll();
            return {
                status: 'success',
                message: 'Users retrieved successfully',
                data: data,
            };
            
        } catch (error) {
            response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
              message: error.message,
            });
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response){
        try {
            const data = await this.usersService.findById(id);
            return {
                status: 'success',
                message: 'User retrieved successfully',
                data: data,
            };
        } catch (error) {
            response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
              message: error.message,
            });
        }
    }

}

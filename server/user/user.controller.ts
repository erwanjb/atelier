import { Body, Controller, Post, } from '@nestjs/common';
import { UserService } from './user.service';

interface UserToCreate {
    email: string;
    name: string;
    password: string;
}

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post()
    async create(@Body() body: UserToCreate) {
        const response = await this.userService.create(body);
        return response;
    }
}
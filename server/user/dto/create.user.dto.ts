import { IsEmail, IsUUID, IsString, IsEnum } from "class-validator";
import { StatusEnum } from '../enum/statusEnum';

export class CreateUserDto {
    @IsUUID()
    id: string;

    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsEnum(StatusEnum)
    status: StatusEnum;

    @IsString()
    confirmToken: string;
}
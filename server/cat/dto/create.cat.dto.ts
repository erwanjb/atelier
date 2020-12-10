import { IsUrl, IsString } from "class-validator";

export class CreateCatDto {
    @IsString()
    id: string;

    @IsUrl()
    url: string;
}
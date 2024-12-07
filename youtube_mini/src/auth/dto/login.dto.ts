import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto{
    @IsEmail({}, {message: "email khong dung dinh dang"})
    @ApiProperty()
    email:string;

    @IsNotEmpty({message: "khong duoc de trong password"})
    @ApiProperty()
    pass_word: string
}
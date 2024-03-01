import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() formData: CreateUserDTO) {
    return this.userService.create(formData);
  }

  @Get(":id")
  read() {}

  @Get(":id")
  update() {}

  @Delete(":id")
  delete() {}
}

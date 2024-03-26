import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";

@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() formData: CreateUserDTO) {
    return this.userService.create(formData);
  }

  @Get(":id")
  retrieve(@Param("id", ParseIntPipe) id: number) {
    return this.userService.retrieve(id);
  }

  @Get("list/:skip")
  list(@Param("skip", ParseIntPipe) skip: number) {
    return this.userService.list({ skip });
  }

  @Get(":id")
  update() {}

  @Delete(":id")
  delete() {}
}

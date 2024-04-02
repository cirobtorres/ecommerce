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
import { UserDTO } from "./dto/user.dto";

@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() formData: UserDTO) {
    return this.userService.create(formData);
  }

  @Get(":id")
  retrieve(@Param("id", ParseIntPipe) id: number) {
    return this.userService.retrieve(id);
  }

  @Get("list/:skip")
  list(@Param("skip", ParseIntPipe) query) {
    return this.userService.list(query);
  }

  @Get(":id")
  update() {}

  @Delete(":id")
  delete() {}
}

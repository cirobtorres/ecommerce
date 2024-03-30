import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AddressDTO } from "./dto/address.dto";
import { AddressService } from "./address.service";
import { CreateAddressGuard, DeleteAddressGuard } from "./guards/address.guard";

@Controller("api/address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get("all/:userId")
  async list(@Param("userId", ParseIntPipe) userId: number) {
    return this.addressService.listAll(userId);
  }

  @Get("count/:userId")
  async listUser(@Param("userId", ParseIntPipe) userId: number) {
    return this.addressService.listCount(userId);
  }

  @UseGuards(CreateAddressGuard)
  @Post()
  async read(@Body() body: AddressDTO) {
    return this.addressService.create(body);
  }

  @UseGuards(DeleteAddressGuard)
  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.addressService.destroy(id);
  }

  @Put(":id")
  async put() {
    return this.addressService.update();
  }
}

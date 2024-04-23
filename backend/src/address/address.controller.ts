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
import {
  CreateAddressGuard,
  DeleteAddressGuard,
  ReadAddressGuard,
  UpdateAddressGuard,
} from "./guards/address.guard";

@Controller("api/address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(":id")
  async retrieve(@Param("id", ParseIntPipe) id: number) {
    return this.addressService.retrieve(id);
  }

  @UseGuards(ReadAddressGuard)
  @Get("all/:userId")
  async listAll(@Param("userId", ParseIntPipe) userId: number) {
    return this.addressService.listAll(userId);
  }

  @Get("count/:userId")
  async listCount(@Param("userId", ParseIntPipe) userId: number) {
    return this.addressService.listCount(userId);
  }

  @UseGuards(CreateAddressGuard)
  @Post()
  async create(@Body() body: AddressDTO) {
    return this.addressService.create(body);
  }

  @UseGuards(UpdateAddressGuard)
  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: AddressDTO
  ) {
    return this.addressService.update(id, body);
  }

  @UseGuards(DeleteAddressGuard)
  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.addressService.delete(id);
  }
}

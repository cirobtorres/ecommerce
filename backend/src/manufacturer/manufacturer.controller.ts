import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { ManufacturerService } from "./manufacturer.service";
import { ManufacturerDTO } from "./dto/manufacturer.dto";

@Controller("api/manufacturer")
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Get(":id")
  retrieve(@Param("id", ParseIntPipe) id: number) {
    return this.manufacturerService.retrieve(id);
  }

  @Get()
  list() {
    return this.manufacturerService.list();
  }

  @Post()
  create(@Body() body: ManufacturerDTO) {
    return this.manufacturerService.create(body);
  }

  @Post(":id")
  update(@Param("id", ParseIntPipe) id: number) {
    return this.manufacturerService.update(id);
  }

  @Post(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.manufacturerService.delete(id);
  }
}

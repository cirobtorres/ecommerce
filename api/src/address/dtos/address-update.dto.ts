import { PartialType } from "@nestjs/mapped-types";
import { CreateAddressDTO } from "./address-create.dto";

export class UpdateAddressDTO extends PartialType(CreateAddressDTO) {}

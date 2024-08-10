import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CreateUserDTO } from "src/user/dtos/user-create.dto";
import { AuthLoginDTO } from "./dtos/auth-login.dto";
import { AuthPersonService } from "./auth-person.service";
import { UserPersonGuard } from "../user/decorators/user.decorator";
import { UpdateUserDTO } from "../user/dtos/user-update.dto";
import { AddressPersonService } from "../address/address-person.service";
import { CreateAddressDTO } from "../address/dtos/address-create.dto";
import { UpdateAddressDTO } from "../address/dtos/address-update.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AvatarPersonService } from "../avatar/avatar-person.service";
import { AuthPersonGuard } from "./guards/auth.guard";

@Controller("api/auth/person")
export class AuthPersonController {
  constructor(
    private readonly authPersonService: AuthPersonService,
    private readonly addressPersonService: AddressPersonService,
    private readonly avatarPersonService: AvatarPersonService
  ) {}

  @Post("sign-up")
  @HttpCode(201)
  async signUp(@Body() body: CreateUserDTO) {
    return this.authPersonService.signUp(body);
  }

  // @Post("login")
  // @HttpCode(200)
  // async login(@Body() body: AuthLoginDTO) {}

  // @Post("forget") // Forget password
  // async forget() {}

  // @Post("reset/email") // Reset email
  // async resetEmail() {}

  // @Post("reset/password") // Reset password
  // async resetPassword() {}

  // @UseGuards(AuthPersonGuard)
  // @Get("get-data") // Retrieve data
  // @HttpCode(200)
  // async data(@UserPersonGuard() user: any) {
  //   return user;
  // }

  // @UseGuards(AuthPersonGuard)
  // @Patch("update-data") // Retrieve data
  // @HttpCode(200)
  // async dataUpdate(@UserPersonGuard() user: any, @Body() body: UpdateUserDTO) {}

  // @Delete("delete")
  // async delete() {}

  // @Post("exists/email")
  // async emailExists(@Body() { email }: { email: string }) {
  //   return this.authPersonService.emailExists(email);
  // }

  @Post("exists/cpf")
  async cpfExists(@Body() { cpf }: { cpf: string }) {
    return this.authPersonService.cpfExists(cpf);
  }

  // ADDRESS-----------------------------------------------------------------------------------
  // @UseGuards(AuthPersonGuard)
  // @Get("address/all")
  // @HttpCode(200)
  // async listAddresses(@UserPersonGuard() user: any) {}

  // @UseGuards(AuthPersonGuard)
  // @Post("address/create")
  // @HttpCode(201)
  // async saveAddress(
  //   @UserPersonGuard() user: any,
  //   @Body() body: CreateAddressDTO
  // ) {}

  // @UseGuards(AuthPersonGuard)
  // @Patch("address/update/:addressId")
  // @HttpCode(200)
  // async updateAddress(
  //   @Param("addressId") addressId: string,
  //   @Body() body: UpdateAddressDTO
  // ) {}

  // @UseGuards(AuthPersonGuard)
  // @Patch("address/default/:addressId")
  // @HttpCode(200)
  // async setDefaultAddress(
  //   @UserPersonGuard() user: any,
  //   @Param("addressId") addressId: string
  // ) {}

  // @UseGuards(AuthPersonGuard)
  // @Delete("address/delete/:addressId")
  // @HttpCode(200)
  // async deleteAddress(
  //   @UserPersonGuard() user: any,
  //   @Param("addressId") addressId: string
  // ) {}

  // AVATAR------------------------------------------------------------------------------------
  // @UseGuards(AuthPersonGuard)
  // @Get("avatar/get-avatar")
  // @HttpCode(200)
  // async getAvatar(@UserPersonGuard() user: any) {}

  // @UseGuards(AuthPersonGuard)
  // @UseInterceptors(FileInterceptor("file"))
  // @Post("avatar/create")
  // @HttpCode(201)
  // async saveAvatar(
  //   @UserPersonGuard() user: any,
  //   @UploadedFile() file: Express.Multer.File
  // ) {}

  // @UseGuards(AuthPersonGuard)
  // @Delete("avatar/delete")
  // @HttpCode(200)
  // async removeAvatar(@UserPersonGuard() user: any) {}
}

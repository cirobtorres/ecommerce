import { Controller, Post } from "@nestjs/common";

@Controller("api/auth/company")
export class AuthCompanyController {
  constructor() {}

  @Post("register")
  async register() {}

  @Post("login")
  async login() {}

  @Post("forget") // Forget password
  async forget() {}

  @Post("reset/email") // Reset email
  async resetEmail() {}

  @Post("reset/password") // Reset password
  async resetPassword() {}

  @Post("get-data") // Retrieve data
  async data() {}

  @Post("update-data") // Retrieve data
  async dataUpdate() {}

  @Post("delete")
  async delete() {}

  // ADDRESS-----------------------------------------------------------------------------------
  @Post("address/all")
  async listAddresses() {}

  @Post("address/create")
  async saveAddress() {}

  @Post("address/update/:addressId")
  async updateAddress() {}

  @Post("address/default/:addressId")
  async setDefaultAddress() {}

  @Post("address/delete/:addressId")
  async deleteAddress() {}

  // AVATAR------------------------------------------------------------------------------------
  @Post("avatar/create")
  async saveAvatar() {}

  @Post("avatar/delete")
  async removeAvatar() {}
}

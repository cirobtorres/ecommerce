import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(
    { email, contactName }: { email: string; contactName: string },
    url: string
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: "Confirme seu Email",
      template: "./authConfirmationLink",
      context: {
        contactName,
        email,
        url,
      },
    });
  }
}

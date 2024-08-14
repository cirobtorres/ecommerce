import { Global, Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailService } from "./mailer.provider";
import { ConfigModule } from "@nestjs/config";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";

// @Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILTRAP_HOST,
        port: Number(process.env.MAILTRAP_PORT) || 2525,
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env.MAILTRAP_PASSWORD,
        },
      },
      defaults: {
        from: "test@demomailtrap.com",
      },
      template: {
        dir: join(__dirname, "templates"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}

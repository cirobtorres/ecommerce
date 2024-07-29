import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { CNPJValidator } from "../docValidator";

@ValidatorConstraint({ async: false })
class IsCNPJConstraint implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments
  ): Promise<boolean> | boolean {
    return new CNPJValidator(value).isValid;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return "Invalid CNPJ";
  }
}

export function IsCNPJ(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCNPJConstraint,
    });
  };
}

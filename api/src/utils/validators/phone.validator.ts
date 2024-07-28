import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: false })
class IsPhoneConstraint implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments
  ): Promise<boolean> | boolean {
    const phoneRegex = /^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{7}$/;
    return phoneRegex.test(value);
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return "Invalid phone number";
  }
}

export function IsPhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneConstraint,
    });
  };
}

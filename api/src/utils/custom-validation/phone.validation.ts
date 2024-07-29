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
    const phoneRegex = /^(?:[0-9]{2})(?:[0-9]{8}|9[0-9]{8})$/;
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

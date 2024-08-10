import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: false })
class IsDateConstraint implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments) {
    // Validates:
    // This basic formats: yyyy/mm/dd yyyy-mm-dd
    // Leap years (anos bissextos)
    // Correct days for each month

    const dateRegex =
      /^(?:(?:(?:19|20)\d\d)[\-\/](?:(?:0[13578]|1[02])[\-\/](?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)[\-\/](?:0[1-9]|[12]\d|30)|02[\-\/](?:0[1-9]|1\d|2[0-8]))|(?:19|20)(?:[02468][048]|[13579][26])[\-\/]02[\-\/]29)$/;

    if (!dateRegex.test(date)) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return "Invalid date";
  }
}

export function IsDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateConstraint,
    });
  };
}

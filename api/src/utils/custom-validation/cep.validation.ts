import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ async: false })
class IsCEPConstraint implements ValidatorConstraintInterface {
  validate(cep: string, args: ValidationArguments) {
    const cepRegex = /^\d{8}$/;
    return cepRegex.test(cep);
  }

  defaultMessage(args: ValidationArguments) {
    return "CEP is invalid";
  }
}

export function IsCEP(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCEPConstraint,
    });
  };
}

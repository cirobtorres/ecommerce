type PassErrorState = {
  passwordMinError: boolean;
  passwordUpperCaseError: boolean;
  passwordLowerCaseError: boolean;
  passwordPunctuationError: boolean;
  passwordDigitsError: boolean;
};

type State = {
  errors: { [k: string]: boolean } | null;
};

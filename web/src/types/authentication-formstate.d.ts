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

type SignUpState = {
  errors: {
    [k: string]: { error: boolean; email: string; password: string };
  } | null;
};

import FieldBody from "./FieldBody";
import FieldHelp from "./FieldHelp";
import FieldError from "./FieldError";
import FieldLabel from "./FieldLabel";
import FieldInput from "./FieldInput";

export const Field = {
  Root: FieldBody,
  Content: {
    Input: FieldInput,
    Label: FieldLabel,
  },
  Help: FieldHelp,
  Error: FieldError,
};

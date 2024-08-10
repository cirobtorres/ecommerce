import { Gender } from "../user/enums/gender.enum";

export default function enumParser(gender: string) {
  switch (gender) {
    case "Não especificado":
      return Gender.NONE;
    case "Feminino":
      return Gender.FEMALE;
    case "Masculino":
      return Gender.MALE;
    case "Outro":
      return Gender.OTHER;
  }
}

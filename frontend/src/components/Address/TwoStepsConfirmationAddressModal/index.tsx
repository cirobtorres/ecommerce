import AddressChildrenModal from "../AddressChildrenModal";
import {
  MdMarkEmailRead,
  MdPhoneIphone,
  MdLocalShipping,
} from "react-icons/md";
import ConfirmationButton from "../ConfirmAddressButton";

export default function TwoStepsConfirmationAddressModal({
  email,
  phone,
  state,
  setState,
}: {
  email: string;
  phone: string;
  state: boolean;
  setState: (a: boolean, b: boolean, c: null | [boolean, number]) => void;
}) {
  const hideEmail = (email: string) => {
    const [b, a] = email.split("@");
    const substringOne = b[0] + "..." + b.slice(-1);
    const [_b, _a] = a.split(".");
    const substringTwo = _b[0] + "..." + _a;
    return substringOne + "@" + substringTwo;
  };

  const hidePhone = (phone: string) => {
    return `(${phone.slice(0, 2)})#####-${phone.slice(-4)}`;
  };

  return (
    state && (
      <AddressChildrenModal
        icon={MdLocalShipping}
        modalTitle="Alterar Endereço"
        closeModal={() => setState(false, false, null)}
      >
        <p className="text-theme-03">
          Por questões de segurança, para alteração do endereço de entrega
          enviaremos um código de validação para seu endereço de <b>e-mail</b>{" "}
          ou <b>telefone de contato</b>.
        </p>
        <div className="flex gap-3">
          <ConfirmationButton
            icon={MdMarkEmailRead}
            toHide={hideEmail(email)}
            to="E-mail"
            textTo="Enviaremos um código para o e-mail:"
            confirmClick={() => console.log("Email")}
          />
          <ConfirmationButton
            icon={MdPhoneIphone}
            toHide={hidePhone(phone)}
            to="Celular"
            textTo="Enviaremos um código para o telefone celular:"
            confirmClick={() => console.log("Phone")}
          />
        </div>
      </AddressChildrenModal>
    )
  );
}

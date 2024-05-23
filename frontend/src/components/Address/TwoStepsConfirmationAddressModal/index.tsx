import AddressChildrenModal from "../AddressChildrenModal";
import {
  MdMarkEmailRead,
  MdPhoneIphone,
  MdLocalShipping,
} from "react-icons/md";
import ConfirmationButton from "../ConfirmAddressButton";

export default function TwoStepsConfirmationAddressModal({
  user,
  title,
  body,
  closeFunction,
}: {
  user: UserProps;
  title: string;
  body: string;
  closeFunction: (a: boolean, b: boolean) => void;
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
    <AddressChildrenModal
      icon={MdLocalShipping}
      modalTitle={title}
      closeModal={() => closeFunction(false, false)}
    >
      <p className="mx-8 text-theme-03 text-start">{body}</p>
      <div className="flex gap-3">
        <ConfirmationButton
          icon={MdMarkEmailRead}
          toHide={hideEmail(user.email)}
          to="E-mail"
          textTo="Enviaremos um código para o e-mail:"
          confirmClick={() => console.log("Email")}
        />
        <ConfirmationButton
          icon={MdPhoneIphone}
          toHide={hidePhone(user.phone)}
          to="Celular"
          textTo="Enviaremos um código para o telefone celular:"
          confirmClick={() => console.log("Phone")}
        />
      </div>
    </AddressChildrenModal>
  );
}

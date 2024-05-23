"use client";

import { useReducer, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import EditAddress from "./EditAddress";
import TwoStepsConfirmationAddressModal from "./TwoStepsConfirmationAddressModal";
import RegisterAddress from "./RegisterAddress";
import ListOfAddresses from "./ListOfAddresses";
import { ActionProps, StateProps } from "../../../types/address-reducer";
import { ActionTypeProps } from "../../../enums/ActionTypeProps";

export default function Address({
  user,
  addresses,
  token,
}: {
  user: UserProps;
  addresses: AddressProps[];
  token: string;
}) {
  const [registerAddress, setRegisterAddress] = useState(false); // Open up register address FORM
  const [editAddress, setEditAddress] = useState<null | [boolean, number]>(
    null
  ); // Open up edit address FORM
  const [addressModal, setAddressModal] = useState(false); // Open up a confirmation modal
  // const [error, setError] = useState<null | string>(null);

  const handleAddressModal = (event: any) => {
    if (event.target.tagName !== "BUTTON") setAddressModal(!addressModal);
  };

  function reducer(state: StateProps, action: ActionProps) {
    switch (action.type) {
      case ActionTypeProps.EDIT: {
        return {
          ...state,
          title: "Editar endereço",
          body: "Por questões de segurança, para editar esse endereço, enviaremos um código de validação para seu e-mail ou telefone de contato.",
        };
      }
      case ActionTypeProps.DELETE: {
        return {
          ...state,
          title: "Excluir endereço",
          body: "Por questões de segurança, para excluir esse endereço, enviaremos um código de validação para seu e-mail ou telefone de contato.",
          addressId: action.payload,
        };
      }
      case ActionTypeProps.STANDARD: {
        return {
          ...state,
          title: "Tornar endereço padrão",
          body: "Por questões de segurança, para tornar esse o endereço padrão, enviaremos um código de validação para seu e-mail ou telefone de contato.",
        };
      }
      default: {
        return state;
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    addressId: null,
    title: null,
    body: null,
  });

  const handleFieldStates = (a: boolean, b: boolean) => {
    setRegisterAddress(a);
    setAddressModal(b);
  };

  return (
    <div className="max-h-full flex flex-col gap-3 shadow-generic rounded p-12 w-1/2 bg-white">
      {addressModal && (
        <TwoStepsConfirmationAddressModal
          {...state}
          user={user}
          closeFunction={handleFieldStates}
        />
      )}
      <h2 className="flex items-center gap-3 text-theme-07 text-xl">
        <FaAddressCard /> Endereços
      </h2>
      <RegisterAddress
        user={user}
        token={token}
        state={registerAddress}
        closeFunction={handleFieldStates}
      />
      {ActionTypeProps.EDIT && (
        <EditAddress
          address={
            addresses.filter(
              (address: any) => address.id === state.addressId
            )[0]
          }
          closeFunction={handleFieldStates}
        />
      )}
      <ListOfAddresses
        addresses={addresses}
        states={[registerAddress, editAddress]}
        dispatch={dispatch}
        setStates={handleFieldStates}
        modal={handleAddressModal}
      />
      {/* {error && <h4 className="text-center text-red-500">{error}</h4>} */}
    </div>
  );
}

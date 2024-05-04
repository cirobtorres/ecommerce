"use client";

import { useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import EditAddress from "./EditAddress";
import TwoStepsConfirmationAddressModal from "./TwoStepsConfirmationAddressModal";
import RegisterAddress from "./RegisterAddress";
import ListOfAddresses from "./ListOfAddresses";

export default function Address({
  user,
  addresses,
  token,
}: {
  user: UserProps;
  addresses: AddressProps[];
  token: string;
}) {
  const [registerAddress, setRegisterAddress] = useState(false); // Open up register address fields
  const [editAddress, setEditAddress] = useState<null | [boolean, number]>(
    null
  ); // Open up edit address fields
  const [addressModal, setAddressModal] = useState(false); // Open up confirmation modal
  const [error, setError] = useState<null | string>(null);

  const handleAddressModal = (event: any) => {
    if (event.target.tagName !== "BUTTON") setAddressModal(!addressModal);
  };

  const handleFieldStates = (
    a: boolean,
    b: boolean,
    c: null | [boolean, number]
  ) => {
    setRegisterAddress(a);
    setAddressModal(b);
    setEditAddress(c);
  };

  return (
    <div className="max-h-full flex flex-col gap-3 shadow-generic rounded p-12 w-1/2 bg-white">
      <TwoStepsConfirmationAddressModal
        email={user.email}
        phone={user.phone}
        state={addressModal}
        setState={handleFieldStates}
      />
      <h2 className="flex items-center gap-3 text-theme-07 text-xl">
        <FaAddressCard /> Endereços
      </h2>
      <RegisterAddress
        user={user}
        token={token}
        state={registerAddress}
        setState={handleFieldStates}
      />
      {editAddress && (
        <EditAddress
          address={
            addresses.filter((address: any) => address.id === editAddress[1])[0]
          }
          setState={handleFieldStates}
        />
      )}
      <ListOfAddresses
        addresses={addresses}
        states={[registerAddress, editAddress]}
        setStates={handleFieldStates}
        modal={handleAddressModal}
      />
      {error && <h4 className="text-center text-red-500">{error}</h4>}
    </div>
  );
}

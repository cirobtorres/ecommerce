import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";
import Link from "next/link";
import GreetingsAddress from "../GreetingsAddress";

export default function GreetingsPF({
  id,
  phone,
  email,
  createdAt,
  updatedAt,
  privacyPolicy,
  privileges,
  active,
  PF: { id: userId, firstName, lastName, birthAt, cpf },
  address,
}: {
  id: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  privacyPolicy: boolean;
  privileges: number;
  active: boolean;
  PF: {
    id: number;
    firstName: string;
    lastName: string;
    birthAt: string;
    cpf: string;
  };
  address: {
    id: number;
    street: string;
    number: number;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    place: string;
    defaultAddress: boolean;
  }[];
}) {
  const defaultAddress = address.filter((value) => value.defaultAddress)[0];
  return (
    <div className="flex flex-row gap-3">
      <div className="flex flex-1 flex-row items-center justify-between gap-3 mb-4 bg-white rounded px-12 py-4 border border-light-gray shadow-generic">
        <div className="relative rounded-full overflow-hidden cursor-pointer hover:shadow-darker transition ease-in duration-300 group">
          <Image
            // src={image ?? "/images/user-not-signed-in/1281x1281-user-icon.png"}
            src={"/images/user-not-signed-in/1281x1281-user-icon.png"}
            alt={`Avatar de ${firstName} ${lastName}`}
            width={64}
            height={64}
          />
          <FaCamera className="absolute bottom-2 left-1/2 -translate-x-1/2 text-transparent group-hover:text-white transition ease-in duration-300" />
        </div>
        <div className="flex-1">
          <h2 id="userName" className="text-2xl font-bold">
            <strong className="text-theme-07">{`${firstName} ${lastName}`}</strong>
          </h2>
          <span id="userEmail" className="flex flex-row items-center gap-1">
            <MdEmail />
            <strong>{email}</strong>
          </span>
        </div>
        <Link href="/">
          <FaGear className="text-2xl text-theme-07" />
        </Link>
      </div>
      <GreetingsAddress {...defaultAddress} />
    </div>
  );
}

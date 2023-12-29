import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

export default function SearchBar() {
  return (
    <div className="w-full bg-theme-01 m-1 rounded outline outline-1 outline-offset-2">
      <form className="relative flex h-full w-full flex-row">
        <input
          type="search"
          placeholder="Busque por produtos, marcas, modelos e muito mais"
          className="h-full w-full bg-transparent px-12 py-4 text-theme-05 focus:outline-theme-07 peer"
        />
        <button className="absolute left-2 top-1/2 -translate-y-1/2 text-theme-08 peer-focus:text-theme-07 hover:text-theme-07 p-3">
          <FaMagnifyingGlass />
        </button>
        <button
          type="reset"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-08 peer-focus:text-theme-07 peer-focus:hover:text-red-500 hover:text-red-500"
        >
          <IoIosClose size="2rem" />
        </button>
      </form>
    </div>
  );
}

import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import Search from "./Search.module.css";

const SearchBar = () => {
  return (
    <form className={Search["search-container"]}>
      <button type="submit" className={Search["search-button-confirm"]}>
        <CiSearch />
      </button>
      <input type="search" className={Search["search-input"]} />
      <button type="reset" className={Search["search-button-cancel"]}>
        <IoIosClose />
      </button>
    </form>
  );
};

export default SearchBar;

import { CiSearch } from "react-icons/ci";
import Search from "./Search.module.css";

const SearchBar = () => {
  return (
    <form className={Search["form-container"]}>
      <button className={Search["button"]}>
        <CiSearch />
      </button>
      <input type="search" className={Search["input"]} />
    </form>
  );
};

export default SearchBar;

import { FaMagnifyingGlass } from "react-icons/fa6";
import { InputField } from "./forms/fields";
import { useSearchBar } from "../hooks/useSearchBar";

export const SearchBar = () => {
  const { register, handleSearch } = useSearchBar();

  return (
    <form onSubmit={handleSearch}>
      <InputField
        Icon={FaMagnifyingGlass}
        id="profile-search-bar"
        type="search"
        placeholder="Search for a profile by username"
        autoComplete="off"
        className="bg-white md:w-80"
        registration={register("search")}
      />
    </form>
  );
};

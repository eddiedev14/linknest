import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSearchBar } from "../hooks/useSearchBar";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./shadcn/combobox";

interface Props {
  autoFocus?: boolean;
}

export const SearchBar = ({ autoFocus }: Props) => {
  const { handleSearch } = useSearchBar();

  return (
    <form role="search" aria-label="Search profiles" onSubmit={handleSearch}>
      <Combobox>
        <ComboboxInput
          StartIcon={FaMagnifyingGlass}
          className="w-80 text-sm [&_input]:w-64 [&_input]:outline-none"
          placeholder="Search for a profile by username"
          aria-label="Username search"
          autoFocus={autoFocus}
          showTrigger={false}
        />
        <ComboboxEmpty>No items found.</ComboboxEmpty>

        <ComboboxContent>
          <ComboboxList>
            {[1].map((item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </form>
  );
};

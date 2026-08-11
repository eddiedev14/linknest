import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSearchBar } from "../hooks/useSearchBar";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./shadcn/combobox";

interface Props {
  autoFocus?: boolean;
}

export const SearchBar = ({ autoFocus }: Props) => {
  const {
    query,
    filteredResults,
    hasFilteredResults,
    handleQueryChange,
    handleSelectedValueChange,
    handleEnterKeyDown,
    handleFormSubmit,
  } = useSearchBar();

  return (
    <form role="search" aria-label="Search profiles" onSubmit={handleFormSubmit}>
      <Combobox open={hasFilteredResults} onValueChange={handleSelectedValueChange}>
        <ComboboxInput
          StartIcon={FaMagnifyingGlass}
          className="w-80 text-sm [&_input]:w-64 [&_input]:outline-none"
          placeholder="Search for a profile by username"
          aria-label="Username search"
          autoFocus={autoFocus}
          showTrigger={false}
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleEnterKeyDown}
        />
        <ComboboxContent>
          <ComboboxList>
            {filteredResults.map((item) => (
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

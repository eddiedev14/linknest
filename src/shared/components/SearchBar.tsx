import { Controller } from "react-hook-form";
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
  const { results, control, handleSearch } = useSearchBar();

  return (
    <form role="search" aria-label="Search profiles" onSubmit={handleSearch}>
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <Combobox>
            <ComboboxInput
              StartIcon={FaMagnifyingGlass}
              className="w-80 text-sm [&_input]:w-64 [&_input]:outline-none"
              placeholder="Search for a profile by username"
              aria-label="Username search"
              autoFocus={autoFocus}
              showTrigger={false}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.currentTarget.form?.requestSubmit();
                }
              }}
            />
            <ComboboxContent>
              <ComboboxList>
                {results.map((item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        )}
      ></Controller>
    </form>
  );
};

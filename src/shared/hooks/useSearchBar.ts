import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { BaseUIEvent } from "@base-ui/react/types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { USERNAME_REGEX } from "@/features/auth/constants/regex.constant";

export const useSearchBar = () => {
  //* Context
  const { filterUsersByUsername } = useAuth();

  //* States
  const [query, setQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  //* React Router
  const navigate = useNavigate();

  //* Functions
  const goToProfile = (search: string) => {
    // Only go to the profile when is a valid username
    if (!USERNAME_REGEX.test(search)) {
      toast.error("Your search is not a valid username");
      return;
    }

    navigate(`/u/${search}`);
  };

  //* Effects
  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedSearch(query), 700);
    return () => clearTimeout(timerId);
  }, [query]);

  useEffect(() => {
    if (debouncedSearch.trim() === "") return;

    const filterSearch = async () => {
      const results = await filterUsersByUsername(debouncedSearch);
      setFilteredResults(results);
    };

    filterSearch();
  }, [debouncedSearch, filterUsersByUsername]);

  //* Handlers
  const handleQueryChange = (
    e: BaseUIEvent<React.ChangeEvent<HTMLInputElement, HTMLInputElement>>,
  ) => {
    const value = e.target.value;
    setQuery(value);
    setFilteredResults([]);
  };

  // If a suggestion is selected
  const handleSelectedValueChange = (value: string | null) => {
    if (!value) return;
    setQuery(value);
    setFilteredResults([]);
    goToProfile(value);
  };

  const handleEnterKeyDown = (e: BaseUIEvent<React.KeyboardEvent<HTMLInputElement>>) => {
    if (e.key !== "Enter") return;

    // If there are any suggestions, we'll let Base UI handle the Enter key
    if (filteredResults.length > 0) return;

    // If there are no suggestions, we'll submit the form
    e.currentTarget.form?.requestSubmit();
  };

  // If you want to navigate based on what's entered in the input field
  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    goToProfile(query);
  };

  return {
    query,
    filteredResults,
    hasFilteredResults: filteredResults.length > 0,
    handleQueryChange,
    handleSelectedValueChange,
    handleEnterKeyDown,
    handleFormSubmit,
  };
};

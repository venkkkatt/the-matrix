import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="searchbar flex items-center px-4 pb-[0.115rem] text-white rounded-l-full h-[2rem] w-[35rem]"
      />
      <button
        type="submit"
        className="px-6 flex items-center py-2 bg-[#181717] text-white h-[2rem] rounded-r-full">
        <CiSearch className="size-5" />
      </button>
    </form>
  );
}

export default SearchBar;

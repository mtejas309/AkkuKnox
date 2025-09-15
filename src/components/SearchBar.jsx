import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Paper } from "@mui/material";
import { MagnifyingGlass, X } from "phosphor-react";

const SearchBar = ({
  onSearch,
  placeholder = "Search categories and widgets...",
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <Paper elevation={1} className="mb-4 p-2 bg-white rounded-lg">
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MagnifyingGlass size={20} className="text-gray-500" />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={clearSearch}
                edge="end"
                size="small"
              >
                <X size={16} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
};

export default SearchBar;

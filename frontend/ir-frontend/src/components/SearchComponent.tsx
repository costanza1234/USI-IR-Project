import { useState } from 'react';
import Box from '@mui/material/Box';
import SearchBar from '@/components/SearchBar';
import SearchFilters from '@/components/SearchFilters';

interface SearchComponentProps {
  onSearch: (query: string) => void;
}

export default function SearchComponent({ onSearch }: SearchComponentProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <SearchFilters />
    </Box>
  );
}

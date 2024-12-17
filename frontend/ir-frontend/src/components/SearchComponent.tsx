import { useState } from 'react';
import Box from '@mui/material/Box';
import SearchBar from '@/components/SearchBar';
import SearchFilters from '@/components/SearchFilters';

interface SearchComponentProps {
  onSearch: (
    query: string,
    selectedCauses: string[],
    selectedContinents: string[],
    selectedCountries: string[]
  ) => void;
}

export default function SearchComponent({ onSearch }: SearchComponentProps) {
  const [query, setQuery] = useState('');
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const handleSearch = () => {
    onSearch(query, selectedCauses, selectedContinents, selectedCountries);
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
      <SearchFilters
        selectedCauses={selectedCauses}
        setSelectedCauses={setSelectedCauses}
        selectedContinents={selectedContinents}
        setSelectedContinents={setSelectedContinents}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
      />
    </Box>
  );
}

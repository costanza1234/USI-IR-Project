import Box from '@mui/material/Box';
import SearchBar from '@/components/SearchBar';
import SearchFilters from '@/components/SearchFilters';

interface SearchComponentProps {
  onSearch: () => void;
}

export default function SearchComponent({ onSearch }: SearchComponentProps) {
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
      <SearchBar onSearch={onSearch} />
      <SearchFilters />
    </Box>
  );
}

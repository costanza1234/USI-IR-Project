import SearchBar from '@/components/SearchBar';
import SearchFilters from '@/components/SearchFilters';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <SearchBar />
      <SearchFilters />
    </Box>
  );
}

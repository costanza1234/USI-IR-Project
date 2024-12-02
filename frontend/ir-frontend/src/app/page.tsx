'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import SearchComponent from '@/components/SearchComponent';
import CharityList from '@/components/CharityList';

export default function Home() {
  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = () => {
    setSearchActive(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: searchActive ? 'flex-start' : 'center',
        alignItems: 'center',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: searchActive ? 'sticky' : 'static',
          top: '1rem',
          width: '100%',
          zIndex: 1,
          backgroundColor: 'white',
        }}
      >
        <SearchComponent onSearch={handleSearch} />
      </Box>
      {searchActive && (
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            width: '60%',
            padding: '1rem',
          }}
        >
          <CharityList />
        </Box>
      )}
    </Box>
  );
}

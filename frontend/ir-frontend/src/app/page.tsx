'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import SearchComponent from '@/components/SearchComponent';
import CharityList from '@/components/CharityList';
import { Charity, CharityResponse, SearchResponse } from '@/app/types/charity';

export default function Home() {
  const [searchActive, setSearchActive] = useState(false);
  const [charities, setCharities] = useState<Charity[]>([]);

  const handleSearch = async (query: string) => {
    setSearchActive(true);
    const response = await fetch(`http://127.0.0.1:8000/search?query=${query}`);
    const data: SearchResponse = await response.json();
    const sortedCharities = data.charities
      .sort((a: CharityResponse, b: CharityResponse) => b.score - a.score)
      .map((item: CharityResponse) => item.charity);
    setCharities(sortedCharities);
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
          <CharityList charities={charities} />
        </Box>
      )}
    </Box>
  );
}

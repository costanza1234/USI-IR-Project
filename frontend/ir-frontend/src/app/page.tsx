'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import SearchComponent from '@/components/SearchComponent';
import CharityList from '@/components/CharityList';
import { Charity, CharityResponse, SearchResponse } from '@/app/types/charity';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [searchActive, setSearchActive] = useState(false);
  const [charities, setCharities] = useState<Charity[]>([]);
  const [query, setQuery] = useState('');

  const handleSearch = async (query: string) => {
    setSearchActive(true);
    setQuery(query);
    const sessionId = uuidv4();
    const response = await fetch(
      `http://127.0.0.1:8000/search?query=${query}&session_id=${sessionId}`
    );
    const data: SearchResponse = await response.json();

    // if data is empty (undefined), set charities to an empty array
    if (!data || !data.charities) {
      setCharities([]);
      return;
    } else {
      const mappedCharities = data.charities.map((item: CharityResponse) => {
        return {
          ...item.charity,
          docid: item.docid,
        };
      });
      setCharities(mappedCharities);
    }
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
          <CharityList charities={charities} query={query} />
        </Box>
      )}
    </Box>
  );
}

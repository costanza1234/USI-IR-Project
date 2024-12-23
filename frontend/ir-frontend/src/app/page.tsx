'use client';

import { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import SearchComponent from '@/components/SearchComponent';
import CharityList from '@/components/CharityList';
import { Charity, CharityResponse, SearchResponse } from '@/app/types/charity';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [searchActive, setSearchActive] = useState(false);
  const [charities, setCharities] = useState<Charity[]>([]);
  const [query, setQuery] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (
    query: string,
    selectedCauses: string[],
    selectedContinents: string[],
    selectedCountries: string[]
  ) => {
    setSearchActive(true);
    setQuery(query);
    const newSessionId = uuidv4();
    setSessionId(newSessionId);

    const queryParams = new URLSearchParams({
      query,
      session_id: newSessionId,
    });

    selectedCauses.forEach((cause) => queryParams.append('causes', cause));
    selectedContinents.forEach((continent) =>
      queryParams.append('continents', continent)
    );
    selectedCountries.forEach((country) =>
      queryParams.append('countries', country)
    );

    setLoading(true);
    const response = await fetch(
      `http://127.0.0.1:8000/search?${queryParams.toString()}`
    );
    const data: SearchResponse = await response.json();
    setLoading(false);

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

  const handleFeedback = async (docid: number, relevant: number) => {
    setLoading(true);
    const response = await fetch(
      `http://127.0.0.1:8000/feedback/${sessionId}/${docid}/${relevant}`,
      {
        method: 'POST',
      }
    );
    const data: SearchResponse = await response.json();
    setLoading(false);

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
      {!searchActive && (
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          I&apos;m looking for a charity about...
        </Typography>
      )}
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
        <>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                width: '60%',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CharityList
                charities={charities}
                query={query}
                handleFeedback={handleFeedback}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

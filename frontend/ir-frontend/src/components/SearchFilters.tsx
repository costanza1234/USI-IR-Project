'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { causes } from '@/app/constants/causes';
import { continents } from '@/app/constants/continents';
import { countries } from '@/app/constants/countries';

interface SearchFiltersProps {
  selectedCauses: string[];
  setSelectedCauses: (causes: string[]) => void;
  selectedContinents: string[];
  setSelectedContinents: (continents: string[]) => void;
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
}

export default function SearchFilters({
  selectedCauses,
  setSelectedCauses,
  selectedContinents,
  setSelectedContinents,
  selectedCountries,
  setSelectedCountries,
}: SearchFiltersProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, mt: '0.8rem', flexWrap: 'wrap' }}>
      <Autocomplete
        multiple
        options={causes}
        getOptionLabel={(option) => option}
        value={selectedCauses}
        onChange={(event, newValue) => setSelectedCauses(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Causes" placeholder="Select causes" />
        )}
        sx={{ minWidth: 200, flex: 1 }}
      />
      <Autocomplete
        multiple
        options={continents}
        getOptionLabel={(option) => option}
        value={selectedContinents}
        onChange={(event, newValue) => setSelectedContinents(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Continents"
            placeholder="Select continents"
          />
        )}
        sx={{ minWidth: 200, flex: 1 }}
      />
      <Autocomplete
        multiple
        options={countries}
        getOptionLabel={(option) => option}
        value={selectedCountries}
        onChange={(event, newValue) => setSelectedCountries(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Countries"
            placeholder="Select countries"
          />
        )}
        sx={{ minWidth: 200, flex: 1 }}
      />
    </Box>
  );
}

'use client';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

export default function SearchFilters() {
  const [theme, setTheme] = useState(' ');
  const [location, setLocation] = useState(' ');
  const [yearsActive, setYearsActive] = useState(' ');

  const handleThemeChange = (event: SelectChangeEvent) => {
    setTheme(event.target.value as string);
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const handleYearsActiveChange = (event: SelectChangeEvent) => {
    setYearsActive(event.target.value as string);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mt: '0.8rem' }}>
      <FormControl sx={{ minWidth: 100, height: '40px' }}>
        <InputLabel id="theme-select-label">Theme</InputLabel>
        <Select
          labelId="theme-select-label"
          id="theme-select"
          value={theme}
          label="Theme"
          onChange={handleThemeChange}
          sx={{ height: '40px', padding: '8px' }}
        >
          <MenuItem value="animals">Animals</MenuItem>
          <MenuItem value="environment">Environment</MenuItem>
          <MenuItem value="education">Education</MenuItem>
          <MenuItem value="health">Health</MenuItem>
          <MenuItem value="human-rights">Human Rights</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 100, height: '40px' }}>
        <InputLabel id="location-select-label">Location</InputLabel>
        <Select
          labelId="location-select-label"
          id="location-select"
          value={location}
          label="Location"
          onChange={handleLocationChange}
          sx={{ height: '40px', padding: '8px' }}
        >
          <MenuItem value="eu">Europe</MenuItem>
          <MenuItem value="na">North America</MenuItem>
          <MenuItem value="sa">South America</MenuItem>
          <MenuItem value="as">Asia</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 100, height: '40px' }}>
        <InputLabel id="years-active-select-label">Years Active</InputLabel>
        <Select
          labelId="years-active-select-label"
          id="years-active-select"
          value={yearsActive}
          label="Years Active"
          onChange={handleYearsActiveChange}
          sx={{ height: '40px', padding: '8px' }}
        >
          <MenuItem value="1">1 Year</MenuItem>
          <MenuItem value="2">2 Years</MenuItem>
          <MenuItem value="3">3 Years</MenuItem>
          <MenuItem value="5">5 Years</MenuItem>
          <MenuItem value="10">10+ Years</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

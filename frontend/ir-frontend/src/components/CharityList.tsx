import { Box, Card, CardContent, Typography } from '@mui/material';

const charities = [
  { name: 'Charity 1', description: 'Description 1' },
  { name: 'Charity 2', description: 'Description 2' },
  { name: 'Charity 3', description: 'Description 3' },
  { name: 'Charity 4', description: 'Description 4' },
  { name: 'Charity 5', description: 'Description 5' },
  { name: 'Charity 6', description: 'Description 6' },
  { name: 'Charity 7', description: 'Description 7' },
  { name: 'Charity 8', description: 'Description 8' },
  { name: 'Charity 9', description: 'Description 9' },
  { name: 'Charity 10', description: 'Description 10' },
  { name: 'Charity 11', description: 'Description 11' },
  { name: 'Charity 12', description: 'Description 12' },
  { name: 'Charity 13', description: 'Description 13' },
  { name: 'Charity 14', description: 'Description 14' },
  { name: 'Charity 15', description: 'Description 15' },
  { name: 'Charity 16', description: 'Description 16' },
  { name: 'Charity 17', description: 'Description 17' },
  { name: 'Charity 18', description: 'Description 18' },
  { name: 'Charity 19', description: 'Description 19' },
  { name: 'Charity 20', description: 'Description 20' },
  { name: 'Charity 21', description: 'Description 21' },
  { name: 'Charity 22', description: 'Description 22' },
  { name: 'Charity 23', description: 'Description 23' },
  { name: 'Charity 24', description: 'Description 24' },
  { name: 'Charity 25', description: 'Description 25' },
  { name: 'Charity 26', description: 'Description 26' },
  { name: 'Charity 27', description: 'Description 27' },
  { name: 'Charity 28', description: 'Description 28' },
  { name: 'Charity 29', description: 'Description 29' },
  { name: 'Charity 30', description: 'Description 30' },
  { name: 'Charity 31', description: 'Description 31' },
  { name: 'Charity 32', description: 'Description 32' },
  // Add more charities as needed
];

export default function CharityList() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {charities.map((charity, index) => (
        <Card key={index} sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h5">{charity.name}</Typography>
            <Typography variant="body2">{charity.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

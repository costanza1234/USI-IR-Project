import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid2 as Grid,
  Link,
  IconButton,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const charities = [
  {
    name: 'Charity 1',
    description: 'Description 1',
    logo: 'https://cataas.com/cat',
    website: 'https://charity1.org',
  },
  {
    name: 'Charity 2',
    description: 'Description 2',
    logo: 'https://cataas.com/cat',
    website: 'https://charity2.org',
  },
  {
    name: 'Charity 3',
    description: 'Description 3',
    logo: 'https://cataas.com/cat',
    website: 'https://charity3.org',
  },
  {
    name: 'Charity 4',
    description: 'Description 4',
    logo: 'https://cataas.com/cat',
    website: 'https://charity4.org',
  },
  {
    name: 'Charity 5',
    description: 'Description 5',
    logo: 'https://cataas.com/cat',
    website: 'https://charity5.org',
  },
  {
    name: 'Charity 6',
    description: 'Description 6',
    logo: 'https://cataas.com/cat',
    website: 'https://charity6.org',
  },
  {
    name: 'Charity 7',
    description: 'Description 7',
    logo: 'https://cataas.com/cat',
    website: 'https://charity7.org',
  },
];

export default function CharityList() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {charities.map((charity, index) => (
        <Card key={index} sx={{ width: '100%' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid
                size={{
                  xs: 2,
                }}
              >
                <Box
                  component="img"
                  src={charity.logo}
                  alt={`${charity.name} logo`}
                  sx={{ width: '100%', height: 'auto', aspectRatio: '1 / 1' }}
                />
              </Grid>
              <Grid
                size={{
                  xs: 10,
                }}
              >
                <Typography variant="h5">
                  <Link href={charity.website} underline="none" color="inherit">
                    {charity.name}
                  </Link>
                </Typography>
                <Typography variant="body2">{charity.description}</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <IconButton aria-label="thumb up">
                    <ThumbUpIcon />
                  </IconButton>
                  <IconButton aria-label="thumb down">
                    <ThumbDownIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

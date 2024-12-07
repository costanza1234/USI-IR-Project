import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  Grid2 as Grid,
  IconButton,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Charity } from '@/app/types/charity';

interface CharityListProps {
  charities: Charity[];
}

export default function CharityList({ charities }: CharityListProps) {
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
                  src={charity.logoUrl}
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
                  <Link
                    href={charity.organization_url}
                    underline="none"
                    color="inherit"
                  >
                    {charity.name}
                  </Link>
                </Typography>
                <Typography variant="body2">
                  {charity.mission.length > 500
                    ? `${charity.mission.substring(0, 500)}...`
                    : charity.mission}
                </Typography>
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

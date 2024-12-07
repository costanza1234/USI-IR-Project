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
  query: string;
}

const stopWords = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'but',
  'by',
  'for',
  'if',
  'in',
  'into',
  'is',
  'it',
  'no',
  'not',
  'of',
  'on',
  'or',
  'such',
  'that',
  'the',
  'their',
  'then',
  'there',
  'these',
  'they',
  'this',
  'to',
  'was',
  'will',
  'with',
]);

export default function CharityList({ charities, query }: CharityListProps) {
  const highlightQuery = (text: string, query: string) => {
    if (!query) return text;

    const queryWords = query
      .split(' ')
      .filter((word) => word && !stopWords.has(word.toLowerCase()));

    const regex = new RegExp(`(${queryWords.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      queryWords.includes(part.toLowerCase()) ? (
        <span key={index} style={{ fontWeight: 'bold' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const cutMission = (mission: string, length: number = 500) => {
    if (mission.length <= length) return mission;
    return mission.slice(0, length) + '...';
  };

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
                  {highlightQuery(cutMission(charity.mission), query)}
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

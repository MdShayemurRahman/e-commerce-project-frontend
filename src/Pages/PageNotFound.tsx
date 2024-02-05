import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="h1" gutterBottom>
        404 Page Not Found
      </Typography>
      <Typography variant="h5" component="h5" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Return Home
      </Button>
    </Container>
  )
}

export default PageNotFound

import { Container, Typography } from '@mui/material';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '.2rem',
        background: '#000',
        color: '#fff',
      }}
    >
      <Container maxWidth='sm'>
        <Typography variant='body2' align='center'>
          &copy; All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;

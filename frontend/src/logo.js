import React from 'react';
import { Box, Typography } from '@mui/material';

const Logo = () => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    mb: 3,
    '&:hover': {
      'svg circle:first-of-type': {
        transform: 'rotate(360deg)',
        transition: 'transform 1s ease-in-out'
      }
    }
  }}>
    {/* SVG Logo */}
    <svg 
      width="60" 
      height="60" 
      viewBox="0 0 60 60"
      style={{ marginRight: '16px', cursor: 'pointer' }}
    >
      {/* Blue Circle with subtle animation */}
      <circle 
        cx="30" 
        cy="30" 
        r="28" 
        fill="#1976d2" 
        style={{ transition: 'transform 1s ease-in-out' }}
      />
      
      {/* Construction Helmet */}
      <path 
        d="M30 15c-8.284 0-15 5.82-15 13v5h3v-5c0-5.523 5.373-10 12-10s12 4.477 12 10v5h3v-5c0-7.18-6.716-13-15-13z" 
        fill="#fff"
      />
      <path 
        d="M18 33h24v6c0 4.971-5.373 9-12 9s-12-4.029-12-9v-6z" 
        fill="#fff"
      />
      
      {/* Safety Badge */}
      <circle cx="45" cy="45" r="12" fill="#ff9800" />
      <path 
        d="M45 37l4 4-8 8-4-4 8-8z" 
        fill="#fff"
      />
      <path 
        d="M45 53l-4-4 8-8 4 4-8 8z" 
        fill="#fff"
      />
      
      {/* 360° Text */}
      <text 
        x="30" 
        y="58" 
        fontFamily="Arial" 
        fontSize="10" 
        fill="#fff" 
        textAnchor="middle"
        fontWeight="bold"
      >
        360°
      </text>
    </svg>
    
    {/* Text Component */}
    <Box>
      <Typography variant="h4" component="div" sx={{ 
        fontWeight: 800,
        letterSpacing: '-0.5px',
        background: 'linear-gradient(45deg, #1976d2 30%, #ff9800 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: 1,
        fontFamily: '"Segoe UI", Roboto, sans-serif'
      }}>
        BuildPredict
      </Typography>
      <Typography variant="subtitle1" sx={{
        color: '#555',
        fontStyle: 'italic',
        lineHeight: 1.2,
        fontSize: '0.9rem',
        mt: 0.5
      }}>
        Smart Construction Analytics
      </Typography>
    </Box>
  </Box>
);

export default Logo;
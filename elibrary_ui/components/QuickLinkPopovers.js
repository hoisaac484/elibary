// src/components/QuickLinkPopover.js
import React from 'react';
import { Box, Popover, Link } from '@mui/material';

const QuickLinkPopover = ({ id, open, anchorEl, handleClose, quickLinks }) => (
  <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    PaperProps={{
      sx: {
        width: '25%',
        maxHeight: '80%',
        boxShadow: 'none',
        overflowY: 'auto',
        backgroundColor: 'transparent',
        '&::-webkit-scrollbar': {
          width: '5px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'transparent linear-gradient(#00B395 0%, #35E242 100%) 0% 0% no-repeat padding-box',
          borderRadius: '3px',
        },
      },
    }}
  >
    <Box
      sx={{
        position: 'relative',
        left: '80%',
        width: '10px',
        height: '10px',
      }}
    >
      <Box
        sx={{
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: '10px solid #ffffff',
        }}
      />
      <Box
        sx={{
          position: 'relative',
          top: '-5px',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: '10px solid #33d678',
        }}
      />
    </Box>

    <Box
      sx={{
        width: '100%',
        height: '100%',
        border: '5px solid white',
        boxShadow: 3
      }}
    >
      {quickLinks.map((link, index) => (
        <Box
          key={index}
          sx={{
            width: '100%',
            height: `110px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: index % 2 === 1 ? '#9feac1' : '#33d678',
          }}
        >
          <Link
            href={link.link}
            sx={{
              color: '#fff',
              font: 'Poppins',
              fontSize: '16px',
              letterSpacing: '0.64px',
              textDecorationColor: 'white',
            }}
          >
            {link.name}
          </Link>
        </Box>
      ))}
    </Box>
  </Popover>
);

export default QuickLinkPopover;
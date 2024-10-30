import React from 'react';
import { Box, Drawer } from '@mui/material';
import SearchForm from './SearchForm';
import Chatbot from './Chatbot';

const Sidebar = ({ onSearch, titles, open, onClose }) => {
  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
      >
        <Box sx={{ width: '100%', height: '100%', padding: '80px 10px' }}>
          <SearchForm onSearch={onSearch} titles={titles} />
          <Chatbot />
        </Box>
      </Drawer>

      <Box
        sx={{
          padding: '80px 10px',
          width: '20.7%',
          height: '100vh',
          display: { xs: 'none', lg: 'block' },
        }}
      >
        <SearchForm onSearch={onSearch} titles={titles} />
        <Chatbot />
      </Box>
    </>
  );
};

export default Sidebar;
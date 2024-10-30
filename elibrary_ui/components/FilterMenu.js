'use client';
import React from 'react';
import { Menu, MenuItem, Checkbox, FormControlLabel } from '@mui/material';

const FilterMenu = ({ 
    anchorEl, 
    handleClose, 
    categories, 
    selectedCategories, 
    handleCategoryChange, 
    handleOtherChange, 
    handleSelectAll 
}) => {
  const isAllSelected = categories.every(category => selectedCategories.includes(category)) && selectedCategories.includes('Other');

  const toggleSelectAll = () => {
    if (isAllSelected) {
      handleSelectAll([]);
    } else {
      handleSelectAll([...categories, 'Other']);
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      sx={{ '& .MuiPaper-root': { background: '#42b050', width: '160px' } }}
    >
      {categories.map((category) => (
        <MenuItem 
          key={category} 
          sx={{ display: 'flex', alignItems: 'center', color: 'white', height: '33px' }}
        >
          <FormControlLabel
            control={
              <Checkbox 
                checked={selectedCategories.includes(category)} 
                onChange={handleCategoryChange}
                value={category}
                icon={<span style={{
                  display: 'inline-block',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#fff'
                }} />}
                checkedIcon={<span style={{
                  display: 'inline-block',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#e0218a',
                  border: '3px solid #fff'
                }} />}
              />
            }
            label={category}
            sx={{ flexGrow: 1 }}
          />
        </MenuItem>
      ))}
      <MenuItem 
        sx={{ display: 'flex', alignItems: 'center', color: 'white', height: '33px' }}
      >
        <FormControlLabel
          control={
            <Checkbox 
              checked={selectedCategories.includes('Other')} 
              onChange={handleOtherChange}
              icon={<span style={{
                display: 'inline-block',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#fff'
              }} />}
              checkedIcon={<span style={{
                display: 'inline-block',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#e0218a',
                border: '3px solid #fff'
              }} />}
            />
          }
          label="Others"
          sx={{ flexGrow: 1 }}
        />
      </MenuItem>
      <MenuItem 
        sx={{ display: 'flex', alignItems: 'center', color: 'white', height: '33px' }}
      >
        <FormControlLabel
          control={
            <Checkbox 
              checked={isAllSelected} 
              onChange={toggleSelectAll}
              icon={<span style={{
                display: 'inline-block',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#fff'
              }} />}
              checkedIcon={<span style={{
                display: 'inline-block',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#e0218a',
                border: '3px solid #fff'
              }} />}
            />
          }
          label={isAllSelected ? "Unselect All" : "Select All"}
          sx={{ flexGrow: 1 }}
        />
      </MenuItem>
    </Menu>
  );
};

export default FilterMenu;
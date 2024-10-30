import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import FilterMenu from './FilterMenu';

const TransparentBox = ({ matchCount, onExpandAll, onFilterCategories, selectedCategories, allCategories, expandAll }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(expandAll);
  }, [expandAll]);

  const predefinedCategories = [
    'Quality',
    'Safety',
    'Monitoring',
    'Progress',
    'Environmental',
    'Tracking',
    'Site Supervision',
    'Health'
  ];

  const otherCategories = allCategories.filter(category => !predefinedCategories.includes(category));

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    const newSelectedCategories = checked
      ? [...selectedCategories, value]
      : selectedCategories.filter(category => category !== value);

    onFilterCategories(newSelectedCategories);
  };

  const handleCategoryButtonClick = (category) => {
    if (category === 'Other') {
      const newSelectedCategories = selectedCategories.filter(
        c => predefinedCategories.includes(c)
      );
      onFilterCategories(newSelectedCategories);
    } else {
      const newSelectedCategories = selectedCategories.filter(c => c !== category);
      onFilterCategories(newSelectedCategories);
    }
  };

  const handleOtherChange = () => {
    const isOtherSelected = selectedCategories.includes('Other');
    const newSelectedCategories = isOtherSelected
      ? selectedCategories.filter(c => c !== 'Other' && !otherCategories.includes(c))
      : [...selectedCategories, 'Other', ...otherCategories];

    onFilterCategories(newSelectedCategories);
  };

  const handleSelectAll = () => {
    const allCategories = [...predefinedCategories, ...otherCategories, 'Other'];
    const newSelectedCategories = selectedCategories.length === allCategories.length
      ? []
      : allCategories;

    onFilterCategories(newSelectedCategories);
  };

  const handleExpandCollapse = () => {
    setExpanded(!expanded);
    onExpandAll(); // Call the function to expand or collapse
  };

  const visibleCategories = selectedCategories.filter(category =>
    predefinedCategories.includes(category) || category === 'Other'
  );

  return (
    <Box
      sx={{
        flex: 0,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginTop: '30px',
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 900, marginRight: '10px' }}>
        We've found <span style={{ color: '#42b050' }}>{matchCount}</span> match
        {matchCount !== 1 ? 'es' : ''}
      </Typography>

      <Box sx={{ ml: 'auto' }}>
        {visibleCategories.map((category) => (
          <Button
            key={category}
            variant="contained"
            size="small"
            startIcon={<CloseIcon />}
            sx={{
              background: 'gray',
              color: 'white',
              margin: '5px 10px 5px 0px',
              '&:hover': {
                background: '#696969'
              }
            }}
            onClick={() => handleCategoryButtonClick(category)}
          >
            {category}
          </Button>
        ))}
        <Button
          variant="contained"
          size='small'
          sx={{
            background: '#42b050',
            width: '160px',
            margin: '5px 10px 5px 0px',
            '&:hover': {
              background: '#2e7d32' // Dark green on hover
            }
          }}
          startIcon={<FilterListIcon />}
          onClick={handleFilterClick}
        >
          Filter
        </Button>
        <FilterMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          categories={predefinedCategories}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          handleOtherChange={handleOtherChange}
          handleSelectAll={handleSelectAll}
        />
        <Button
          variant="contained"
          size='small'
          sx={{
            background: '#42b050',
            width: '180px',
            '&:hover': {
              background: '#2e7d32' // Dark green on hover
            }
          }}
          onClick={handleExpandCollapse}
          disabled={matchCount === 0} // Disable when no matches
        >
          {expanded ? 'Collapse All Matches' : 'Expand All Matches'}
        </Button>
      </Box>
    </Box>
  );
};

export default TransparentBox;
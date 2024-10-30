import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const SearchForm = ({ onSearch, titles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [fullSuggestion, setFullSuggestion] = useState('');
  const inputRef = useRef();

  const handleSearchTermChange = (event) => {
    const input = event.target.value;
    setSearchTerm(input);

    const spaceCount = (input.match(/ /g) || []).length;
    const hasConsecutiveSpaces = input.includes('  ');
    let suggestion = '';
    let fullSuggestion = '';

    if (!hasConsecutiveSpaces && spaceCount >= 1 && input.lastIndexOf(' ') === input.length - 1) {
      const spaceIndex = input.lastIndexOf(' ');
      const substring = input.slice(0, spaceIndex + 1).trim();
      const nextTitle = titles
        .filter(title => title.toLowerCase().startsWith(substring.toLowerCase()))
        .sort()
        .find(title => title.toLowerCase() > input.toLowerCase());

      if (nextTitle) {
        suggestion = nextTitle.slice(input.length - 1);
        fullSuggestion = nextTitle;
      }
    }

    setSuggestion(suggestion);
    setFullSuggestion(fullSuggestion);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm, fromDate, toDate);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab' && suggestion && fullSuggestion) {
      event.preventDefault();
      setSearchTerm(fullSuggestion);
      setSuggestion('');
      setFullSuggestion('');
    } else if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === 'Enter' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        handleSearchClick();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [searchTerm, fromDate, toDate]);

  return (
    <>
      <TextField
        placeholder="Search by name or description"
        variant="standard"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchTermChange}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        InputProps={{
          sx: {
            '&:before': {
              borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottom: '2px solid #42b050',
            },
            '&:after': {
              borderBottom: '2px solid #42b050',
            },
            transition: 'border-bottom-color 0.3s ease',
            position: 'relative',
            zIndex: 1,
          },
        }}
      />
      {suggestion && (
        <Typography
          sx={{
            position: 'absolute',
            top: '100px',
            left: `${inputRef.current ? (inputRef.current.selectionStart - (searchTerm.match(/ /g) || []).length + 1) * 8 + 13 : 0}px`,
            color: 'rgba(0, 0, 0, 0.3)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            zIndex: 0,
          }}
        >
          {suggestion}
        </Typography>
      )}
      <Typography sx={{ mt: 2, mb: -1, fontWeight: 'bold' }}>Date</Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <TextField
          label="From"
          type="date"
          variant="standard"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true, sx: { color: '#42b050 !important' } }}
          InputProps={{
            sx: {
              color: '#42b050',
              '&:before': {
                borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
              },
              '&:hover:not(.Mui-disabled):before': {
                borderBottom: '2px solid #42b050',
              },
              '&:after': {
                borderBottom: '2px solid #42b050',
              },
              transition: 'border-bottom-color 0.3s ease',
            },
          }}
          value={fromDate}
          onChange={handleFromDateChange}
        />
        <TextField
          label="To"
          type="date"
          variant="standard"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true, sx: { color: '#42b050 !important' } }}
          InputProps={{
            sx: {
              color: '#42b050',
              '&:before': {
                borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
              },
              '&:hover:not(.Mui-disabled):before': {
                borderBottom: '2px solid #42b050',
              },
              '&:after': {
                borderBottom: '2px solid #42b050',
              },
              transition: 'border-bottom-color 0.3s ease',
            },
          }}
          value={toDate}
          onChange={handleToDateChange}
        />
      </Box>
      <Button
        variant="contained"
        fullWidth
        onClick={handleSearchClick}
        sx={{
          marginTop: "10px",
          height: '50px',
          font: 'Poppins',
          fontSize: '16px',
          lineHeight: '25px',
          background: 'transparent linear-gradient(270deg, #00B395 0%, #35E242 100%) 0% 0% no-repeat padding-box'
        }}
      >
        Search
      </Button>
    </>
  );
};

export default SearchForm;
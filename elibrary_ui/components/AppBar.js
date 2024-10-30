import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import greenLogo from '../public/AIS_logo.png';
import QuickLinkPopover from './QuickLinkPopovers';

const LibraryAppBar = ({ quickLinks, onMenuClick }) => {
  const [currentTime, setCurrentTime] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery('(max-width:1200px)');
  const isVerySmallScreen = useMediaQuery('(max-width:700px)');

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now);

    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => {
    return date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }) : '';
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : '';
  };

  const formatWeekday = (date) => {
    return date ? date.toLocaleDateString('en-GB', { weekday: 'short' }) : '';
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '59px',
        background: '#ffffff 0% 0% no-repeat padding-box',
        opacity: '1',
        minWidth: '500px',
        zIndex: 1300,
      }}>
      {isMobile && (
        <IconButton
          onClick={onMenuClick}
          sx={{ position: 'absolute', top: 10, left: 8 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          left: '54px',
          opacity: '1',
        }}>
        <a href=''><img src={greenLogo.src} alt="Library Logo" width={120} height={40} /></a>
      </Box>
      <Box
        id='right'
        sx={{
          position: 'absolute',
          height: '59px',
          right: '0%',
          display: 'flex',
          alignItems: 'center',
        }}>
        <Button
          variant="text"
          onClick={handleClick}
          sx={{
            marginRight: '59px',
            textAlign: 'center',
            font: 'Poppins',
            fontSize: '20px',
            lineHeight: '30px',
            fontWeight: 'bold',
            letterSpacing: '0px',
            color: '#42B050',
            opacity: '1',
          }}>
          Quick Link
        </Button>
        <QuickLinkPopover
          id={id}
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          quickLinks={quickLinks}
        />
        {!isVerySmallScreen && (
          <Box
            sx={{
              height: '100%',
              marginRight: '57px',
            }}>
            <Typography
              component="div"
              variant="h5"
              sx={{
                width: '55px',
                height: '34px',
                marginTop: '5px',
                fontWeight: 'medium',
                fontSize: '24px',
                lineHeight: '34px',
                font: 'Brandon Grotesque',
                letterSpacing: '0px',
                color: '#707070',
                opacity: '1',
              }}>
              {formatTime(currentTime)}
            </Typography>
            <Typography
              component="div"
              sx={{
                width: '180px',
                height: '20px',
                marginTop: '-7px',
                fontWeight: 'medium',
                fontSize: '14px',
                lineHeight: '20px',
                font: 'Brandon Grotesque',
                letterSpacing: '0.44px',
                color: '#707070',
                opacity: '0.4',
              }}>
              {currentTime && `${formatWeekday(currentTime)}, ${formatDate(currentTime)}`}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LibraryAppBar;
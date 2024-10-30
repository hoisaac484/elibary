'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DoneIcon from '@mui/icons-material/Done';
import _axios from 'axios';

function convertRichText(richDescription) {
  if (!richDescription) return '';

  return richDescription.map(item => {
    if (item.type === 'heading') {
      return `<h${item.level}>${item.children.map(child => child.text).join('')}</h${item.level}>`;
    } else if (item.type === 'paragraph') {
      const paragraphText = item.children.map(child => formatText(child)).join('');
      return `<p>${paragraphText}</p>`;
    } else if (item.type === 'list') {
      const listTag = item.format === 'ordered' ? 'ol' : 'ul';
      const listItems = item.children.map(child => {
        const listItemText = child.children.map(child => formatText(child)).join('');
        return `<li>${listItemText}</li>`;
      }).join('');
      return `<${listTag}>${listItems}</${listTag}>`;
    } else if (item.type === 'code') {
      const codeText = item.children.map(child => formatText(child)).join('');
      return `<pre><code>${codeText}</code></pre>`;
    } else if (item.type === 'quote') {
      const quoteText = item.children.map(child => formatText(child)).join('');
      return `<p class='blockquote'>${quoteText}</p>`;
    } else if (item.type === 'image') {
      const imageUrl = item.image.url;
      const altText = item.image.alternativeText || '';
      return `<div style="text-align: center;"><img src="${imageUrl}" alt="${altText}" Width="100%" /></div>`;
    }
    return '';
  }).join('');
}

function formatText(child) {
  let text = child.text;
  if (child.bold) {
    text = `<strong>${text}</strong>`;
  }
  if (child.italic) {
    text = `<em>${text}</em>`;
  }
  if (child.underline) {
    text = `<u>${text}</u>`;
  }
  if (child.strikethrough) {
    text = `<s>${text}</s>`;
  }
  if (child.type === 'link' && child.url) {
    text = `<a href="${child.url}">${child.children.map(c => c.text).join('')}</a>`;
  }
  return text;
}

const DescriptionBox = ({ tech, onClick }) => {
  // const [isInputVisible, setInputVisible] = useState(false);
  // const [password, setPassword] = useState('');
  const [downloadComplete, setDownloadComplete] = useState(false);
  // const [error, setError] = useState(false);
  // const wrapperRef = useRef(null);

  // const handleDownloadClick = () => {
  //   setInputVisible(true);
  // };

  // const handleInputChange = (event) => {
  //   setPassword(event.target.value);
  //   setError(false);
  // };

  // const handlePasswordSubmit = async () => {
  //   if (!password) {
  //     setError(true);
  //     return;
  //   }

  const handleDownloadClick = async () => {
    //belongs to handlePasswordSubmit
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MEDIA_URL}/api/content/check-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: tech.id,
          // password: password,
        }),
      });

      const data = await response.json();

      if (data.tempUrl) {
        try {
          const fileResponse = await _axios.get(`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.tempUrl}`, {
            responseType: 'blob',
          });

          if (fileResponse.status === 200) {
            let filename = 'downloaded-file';
            const contentDisposition = fileResponse.headers['content-disposition'];

            if (contentDisposition) {
              const match = contentDisposition.match(/filename="(.+)"/);
              if (match) {
                filename = match[1];
              }
            }

            const url = window.URL.createObjectURL(new Blob([fileResponse.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            setDownloadComplete(true);
          } else {
            console.error('File download error:', fileResponse.statusText);
            // setError(true);
          }
        } catch (fileError) {
          console.error('Error fetching the file:', fileError);
          // setError(true);
        }
      // } else {
      //   setError(true);
      }
    } catch (error) {
      console.error('Error:', error);
  //     setError(true);
  //   }
  // };

  // const handleKeyPress = (event) => {
  //   if (event.key === 'Enter') {
  //     handlePasswordSubmit();
  //   }
  // };

  // const handleClickOutside = (event) => {
  //   if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //     setInputVisible(false);
  //     setPassword('');
  //     setError(false);
    }
  };

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  useEffect(() => {
    let timer;
    if (downloadComplete) {
      timer = setTimeout(() => {
        setDownloadComplete(false);
        // setInputVisible(false);
        // setPassword('');
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [downloadComplete]);

  const handleCompleteClick = () => {
    setDownloadComplete(false);
    // setInputVisible(false);
    // setPassword('');
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: 'white',
        boxShadow: 1,
        padding: 2,
        zIndex: 10,
        width: '435px',
        borderRadius: '0px 0px 20px 20px',
        transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out',
        overflow: 'hidden',
      }}
    >
      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
        {tech.title}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: '10px' }} dangerouslySetInnerHTML={{ __html: convertRichText(tech.description) }} />
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} ref={wrapperRef}>
        {!isInputVisible ? ( */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {!downloadComplete ? (
          <Button
            variant="contained"
            size="small"
            sx={{
              background: '#42b050',
              '&:hover': {
                background: '#2e7d32'
              }
            }}
            endIcon={<SaveAltIcon />}
            onClick={handleDownloadClick}
          >
            Manual Download
          </Button>
        ) : (
          // downloadComplete ? (
          <Button
            variant="contained"
            size="small"
            sx={{
              background: '#00d815',
              '&:hover': {
                background: '#2e7d32'
              }
            }}
            endIcon={<DoneIcon />}
            onClick={handleCompleteClick}
          >
            Download Complete
          </Button>
          // ) : (
          //   <div>
          //     <TextField
          //       variant="outlined"
          //       size="small"
          //       type="password"
          //       value={password}
          //       onChange={handleInputChange}
          //       onKeyPress={handleKeyPress}
          //       placeholder="Enter password"
          //       error={error}
          //       sx={{
          //         marginRight: 1,
          //         backgroundColor: '#f3f2f2',
          //         '& .MuiOutlinedInput-root': {
          //           '& fieldset': {
          //             border: error ? '1px solid red' : 'none',
          //           },
          //           '& input::placeholder': {
          //             textAlign: 'center',
          //             fontWeight: 'bold',
          //           },
          //         },
          //       }}
          //       InputProps={{
          //         style: {
          //           textAlign: 'center',
          //         },
          //       }}
          //     />
          //     {error && (
          //       <Typography variant="caption" color="red" sx={{ display: 'block', textAlign: 'center', marginTop: '5px' }}>
          //         {password ? 'Wrong password' : 'Please enter password'}
          //       </Typography>
          //     )}
          //   </div>
          // )
        )}
      </Box>
    </Box>
  );
};

export default DescriptionBox;
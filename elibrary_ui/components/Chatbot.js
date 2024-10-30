import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, List, ListItem } from '@mui/material';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSend = () => {
    if (userInput.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    fetch(`${process.env.NEXT_PUBLIC_OLLAMA_URL}`, {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama3.1",
        prompt: userInput,
        stream: false
      }),
    })
      .then(response => response.json())
      .then((data) => {
        setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: `${data.response}` }]);
        setIsTyping(false);
      })
      .catch(reason => {
        setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "AI:Error" }]);
        setIsTyping(false);
      });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <Box elevation={0} sx={{
      padding: '10px',
      marginTop: '10%',
      height: '45%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#f5f5f5',
      borderRadius: '15px'
    }}>
      <Box sx={{ flexGrow: 1, overflow: 'auto', marginBottom: '10px' }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  backgroundColor: msg.sender === 'user' ? '#e0f7fa' : '#fff',
                  borderRadius: '10px',
                  padding: '10px',
                  maxWidth: '75%',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                  {msg.text}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                  {msg.sender === 'user' ? 'You' : 'Bot'}
                </Typography>
              </Box>
            </ListItem>
          ))}
          {isTyping && (
            <ListItem sx={{ justifyContent: 'flex-start' }}>
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  padding: '10px',
                  maxWidth: '75%',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ textAlign: 'left', fontStyle: 'italic', display: 'flex' }}>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </Typography>
              </Box>
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      <Box sx={{ display: 'flex', background: '#ffffff', borderRadius: '8px' }}>
        <TextField
          value={userInput}
          onChange={handleInputChange}
          variant="outlined"
          size='small'
          fullWidth
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.stopPropagation(); // Prevents the event from propagating up to the global listener
              handleSend();
            }
          }}
          InputProps={{ sx: { "& fieldset": { border: 'none' } } }}
        />
        <Button variant="text" onClick={handleSend} sx={{
          color: '#42b050',
          font: 'Acumin Pro',
          fontSize: '15px',
          lineHeight: '21px',
          fontWeight: 'bold',
          letterSpacing: '0px',
          position: 'relative',
          borderRadius: '0px',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: '25%',
            bottom: '25%',
            width: '1px',
            backgroundColor: '#e8e9e6'
          }
        }}>
          Ask
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;
// src/components/TechCard.js

import React from 'react';
import { Box, IconButton, Button, CardContent, Collapse, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import DescriptionBox from './DescriptionBox';

const TechCard = ({
  tech,
  index,
  currentImageIndex,
  selectedTechs,
  handleCardClick,
  handleImageSwitch,
  handleDescriptionClick,
  techRefs,
  thumbnail,
}) => {
  const currentImage = tech.images[currentImageIndex[index]];

  return (
    <Box
      className="tech-card"
      sx={{ position: 'relative', cursor: 'pointer' }}
      ref={(el) => (techRefs.current[index] = el)}
      onClick={() => handleCardClick(tech, index)}
    >
      <Card
        sx={{
          height: '218px',
          width: '435px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'border-radius 0.3s ease',
          borderRadius: selectedTechs.includes(tech) ? '20px 20px 0 0' : '20px',
          marginRight: '50px',
          marginTop: '30px'
        }}
      >
        <CardCover>
          <img
            src={
              currentImage?.url
                ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${currentImage.url}`
                : `${process.env.NEXT_PUBLIC_MEDIA_URL}${thumbnail?.url}`
            }
            height={218}
            width={435}
            alt={
              currentImage?.url
                ? currentImage.alternativeText
                : thumbnail?.alternativeText
            }
            style={{
              borderRadius: selectedTechs.includes(tech) ? '20px 20px 0 0' : '20px',
            }}
          />
        </CardCover>
        <CardContent>
          <Button
            variant="text"
            size="small"
            sx={{ position: 'absolute', top: '8px', left: '15px', color: 'white', backgroundColor: '#000000', opacity: '0.3' }}
          >
            {selectedTechs.includes(tech) ? 'Collapse' : 'Expand'}
          </Button>
          <Box sx={{ paddingTop: '25px' }}>
            {selectedTechs.includes(tech) ? (
              <>
                {tech.images.length > 1 && (
                  <>
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', left: '0px', top: '100px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageSwitch(index, 'left');
                      }}
                    >
                      <PlayArrowIcon fontSize="large" sx={{ color: '#42b050', rotate: '180deg' }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', right: '0px', top: '100px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageSwitch(index, 'right');
                      }}
                    >
                      <PlayArrowIcon fontSize="large" sx={{ color: '#42b050' }} />
                    </IconButton>
                  </>
                )}
              </>
            ) : (
              <Box sx={{ maxWidth: '400px', position: 'absolute', left: '15px', top: '70px' }}>
                <Typography variant="h5" component="div" sx={{ color: 'white', fontWeight: 'bold', backgroundColor: '#000', opacity: 0.7, padding: '5px 5px',  borderRadius: '5px'}}>
                  {tech.title}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
        <Box sx={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {tech.category.map((cat) => (
            <Box key={cat} sx={{ backgroundColor: '#000', opacity: 0.5, borderRadius: '10px', padding: '5px 10px', color: 'white' }}>
              <Typography variant="body2">{cat}</Typography>
            </Box>
          ))}
        </Box>
      </Card>
      <Collapse in={selectedTechs.includes(tech)} timeout="auto" unmountOnExit>
        <Box onClick={handleDescriptionClick}>
          <DescriptionBox tech={tech} />
        </Box>
      </Collapse>
    </Box>
  );
};

export default TechCard;
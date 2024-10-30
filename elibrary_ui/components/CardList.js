// src/components/CardList.js

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Grid } from '@mui/material';
import TechCard from './TechCard';

const CardList = ({ expandAll, techs, defaultThumbnail }) => {
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState([]);
  const techRefs = useRef([]);

  useEffect(() => {
    setCurrentImageIndex(Array(techs.length).fill(0));
  }, [techs]);

  useEffect(() => {
    if (expandAll) {
      setSelectedTechs(techs);
    } else {
      setSelectedTechs([]);
    }
  }, [expandAll, techs]);

  const handleCardClick = useCallback((tech, index) => {
    setSelectedTechs((prevSelectedTechs) => {
      if (prevSelectedTechs.includes(tech)) {
        return prevSelectedTechs.filter((selectedTech) => selectedTech !== tech);
      } else {
        return [...prevSelectedTechs, tech];
      }
    });

    setTimeout(() => {
      if (techRefs.current[index]) {
        techRefs.current[index].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    }, 0);
  }, []);

  const handleImageSwitch = (index, direction) => {
    setCurrentImageIndex((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      const totalImages = techs[index].images.length;
      if (direction === 'left') {
        newIndexes[index] = (newIndexes[index] - 1 + totalImages) % totalImages;
      } else {
        newIndexes[index] = (newIndexes[index] + 1) % totalImages;
      }
      return newIndexes;
    });
  };

  const handleDescriptionClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Grid container>
      {techs.map((tech, index) => (
        <Grid item key={tech.id}>
          <TechCard
            tech={tech}
            index={index}
            currentImageIndex={currentImageIndex}
            selectedTechs={selectedTechs}
            handleCardClick={handleCardClick}
            handleImageSwitch={handleImageSwitch}
            handleDescriptionClick={handleDescriptionClick}
            techRefs={techRefs}
            thumbnail={defaultThumbnail}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardList;
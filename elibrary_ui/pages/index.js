import React, { useRef, useState, useMemo } from 'react';
import { Box, Grid, Button, useMediaQuery } from '@mui/material';
import LibraryAppBar from '../components/AppBar';
import Sidebar from '../components/Sidebar';
import CardList from '../components/CardList';
import TransparentBox from '../components/TransparentBox';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { fetchTechs } from './api/fetchTechs';
import { fetchDefaultThumbnail } from './api/fetchDefaultThumbnail';
import { fetchQuickLinks } from './api/fetchQuickLinks';

export default function Page({ initialTechs, defaultThumbnail, quickLinks }) {
  const cardListRef = useRef(null);
  const [expandAll, setExpandAll] = useState(false);
  const [searchResults, setSearchResults] = useState(initialTechs);
  const [filteredResults, setFilteredResults] = useState(initialTechs);
  const [matchCount, setMatchCount] = useState(initialTechs.length);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    fromDate: '',
    toDate: '',
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:1200px)');

  const titles = useMemo(() => {
    return searchResults.map(tech => tech.title);
  }, [searchResults]);

  const scrollToTop = () => {
    if (cardListRef.current) {
      cardListRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleExpandAll = () => {
    setExpandAll(prevExpandAll => !prevExpandAll);
  };

  const handleSearch = (searchTerm, fromDate, toDate) => {
    const trimmedSearchTerm = searchTerm.trim();
    setSearchCriteria({ searchTerm: trimmedSearchTerm, fromDate, toDate });
    setSelectedCategories([]);
    filterTechs(trimmedSearchTerm, fromDate, toDate, []);
  };

  const handleToggleDrawer = () => {
    setDrawerOpen(prev => !prev);
  };

  const filterTechs = (searchTerm = '', fromDate, toDate, selectedCategories) => {
    const filteredTechs = searchResults.filter(tech => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const matchesSearchTerm = searchTerm
        ? tech.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          searchInRichText(tech.description, lowerCaseSearchTerm)
        : true;

      const matchesCategory = selectedCategories.length === 0 || tech.category.some(category => selectedCategories.includes(category));
      const matchesFromDate = fromDate === '' || new Date(tech.publishDate) >= new Date(fromDate);
      const matchesToDate = toDate === '' || new Date(tech.publishDate) <= new Date(toDate);

      return matchesSearchTerm && matchesCategory && matchesFromDate && matchesToDate;
    });

    setFilteredResults(filteredTechs);
    setMatchCount(filteredTechs.length);
  };

  const searchInRichText = (richText, searchTerm) => {
    if (!Array.isArray(richText) || !richText) return false;

    return richText.some(item => {
      if (item.children) {
        return item.children.some(child => {
          return child.text && child.text.toLowerCase().includes(searchTerm);
        });
      }
      return false;
    });
  };

  const handleFilterCategories = (newSelectedCategories) => {
    setSelectedCategories(newSelectedCategories);
    filterTechs(
      searchCriteria.searchTerm,
      searchCriteria.fromDate,
      searchCriteria.toDate,
      newSelectedCategories
    );
  };

  const categories = useMemo(() => {
    return [...new Set(searchResults.flatMap(tech => tech.category))];
  }, [searchResults]);

  return (
    <>
      <Box>
        <LibraryAppBar quickLinks={quickLinks} onMenuClick={handleToggleDrawer} />
      </Box>
      <Grid container sx={{ width: '100%', height: '100%' }}>
        <Sidebar
          onSearch={handleSearch}
          techs={searchResults}
          titles={titles}
          open={drawerOpen}
          onClose={handleToggleDrawer}
        />
        <Grid item sx={{
          flexDirection: 'column',
          position: 'fixed',
          top: 59,
          left: isSmallScreen ? 0 : '20.7%',
          paddingRight: '10px',
          paddingLeft: '4%',
          paddingBottom: '59px',
          background: '#e8e9e6',
          borderTopLeftRadius: '30px',
          height: 'calc(100% - 59px)',
          width: isSmallScreen ? '100%' : 'calc(100% - 20.7%)',
          // minWidth: isSmallScreen ? '0' : '300px',
        }}>
          <TransparentBox
            matchCount={matchCount}
            onExpandAll={handleExpandAll}
            onFilterCategories={handleFilterCategories}
            selectedCategories={selectedCategories}
            allCategories={categories}
            expandAll={expandAll}
          />
          <Box
            ref={cardListRef}
            sx={{
              flex: 1,
              width: '100%',
              height: 'calc(100% - 59px)',
              overflowY: 'auto',
              overflowX: 'auto',
              '::-webkit-scrollbar': {
                width: '5px',
                height: '5px',
              },
              '::-webkit-scrollbar-thumb': {
                background: 'transparent linear-gradient(180deg, #00B395 0%, #35E242 100%) 0% 0% no-repeat padding-box',
                borderRadius: '3px',
              },
              '::-webkit-scrollbar-track': {
                backgroundColor: '#cfcfcf',
              },
            }}
          >
            {matchCount > 0 && (
              <CardList expandAll={expandAll} techs={filteredResults} defaultThumbnail={defaultThumbnail} />
            )}
          </Box>
        </Grid>
        <Box textAlign='center' sx={{
          position: 'fixed',
          bottom: 0,
          left: isSmallScreen ? 0 : '25%',
          width: isSmallScreen ? '100%' : 'calc(100% - 20.7%)',
        }}>
          <Button
            variant="text"
            onClick={scrollToTop}
            color='inherit'
            startIcon={<KeyboardArrowUpIcon />}
            endIcon={<KeyboardArrowUpIcon />}
          >
            Back to Top
          </Button>
        </Box>
      </Grid>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const { props: { initialTechs } } = await fetchTechs();
    const { props: { defaultThumbnail } } = await fetchDefaultThumbnail();
    const { props: { quickLinks } } = await fetchQuickLinks();
    return {
      props: { initialTechs, defaultThumbnail, quickLinks },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { initialTechs: [], defaultThumbnail: [], quickLinks: [] },
    };
  }
}
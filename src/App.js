import Containers from './components/Containers'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import Receptacle from './components/Receptacles';
import "./components/style.css"

function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ width: '100%' ,height: '80%'}}>
          <TabList
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="1" label="Receptacle" />
            <Tab value="2" label="Containers" />
          </TabList>
        </Box>
        <TabPanel value="1"><Receptacle/></TabPanel>
        <TabPanel value="2"><Containers></Containers></TabPanel>
      </TabContext>
    </Box>

  );
}

export default App;

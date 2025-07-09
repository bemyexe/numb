import {Outlet} from 'react-router';
import {Box} from '@chakra-ui/react';

import './style.css';

export const AppLayout = () => {
  return (
    <Box className="min-h-screen flex justify-center items-center bg-gray-500">
      <Outlet />
    </Box>
  );
};

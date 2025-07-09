import {Outlet} from 'react-router';
import {Box} from '@chakra-ui/react';

export const App = () => {
  return (
    <Box className="min-h-screen flex justify-center items-center bg-gray-500">
      <Outlet />
    </Box>
  );
};

import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';

import { DatesProvider } from './providers/DatesProvider';

import View from './routes/View';
import Edit from './routes/Edit';
import ErrorPage from './routes/Error';

const router = createBrowserRouter([
  {
    path: '/edit',
    element: <Edit />,
  },
  {
    path: '/',
    element: <View />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <DatesProvider>
        <Box p={8}>
          <RouterProvider router={router} />      
        </Box>
      </DatesProvider>
    </ChakraProvider>
  );
}

export default App;

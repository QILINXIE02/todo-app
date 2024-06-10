import React from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';

createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <App />
  </MantineProvider>
);

// src/components/Settings.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import Settings from '../../Components/Settings'; // Update import path

test('renders settings component without crashing', () => {
  render(<Settings />);
});

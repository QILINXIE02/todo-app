// src/components/Settings.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import Settings from './index';
import SettingsProvider from '../../context/Setting/index';


test('renders Settings component and updates context values', () => {
  render(
    <SettingsProvider>
      <Settings />
    </SettingsProvider>
  );

  const showCompletedSwitch = screen.getByLabelText('Show Completed ToDos');
  const itemsPerPageInput = screen.getByLabelText('Items Per Page');
  const sortWordInput = screen.getByLabelText('Sort Keyword');
  const updateButton = screen.getByText('Update Settings');

  expect(showCompletedSwitch).toBeInTheDocument();
  expect(itemsPerPageInput).toBeInTheDocument();
  expect(sortWordInput).toBeInTheDocument();

  fireEvent.click(showCompletedSwitch);
  fireEvent.change(itemsPerPageInput, { target: { value: 5 } });
  fireEvent.change(sortWordInput, { target: { value: 'priority' } });
  fireEvent.click(updateButton);

  expect(screen.getByText('Updated Settings:')).toBeInTheDocument();
  expect(screen.getByText('Show Completed ToDos: Yes')).toBeInTheDocument();
  expect(screen.getByText('Items Per Page: 5')).toBeInTheDocument();
  expect(screen.getByText('Sort Keyword: priority')).toBeInTheDocument();
});
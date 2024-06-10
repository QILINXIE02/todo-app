import React, { useContext, useState } from 'react';
import { SettingsContext } from '../../context/Setting';
import { Grid, Card, TextInput, Checkbox, Button } from '@mantine/core';

const SettingsForm = () => {
  const { settings, updateSettings } = useContext(SettingsContext);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalSettings({
      ...localSettings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(localSettings);
  };

  return (
    <Grid>
      <Grid.Col span={8}>
        <form onSubmit={handleSubmit}>
          <Card shadow="sm" padding="lg">
            <TextInput
              label="Items Per Page"
              name="itemsPerPage"
              value={localSettings.itemsPerPage}
              onChange={handleChange}
              type="number"
            />
            <Checkbox
              label="Show Completed"
              name="showCompleted"
              checked={localSettings.showCompleted}
              onChange={handleChange}
            />
            <Button type="submit" mt="sm">Save Settings</Button>
          </Card>
        </form>
      </Grid.Col>
    </Grid>
  );
};

export default SettingsForm;

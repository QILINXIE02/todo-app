// hooks/form.js
import { useState, useEffect } from 'react';

const useForm = (callback, defaultValues = {}) => {
  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    callback({ ...values });
  };

  const handleChange = (event) => {
    let name, value;
    if (typeof event === 'object') {
      name = event.target.name;
      value = event.target.value;
    } else {
      // Handle slider event
      console.log('event from slider', event);
      name = 'difficulty'; // Hard coded for Mantine slider functionality
      value = event; // Change name dynamically if doing stretch goal
    }

    if (parseInt(value)) {
      value = parseInt(value);
    }

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;

import { expect, afterEach } from 'vitest'; 
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import '@testing-library/jest-dom/vitest';
import { server } from './server.js';

expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Start the mock server before all tests
beforeAll(() => server.listen());

// Reset any request handlers after each test
afterEach(() => server.resetHandlers());

// Close the mock server after all tests
afterAll(() => server.close());

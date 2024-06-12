import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App'; // Replace with your main application component
import { LoginProvider } from './context/LoginContext';

// Define a mock server for this test file
const server = setupServer(
  rest.post('/login', (req, res, ctx) => {
    const { username, password } = req.body;
    if (username === 'user' && password === 'password') {
      return res(
        ctx.json({
          token: 'mocked_token',
          user: { username: 'user', role: 'user', capabilities: ['read'] },
        })
      );
    } else {
      return res(ctx.status(401));
    }
  }),
  // Define other API endpoints as needed
);

// Establish API mocking before all tests
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());

describe('Integration tests with mock server', () => {
  it('should login successfully and display user info', async () => {
    render(
      <LoginProvider>
        <App />
      </LoginProvider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    // Wait for the login to complete
    await waitFor(() => {
      const loggedInUser = screen.getByText(/logged in as/i);
      expect(loggedInUser).toBeInTheDocument();
    });
  });

});

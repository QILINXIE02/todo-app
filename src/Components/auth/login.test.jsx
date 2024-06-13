import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginProvider, LoginContext } from '../context/LoginContext';

describe('Login Context', () => {
  it('should login successfully and update user state', async () => {
    render(
      <LoginProvider>
        <TestComponent />
      </LoginProvider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      const loggedInUser = screen.getByText(/logged in as/i);
      expect(loggedInUser).toBeInTheDocument();
    });
  });
});

const TestComponent = () => {
  const { user } = React.useContext(LoginContext);

  return (
    <div>
      {user ? (
        <p>Logged in as {user.username}</p>
      ) : (
        <p>Login to continue</p>
      )}
    </div>
  );
};

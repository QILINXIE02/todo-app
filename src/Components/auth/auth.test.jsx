import React from 'react';
import { render } from '@testing-library/react';
import { LoginProvider } from '../context/LoginContext';
import Auth from '../components/Auth';

describe('Auth Component', () => {
  it('should render children if user has required capability', () => {
    const user = { username: 'testuser', capabilities: ['read'] };

    const { getByText } = render(
      <LoginProvider>
        <Auth capability="read">
          <p>Content for authenticated user with read capability</p>
        </Auth>
      </LoginProvider>,
      {
        wrapper: ({ children }) => (
          <LoginProvider value={{ user }}>{children}</LoginProvider>
        ),
      }
    );

    const contentElement = getByText(
      'Content for authenticated user with read capability'
    );
    expect(contentElement).toBeInTheDocument();
  });

  it('should not render children if user lacks required capability', () => {
    const user = { username: 'testuser', capabilities: ['write'] };

    const { queryByText } = render(
      <LoginProvider>
        <Auth capability="read">
          <p>Content for authenticated user with read capability</p>
        </Auth>
      </LoginProvider>,
      {
        wrapper: ({ children }) => (
          <LoginProvider value={{ user }}>{children}</LoginProvider>
        ),
      }
    );

    const contentElement = queryByText(
      'Content for authenticated user with read capability'
    );
    expect(contentElement).toBeNull();
  });
});

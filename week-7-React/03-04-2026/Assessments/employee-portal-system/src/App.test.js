import { render, screen } from '@testing-library/react';
import App from './App';

// Smoke test: confirms that the app renders without crashing.
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

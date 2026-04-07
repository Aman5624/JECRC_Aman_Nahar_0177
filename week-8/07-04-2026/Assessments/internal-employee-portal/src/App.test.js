import { render, screen } from '@testing-library/react';
import App from './App';

test('renders internal employee portal login heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/internal employee portal/i);
  expect(headingElement).toBeInTheDocument();
});

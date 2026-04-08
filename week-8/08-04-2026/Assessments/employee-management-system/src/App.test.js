import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';

test('renders employee management dashboard heading', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const headingElement = screen.getByText(/employee management dashboard/i);
  expect(headingElement).toBeInTheDocument();
});

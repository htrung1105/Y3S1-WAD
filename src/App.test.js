import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('axios');

test('renders Photo List component for the root path', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const photoListElement = screen.getByText(/Photo List/i);
  expect(photoListElement).toBeInTheDocument();
});

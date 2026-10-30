import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-markdown', () => (props) => <div data-testid="markdown">{props.children}</div>);
jest.mock('remark-math', () => () => {});
jest.mock('rehype-katex', () => () => {});

test('renders Math Studio main screen', () => {
  render(<App />);
  const titleElement = screen.getByText(/База знаний Math Studio/i);
  expect(titleElement).toBeInTheDocument();
});

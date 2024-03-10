import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './index';


describe('Home Page', () => {
  test('Render Whole Page', () => {
    render(<Home/>);
    const linkElement = screen.getByText(/Currency Converter/i);
    expect(linkElement).toBeInTheDocument();
  });
});

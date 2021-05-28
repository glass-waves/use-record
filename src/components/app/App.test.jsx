import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  it('renders App', () => {
    render(<App />);
    
    const redo = screen.getByRole('button', { name: 'redo' });
    const undo = screen.getByRole('button', { name: 'undo' });

    const colorPicker = screen.getByLabelText('Pick a Color');
    fireEvent.input(colorPicker, { target: { value: '#FFFFFF' } });

    const colorDiv = screen.getByTestId('color-div');
    expect(colorDiv).toHaveStyle('background-color: #FFFFFF');

    userEvent.click(undo);
    expect(colorDiv).toHaveStyle('background-color: #FF0000');
    userEvent.click(redo);
    expect(colorDiv).toHaveStyle('background-color: #FFFFFF');
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoList from './ToDoList'; // Replace with your component path

test('renders ToDoList component with no tasks', () => {
  render(<ToDoList />);
  expect(screen.getByText('ToDo List')).toBeInTheDocument();
  expect(screen.getByText('No tasks yet.')).toBeInTheDocument();
});

// test('allows adding a new task', () => {
//     render(<ToDoList />);
//     const input = screen.getByRole('textbox');
//     const button = screen.getByRole('button', { name: /Add Task/i });
  
//     userEvent.type(input, 'Buymilk');
//     userEvent.click(button);
//     //render(<ToDoList />);
//     expect()
//     expect(screen.getByText('Buymilk')).toBeInTheDocument();
//   });

test('prevents adding empty tasks', () => {
    render(<ToDoList />);
    const button = screen.getByRole('button', { name: /Add Task/i });
  
    userEvent.click(button);
  
    expect(screen.getByText('No tasks yet.')).toBeInTheDocument();
  });

  test('clears input field after adding a task', () => {
    render(<ToDoList />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /Add Task/i });
  
    userEvent.type(input, 'Clean the house');
    expect(input.value).toBe('Clean the house');

    userEvent.click(button);
  
    expect(input.value).toBe('');
  });
  
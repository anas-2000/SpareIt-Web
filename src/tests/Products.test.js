import React from 'react';
import { getByRole, getByTestId, render, screen } from '@testing-library/react';
import Products from '../Components/Products';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('axios');

const mockData = [
  {
    _id: 1,
    title: 'Product 1',
    category: 'Category 1',
    vehicle: ['Make 1'],
    vehiclemodel: ['Year 1'],
    img: ""
  },
  {
    _id: 2,
    title: 'Product 2',
    category: 'Category 1',
    vehicle: ['Make 2'],
    vehiclemodel: ['Year 2'],
    img: ""
  },
  {
    _id: 3,
    title: 'Product 3',
    category: 'Category 1',
    vehicle: ['Make 1'],
    vehiclemodel: ['Year 2'],
    img: ""
  },
  {
    _id: 4,
    title: 'Product 4',
    category: 'Category 1',
    vehicle: ['Make 1'],
    vehiclemodel: ['Year 2'],
    img: ""
  },
];

describe('Products component', () => {
 

  it('renders products when products are fetched', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });
    await act(async () => {
      render(<Products category="All" makes={[]} years={[]} />, {wrapper: MemoryRouter});
    });
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

 

  it('filters products by make', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });
    await act(async () => {
      render(<Products category="Category 1" makes={['Make 1']} years={[]} />, {wrapper: MemoryRouter});
    });
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });

  it('filters products by year', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });
    await act(async () => {
      render(<Products category="Category 1" makes={['Make 1']} years={['Year 1']} />, {wrapper: MemoryRouter});
    });
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 3')).not.toBeInTheDocument();
  });

  it('paginates products', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });
    await act(async () => {
      render(<Products category="All" makes={[]} years={[]} />, {wrapper: MemoryRouter});
    });
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();

    const page = screen.getByRole('navigation');
    expect(page).toBeInTheDocument();
  });
});

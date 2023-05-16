import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '../Components/ProductCard';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockProduct = {
    _id: '123',
    img: ['https://th.bing.com/th/id/OIP.bBely2GNv_CwdJfsPTojagAAAA?pid=ImgDet&rs=1'],
    title: 'Example Product',
    rating: 3,
};

describe('ProductCard', () => {
    it('renders the product image', () => {
        render(<ProductCard product={mockProduct} />, {wrapper: MemoryRouter})
        const image = screen.getAllByRole('img');
        expect(image.length).toBe(2);
    });

    it('renders the product title', () => {
        const { getByText } = render(<ProductCard product={mockProduct} />, {wrapper: MemoryRouter});
        expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    it('renders the product rating', () => {
        const { getByRole } = render(<ProductCard product={mockProduct} />, {wrapper: MemoryRouter});
        const img =screen.getAllByRole('img');
        expect(img[img.length - 1]).toHaveAttribute('aria-label', `${mockProduct.rating} Stars`);
    });
});

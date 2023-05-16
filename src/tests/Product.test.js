import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Product from '../Pages/Product';

const mockStore = configureStore([thunk]);

describe('Product component', () => {
    let store;
    let product;
    let relatedProducts;

    beforeEach(() => {
        product = {
            _id: 1,
            title: 'Product A',
            desc: 'Product A description',
            price: 100,
            img: 'https://example.com/product-a.jpg',
        };
        relatedProducts = [
            {
                _id: 2,
                title: 'Product B',
                price: 200,
                img: 'https://example.com/product-b.jpg',
            },
            {
                _id: 3,
                title: 'Product C',
                price: 300,
                img: 'https://example.com/product-c.jpg',
            },
        ];
        store = mockStore({
            cart: {
                products: [],
            },
            user: {
                currentUser: '1'
            }
        });
    });

    it('renders product information', async () => {
        // render(
        //   <Provider store={store}>
        //     <MemoryRouter initialEntries={[`/product/${product._id}`]}>
        //       <Product />
        //     </MemoryRouter>
        //   </Provider>
        // );

        const { getByText, getByRole } = render(<Provider store={store}>
            <MemoryRouter initialEntries={[`/product/${product._id}`]}>
                <Product />
            </MemoryRouter>
        </Provider>);
        await waitFor(() => {
            expect(getByRole('heading', { name: product.title })).toBeInTheDocument();
            expect(getByText(product.desc)).toBeInTheDocument();
            expect(getByText(`$${product.price}`)).toBeInTheDocument();
            expect(getByRole('img', { name: product.name })).toHaveAttribute('src', product.imageUrl);
        });

    });

    //   it('adds product to cart', () => {
    //     render(
    //       <Provider store={store}>
    //         <MemoryRouter initialEntries={[`/product/${product.id}`]}>
    //           <Product />
    //         </MemoryRouter>
    //       </Provider>
    //     );

    //     const addBtn = screen.getByRole('button', { name: /add to cart/i });

    //     userEvent.click(addBtn);

    //     expect(store.getActions()).toEqual([addProduct(product)]);
    //   });

    //   it('displays related products', async () => {
    //     const useRelatedProductsMock = jest.fn(() => ({ data: relatedProducts }));
    //     jest.mock('@algolia/recommend-react', () => ({ useRelatedProducts: useRelatedProductsMock }));
    //     render(
    //       <Provider store={store}>
    //         <MemoryRouter initialEntries={[`/product/${product.id}`]}>
    //           <Product />
    //         </MemoryRouter>
    //       </Provider>
    //     );

    // await screen.findByText(/related products/i);

    // expect(useRelatedProductsMock).toHaveBeenCalledWith({
    //   indexName: 'products',
    //   objectID: String(product.id),
    //   threshold: 10,
    // });

    //     relatedProducts.forEach((product) => {
    //       expect(screen.getByText(product.name)).toBeInTheDocument();
    //       expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    //       expect(screen.getByRole('img', { name: product.name })).toHaveAttribute('src', product.imageUrl);
    //     });
    //   });
});

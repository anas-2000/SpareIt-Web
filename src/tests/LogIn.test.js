import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import React from 'react';
import { render, fireEvent, waitFor, screen, getByRole } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import LogIn from '../Pages/LogIn';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';
import { TextField, Button } from '@mui/material';
import userEvent from '@testing-library/user-event';


import { EnzymeAdapter } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });


const mockStore = configureMockStore();

describe('LogIn component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      user: {
        isFetching: false,
        error: null,
      },
    });

    component = render(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );
  });

  it('renders the login form', () => {
    const { getByLabelText, getByText } = component;

    

    const wrapper= mount (<Provider store={store}>
        <LogIn />
    </Provider>);
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
  });

  it('submits the form with data', async () => {
    const wrapper= mount (<Provider store={store}>
        <LogIn />
    </Provider>);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test@test.com' },
    });
    const passwordField = wrapper.find(TextField).filter({ type: 'password' });
    userEvent.type(passwordField.getDOMNode(), 'password123');
    const form = wrapper.find('form');
    form.simulate('submit');

    await waitFor(() => {
      expect(store.getActions()).toEqual([
        // { type: 'USER_LOGIN_START' },
        {
            type: 'user/loginStart'
        },
        {
            type: 'user/loginFailure'
        },
      ]);
    });
  });

//   it('displays an error message with invalid data', async () => {
//     const { getByLabelText, getByText } = component;

//     fireEvent.change(getByLabelText('Email Address'), {
//       target: { value: 'test@test.com' },
//     });
//     fireEvent.change(getByLabelText('Password'), {
//       target: { value: 'wrongpassword' },
//     });

//     fireEvent.click(getByText('Sign In'));

//     await waitFor(() => {
//       expect(store.getActions()).toEqual([
//         { type: 'USER_LOGIN_START' },
//         { type: 'USER_LOGIN_FAILURE', payload: 'Invalid username or password' },
//       ]);
//       expect(getByText('Invalid username or password')).toBeInTheDocument();
//     });
//   });
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn()
}))

jest.mock('../hooks/useApi', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('./NavBar', () => () => {
    return <div></div>
});

import React from 'react';
import SendResetPassword from './SendResetPassword';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import useApi from "../hooks/useApi";


describe('SendResetPassword', () => {
    let mockPost: jest.Mock;
    beforeEach(() => {
        mockPost = jest.fn();
        (useApi as any).mockReturnValue({
            post: mockPost
        })
        render(<SendResetPassword />);
    })

    it('test should pass', async () => {
        const email = 'email@gmail.com';

        await fireEvent.input(screen.getByRole("input", { name: 'email' }), {
            target: {
              value: email
            }
        });

        expect((screen.getByRole("input", { name:'email' }) as any).value).toBe(email);

        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(mockPost).toBeCalledWith('auth/sendResetPassword', {
                email
            })
        })
    })

    it('test should not pass', async () => {
        const email = 'email';

        await fireEvent.input(screen.getByRole("input", { name: 'email' }), {
            target: {
              value: email
            }
        });

        expect((screen.getByRole("input", { name:'email' }) as any).value).toBe(email);

        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(mockPost).not.toBeCalledWith('auth/sendResetPassword', {
                email
            })
        })
    })
})
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
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
import ResetPassword from './ResetPassword';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useHistory, useParams } from 'react-router-dom';
import useApi from "../hooks/useApi";


describe('ResetPassword', () => {
    let token: string;
    let userId: String;
    let mockPost: jest.Mock;
    beforeEach(() => {
        token = 'token';
        userId = 'userId';
        mockPost = jest.fn();
        (useParams as any).mockReturnValue({token, userId});
        (useApi as any).mockReturnValue({
            post: mockPost
        })
        render(<ResetPassword />);
    })

    it('test should pass', async () => {
        const password = 'password';
        const confirmPassword = 'password';

        await fireEvent.input(screen.getByRole("input", { name: 'password' }), {
            target: {
              value: password
            }
        });

        await fireEvent.input(screen.getByRole("input", { name: 'confirmPassword' }), {
            target: {
              value: confirmPassword
            }
        });

        expect((screen.getByRole("input", { name:'password' }) as any).value).toBe(password);
        expect((screen.getByRole("input", { name: 'confirmPassword'}) as any).value).toBe(confirmPassword);

        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(mockPost).toBeCalledWith('auth/resetPassword', {
                password,
                token,
                userId
            })
        })
    })

    it('test should not pass', async () => {
        const password = 'password';
        const confirmPassword = 'kjanfa';

        await fireEvent.input(screen.getByRole("input", { name: 'password' }), {
            target: {
              value: password
            }
        });

        await fireEvent.input(screen.getByRole("input", { name: 'confirmPassword' }), {
            target: {
              value: confirmPassword
            }
        });

        expect((screen.getByRole("input", { name:'password' }) as any).value).toBe(password);
        expect((screen.getByRole("input", { name: 'confirmPassword'}) as any).value).toBe(confirmPassword);

        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(mockPost).not.toBeCalledWith('auth/resetPassword', {
                password,
                token,
                userId
            })
        })
    })
})
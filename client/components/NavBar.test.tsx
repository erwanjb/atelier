import React from 'react';
import NavBar from './NavBar';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useUserConnected } from '../hooks/useToken';

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockPush
    })
}))

jest.mock('../hooks/useToken', () => ({
    useUserConnected: jest.fn()
}));

const mockLogout = jest.fn();

jest.mock('../hooks/useAuth', () => () => {
    return {
        logout: mockLogout
    }
});

describe('NavBar', () => {

    beforeEach(() => {
        render(<NavBar />);
    })

    it('btn to connect should exist and click push to connexion page', async () => {
        (useUserConnected as any).mockReturnValue(false);
        fireEvent.click(screen.getByRole('btnMenu'), { currentTarget: screen.getByRole('btnMenu') });
        expect(screen.getByRole('btnCo')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('btnCo'));
        await waitFor (() => {
            expect(mockPush).toBeCalledWith('/connexion');
        });
    })

    it('btn to deco should exist', async () => {
        (useUserConnected as any).mockReturnValue(true);
        fireEvent.click(screen.getByRole('btnMenu'), { currentTarget: screen.getByRole('btnMenu') });
        expect(screen.getByRole('btnDeco')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('btnDeco'));
        await waitFor (() => {
            expect(mockLogout).toBeCalled();
        });
    })

    it('should go to home', async () => {
        fireEvent.click(screen.getByRole('btnHome'));
        await waitFor (() => {
            expect(mockPush).toBeCalledWith('/');
        });
    })

    it('should go to vote', async () => {
        fireEvent.click(screen.getByRole('btnVote'));
        await waitFor (() => {
            expect(mockPush).toBeCalledWith('/vote');
        })
    })
})
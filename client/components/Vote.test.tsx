jest.mock('../hooks/useToken', () => ({
    useUserConnected: jest.fn()
}));

jest.mock('./NavBar', () => () => {
    return <div></div>
});

jest.mock('../hooks/useApi', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: (state) => [state, jest.fn],
    useEffect: jest.fn()
}));

jest.mock('@material-ui/core', () => ({
    ...jest.requireActual('@material-ui/core'),
    useState: (state) => [state, jest.fn]
}));

import React from 'react';
import Vote from './Vote';
import useApi from '../hooks/useApi';
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { useUserConnected } from '../hooks/useToken';

describe('Vote', () => {
    const cats = [
        {
            id: 'haha',
            url: 'http://haha.fr'
        },
        {
            id: 'hihi',
            url: 'http://hihi.fr'
        }
    ];
    
    beforeEach(() => {
        (useApi as any).mockReturnValue({
            get: jest.fn().mockReturnValue({data: cats}),
            post: jest.fn().mockReturnValue({data: {
                status: 'OK'
            }})
        });
    });

    describe('test should not pass', () => {

        beforeEach(() => {
            (useUserConnected as any).mockReturnValue(false);
            render(<Vote />);
        });

        it('test', async () => {
            fireEvent.click(screen.getByRole('cat2'), { target: screen.getByRole('cat2')});
            await waitFor(() => {
                expect(useApi().post).not.toBeCalled();
            })
        })
    })

    describe('test should pass', () => {

        beforeEach(() => {
            (useUserConnected as any).mockReturnValue( true);
            render(<Vote />);
        });

        it('test', async () => {
            fireEvent.click(screen.getByRole('cat1'), { target: screen.getByRole('cat1')});
            await waitFor(() => {
                expect(useApi().post).toBeCalled();
            })
        })
    })
})
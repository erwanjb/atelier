import React from 'react';
import Home from './Home';
import { render, screen } from "@testing-library/react";

jest.mock('./NavBar', () => () => {
    return <div></div>
});


jest.mock('../hooks/useApi', () => () => ({
    get: () => ({
        data: []
    })
}));

const cats = [
    {
        id: 'haha',
        url: 'http://haha.fr',
        likes: [1, 2]
    },
    {
        id: 'hihi',
        url: 'http://hihi.fr',
        likes: []
    }
]

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: () => [cats, jest.fn()]
}));

describe('Home', () => {
    beforeEach(() => {
        render(<Home />)
    })
    it('test cats array', () => {
        expect(screen.getAllByRole('cat').length).toBe(cats.length);
    })
})
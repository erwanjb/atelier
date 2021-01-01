import React from "react";
import Connexion from "./Connexion";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";

const mockSetState = jest.fn()  as Function;

const mockLogin = jest.fn();

jest.mock('../hooks/useAuth', () => () => ({
    login: mockLogin
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: (state) => [state, mockSetState]
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: jest.fn()
    }),
}));

jest.mock('./NavBar', () => () => {
    return <div></div>
});

describe("Connexion", () => {
    beforeEach(() => {
        render(<Connexion />)
    })

    it("includes two textfields", async() => {
        expect(await screen.findAllByRole("input")).toHaveLength(2);
    });

    it("not submited", async () => {
        const email = 'toto';
        const password = 'password';

        await fireEvent.input(screen.getByRole("input", { name: 'email' }), {
            target: {
              value: email
            }
        });

        await fireEvent.input(screen.getByRole("input", { name: 'password' }), {
            target: {
              value: password
            }
        });

        expect((screen.getByRole("input", { name:'email' }) as any).value).toBe(email);
        expect((screen.getByRole("input", { name: 'password'}) as any).value).toBe(password);

        fireEvent.submit(screen.getByRole("form"));
        await waitFor(() => {
            expect(mockLogin).not.toBeCalled();
        })
    });

    it("submit", async () => {
        const email = 'toto@gmail.com';
        const password = 'password';

        await fireEvent.input(screen.getByRole("input", { name: 'email' }), {
            target: {
              value: email
            }
        });

        await fireEvent.input(screen.getByRole("input", { name: 'password' }), {
            target: {
              value: password
            }
        });

        expect((screen.getByRole("input", { name:'email' }) as any).value).toBe(email);
        expect((screen.getByRole("input", { name: 'password'}) as any).value).toBe(password);

        fireEvent.submit(screen.getByRole("form"));
        await waitFor(() => {
            expect(mockLogin).toBeCalled();
        })
    });
});
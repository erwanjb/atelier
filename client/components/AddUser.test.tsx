import React from "react";
import AddUser from "./AddUser";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import useApi from '../hooks/useApi';

const mockSetState = jest.fn()  as Function;

const mockLogin = jest.fn();

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

jest.mock('../hooks/useApi', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe("AddUser", () => {
    beforeEach(() => {
        (useApi as any).mockReturnValue({
            post: jest.fn()
        });
        render(<AddUser />)
    })

    it("includes 4 textfields", async() => {
        expect(await screen.findAllByRole("input")).toHaveLength(4);
    });

    it("not posting", async () => {
        const email = 'toto@toto.fr';
        const password = 'password';
        const confirmPassword = 'kjsflsdl';
        const name = 'name'

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

        await fireEvent.input(screen.getByRole("input", { name: 'confirmPassword' }), {
            target: {
              value: confirmPassword
            }
        });

        await fireEvent.input(screen.getByRole("input", { name: 'name' }), {
            target: {
              value: name
            }
        });

        expect((screen.getByRole("input", { name:'email' }) as any).value).toBe(email);
        expect((screen.getByRole("input", { name: 'password'}) as any).value).toBe(password);
        expect((screen.getByRole("input", { name: 'confirmPassword'}) as any).value).toBe(confirmPassword);
        expect((screen.getByRole("input", { name: 'name'}) as any).value).toBe(name);

        fireEvent.submit(screen.getByRole("form"));
        await waitFor(() => {
            expect(useApi().post).not.toBeCalled();
        })
    });

    it("posting", async () => {
        const email = 'toto@gmail.fr';
        const password = 'password';
        const confirmPassword = 'password';
        const name = 'name'

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

        await fireEvent.input(screen.getByRole("input", { name: 'confirmPassword' }), {
            target: {
              value: confirmPassword
            }
        });

        await fireEvent.input(screen.getByRole("input", { name: 'name' }), {
            target: {
              value: name
            }
        });

        expect((screen.getByRole("input", { name:'email' }) as any).value).toBe(email);
        expect((screen.getByRole("input", { name: 'password'}) as any).value).toBe(password);
        expect((screen.getByRole("input", { name: 'confirmPassword'}) as any).value).toBe(confirmPassword);
        expect((screen.getByRole("input", { name: 'name'}) as any).value).toBe(name);

        fireEvent.submit(screen.getByRole("form"));
        await waitFor(() => {
            expect(useApi().post).toBeCalled();
        })
    });
});
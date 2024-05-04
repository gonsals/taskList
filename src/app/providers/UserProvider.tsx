import {
    createContext,
    useState,
    ReactNode,
    SetStateAction,
    Dispatch,
} from "react";

export type User = {
    id?: string;
    userName: string;
};

export interface UserContextInterface {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

const defaultState = {
    user: {
        userName: "",
    },
    setUser: () => {},
} as UserContextInterface;

export const UserContext = createContext(defaultState);

type UserProviderProps = {
    children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User>({
        userName: "",
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

export type User = {
    id?: string;
    userName: string;
};

export interface UserContextInterface {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

const defaultState: UserContextInterface = {
    user: {
        userName: "",
    },
    setUser: () => {},
};

export const UserContext = createContext<UserContextInterface>(defaultState);

type UserProviderProps = {
    children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User>({ userName: "" });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

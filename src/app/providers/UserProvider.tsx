import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";
import { UserType } from "../../common/UserType";

export interface UserContextInterface {
    user: UserType;
    setUser: Dispatch<SetStateAction<UserType>>;
}

const defaultState: UserContextInterface = {
    user: {
        email: "",
        password: "",
    },
    setUser: () => {},
};

export const UserContext = createContext<UserContextInterface>(defaultState);

type UserProviderProps = {
    children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<UserType>({
        email: "",
        password: "",
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

import { createContext, useContext, useReducer } from "react";
import Auth from "./auth";

const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

function authReducer(state, action) {
    switch(action.type) {
        case 'login': {
            const { token } = action.payload;
            Auth.login(token);

            return {
                ...state,
                user: Auth.getProfile().data,
            }
        }

        case 'logout': {
            Auth.logout();

            return {
                ...state,
                user: null,
            }
        }

        default: {
            return state;
        }
    }
}

const initialAuth = {
    loggedIn: () => Auth.loggedIn(),
    user: Auth.loggedIn() ? Auth.getProfile().data : {},
}

export function AuthProvider({ children }) {
    
    const [auth, dispatch] = useReducer(authReducer, initialAuth);

    return (
        <AuthContext.Provider value={auth}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthDispatch() {
    return useContext(AuthDispatchContext);
}
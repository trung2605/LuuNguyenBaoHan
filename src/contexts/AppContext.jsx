import { createContext, useContext, useReducer, useCallback, useMemo } from 'react';

const AppContext = createContext(null);

// ── Initial State ──────────────────────────────────────────
const initialState = {
    activeSection: 'home',
    isLoading: false,
    error: null,
    menuOpen: false,
};

// ── Action Types ───────────────────────────────────────────
const ActionTypes = {
    SET_ACTIVE_SECTION: 'SET_ACTIVE_SECTION',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    TOGGLE_MENU: 'TOGGLE_MENU',
    CLOSE_MENU: 'CLOSE_MENU',
};

// ── Reducer ────────────────────────────────────────────────
const appReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_ACTIVE_SECTION:
            return { ...state, activeSection: action.payload };
        case ActionTypes.SET_LOADING:
            return { ...state, isLoading: action.payload };
        case ActionTypes.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false };
        case ActionTypes.CLEAR_ERROR:
            return { ...state, error: null };
        case ActionTypes.TOGGLE_MENU:
            return { ...state, menuOpen: !state.menuOpen };
        case ActionTypes.CLOSE_MENU:
            return { ...state, menuOpen: false };
        default:
            return state;
    }
};

// ── Custom Hook ────────────────────────────────────────────
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppContextProvider');
    }
    return context;
};

// ── Provider Component ─────────────────────────────────────
export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const setActiveSection = useCallback((section) =>
        dispatch({ type: ActionTypes.SET_ACTIVE_SECTION, payload: section }), []);

    const setLoading = useCallback((loading) =>
        dispatch({ type: ActionTypes.SET_LOADING, payload: loading }), []);

    const setError = useCallback((error) =>
        dispatch({ type: ActionTypes.SET_ERROR, payload: error }), []);

    const clearError = useCallback(() =>
        dispatch({ type: ActionTypes.CLEAR_ERROR }), []);

    const toggleMenu = useCallback(() =>
        dispatch({ type: ActionTypes.TOGGLE_MENU }), []);

    const closeMenu = useCallback(() =>
        dispatch({ type: ActionTypes.CLOSE_MENU }), []);

    const value = useMemo(() => ({
        ...state,
        setActiveSection,
        setLoading,
        setError,
        clearError,
        toggleMenu,
        closeMenu,
    }), [state, setActiveSection, setLoading, setError, clearError, toggleMenu, closeMenu]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

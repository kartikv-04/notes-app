import { useCallback, useState } from 'react';
import { authApi } from '../lib/api';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../lib/constants';

function getStoredUser() {
  try {
    const rawUser = localStorage.getItem(USER_STORAGE_KEY);
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY) ?? '');
  const [user, setUser] = useState(() => getStoredUser());
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');

  const persistSession = useCallback((nextToken, nextUser) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
    setAuthError('');
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setToken('');
    setUser(null);
  }, []);

  const login = useCallback(async (credentials) => {
    setIsAuthenticating(true);
    setAuthError('');

    try {
      const response = await authApi.login(credentials);
      persistSession(response.token, response.user);
      return response;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  }, [persistSession]);

  const register = useCallback(async (credentials) => {
    setIsAuthenticating(true);
    setAuthError('');

    try {
      await authApi.register(credentials);
      const response = await authApi.login(credentials);
      persistSession(response.token, response.user);
      return response;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  }, [persistSession]);

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const clearAuthError = useCallback(() => {
    setAuthError('');
  }, []);

  return {
    token,
    user,
    authError,
    isAuthenticating,
    login,
    register,
    logout,
    clearAuthError,
  };
}

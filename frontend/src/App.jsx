import { useState } from 'react';
import AuthScreen from './components/AuthScreen';
import DashboardLayout from './components/DashboardLayout';
import { useAuth } from './hooks/useAuth';
import { useNotes } from './hooks/useNotes';

function App() {
  const [authMode, setAuthMode] = useState('login');
  const {
    token,
    user,
    authError,
    isAuthenticating,
    login,
    register,
    logout,
    clearAuthError,
  } = useAuth();
  const {
    notes,
    isLoading,
    notesError,
    createNote,
    updateNote,
    deleteNote,
    moveNote,
  } = useNotes(token, logout);

  if (!token) {
    return (
      <AuthScreen
        mode={authMode}
        onModeChange={setAuthMode}
        onLogin={login}
        onRegister={register}
        isLoading={isAuthenticating}
        error={authError}
        clearError={clearAuthError}
      />
    );
  }

  return (
    <DashboardLayout
      user={user}
      notes={notes}
      isLoading={isLoading}
      notesError={notesError}
      onLogout={logout}
      onCreateNote={createNote}
      onUpdateNote={updateNote}
      onDeleteNote={deleteNote}
      onMoveNote={moveNote}
    />
  );
}

export default App;

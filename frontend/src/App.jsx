import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/DashboardLayout';
import { useAuth } from './hooks/useAuth';
import { useNotes } from './hooks/useNotes';

function App() {
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

  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route 
          path="/" 
          element={token ? <Navigate to="/dashboard" replace /> : <LandingPage />} 
        />

        {/* Auth Pages */}
        <Route 
          path="/login" 
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login 
                onLogin={login} 
                isLoading={isAuthenticating} 
                error={authError} 
                clearError={clearAuthError} 
              />
            )
          } 
        />
        <Route 
          path="/register" 
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register 
                onRegister={register} 
                isLoading={isAuthenticating} 
                error={authError} 
                clearError={clearAuthError} 
              />
            )
          } 
        />

        {/* Protected Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            !token ? (
              <Navigate to="/login" replace />
            ) : (
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
            )
          } 
        />

        {/* Catch-all redirection */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('shopsmart_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('shopsmart_token') || null;
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'

  // Persist session
  useEffect(() => {
    if (user && token) {
      localStorage.setItem('shopsmart_user', JSON.stringify(user));
      localStorage.setItem('shopsmart_token', token);
    } else {
      localStorage.removeItem('shopsmart_user');
      localStorage.removeItem('shopsmart_token');
    }
  }, [user, token]);

  const login = async (email, password) => {
    // Simulated instant login (can also connect to backend when running)
    const mockUser = {
      id: 'usr-krupa-101',
      name: email.toLowerCase().includes('krupa') ? 'Krupa Rathod' : 'Krupa Rathod',
      email: email,
      role: email.includes('admin') ? 'admin' : 'customer',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      loyaltyPoints: 650,
      tier: 'VIP Gold',
    };
    const mockToken = 'mock-jwt-token-shopsmart-2026';

    setUser(mockUser);
    setToken(mockToken);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF758C', '#8B5CF6', '#10B981', '#F59E0B'],
      });
    } catch (e) {}

    return mockUser;
  };

  const register = async (name, email, password) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: name || 'Krupa Rathod',
      email: email,
      role: 'customer',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      loyaltyPoints: 100, // Welcome bonus points!
      tier: 'Bronze',
    };
    const mockToken = 'mock-jwt-token-shopsmart-2026';

    setUser(newUser);
    setToken(mockToken);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF758C', '#8B5CF6', '#38BDF8', '#FBBF24'],
      });
    } catch (e) {}

    return newUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('shopsmart_user');
    localStorage.removeItem('shopsmart_token');
  };

  const openSignIn = () => {
    setAuthMode('signin');
    setAuthModalOpen(true);
  };

  const openSignUp = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
        authModalOpen,
        authMode,
        setAuthMode,
        openSignIn,
        openSignUp,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

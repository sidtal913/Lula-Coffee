"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Role = "customer" | "admin";

type AuthState = {
  token: string | null;
  role: Role | null;
  isAuthenticated: boolean;
};

type AuthContextValue = AuthState & {
  signInDemo: (role?: Role) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_TOKEN_PREFIX = "lula.demo.";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  const signInDemo = useCallback((nextRole: Role = "customer") => {
    const demoToken = `${DEMO_TOKEN_PREFIX}${nextRole}.${Date.now()}`;
    setToken(demoToken);
    setRole(nextRole);
  }, []);

  const signOut = useCallback(() => {
    setToken(null);
    setRole(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      role,
      isAuthenticated: Boolean(token),
      signInDemo,
      signOut,
    }),
    [token, role, signInDemo, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

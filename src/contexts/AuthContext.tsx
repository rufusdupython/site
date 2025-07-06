import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, Profile, Business } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  businesses: Business[];
  currentBusiness: Business | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  createBusiness: (businessData: Partial<Business>) => Promise<Business | null>;
  updateBusiness: (businessId: string, updates: Partial<Business>) => Promise<void>;
  setCurrentBusiness: (business: Business | null) => void;
  refreshBusinesses: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
        loadBusinesses(session.user.id);
      }
      setLoading(false);
    });

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadProfile(session.user.id);
          await loadBusinesses(session.user.id);
        } else {
          setProfile(null);
          setBusinesses([]);
          setCurrentBusiness(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadBusinesses = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', userId)
        .eq('activo', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading businesses:', error);
        return;
      }

      setBusinesses(data || []);
      
      // Si hay negocios y no hay uno seleccionado, seleccionar el primero
      if (data && data.length > 0 && !currentBusiness) {
        setCurrentBusiness(data[0]);
      }
    } catch (error) {
      console.error('Error loading businesses:', error);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setBusinesses([]);
    setCurrentBusiness(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const createBusiness = async (businessData: Partial<Business>): Promise<Business | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('businesses')
        .insert([{
          ...businessData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      setBusinesses(prev => [data, ...prev]);
      setCurrentBusiness(data);
      
      return data;
    } catch (error) {
      console.error('Error creating business:', error);
      throw error;
    }
  };

  const updateBusiness = async (businessId: string, updates: Partial<Business>) => {
    try {
      const { error } = await supabase
        .from('businesses')
        .update(updates)
        .eq('id', businessId);

      if (error) throw error;

      setBusinesses(prev => 
        prev.map(business => 
          business.id === businessId 
            ? { ...business, ...updates }
            : business
        )
      );

      if (currentBusiness?.id === businessId) {
        setCurrentBusiness(prev => prev ? { ...prev, ...updates } : null);
      }
    } catch (error) {
      console.error('Error updating business:', error);
      throw error;
    }
  };

  const refreshBusinesses = async () => {
    if (user) {
      await loadBusinesses(user.id);
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    businesses,
    currentBusiness,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    createBusiness,
    updateBusiness,
    setCurrentBusiness,
    refreshBusinesses
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
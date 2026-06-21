import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import api from '@/utils/api'

interface User {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  auth_provider: string
  created_at: string
  subscription_plan: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, fullName: string) => Promise<void>
  googleLogin: (credential: string) => Promise<void>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const handleAuthResponse = (data: { access_token: string; user: User }) => {
    setToken(data.access_token)
    setUser(data.user)
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/api/auth/login', { email, password })
    handleAuthResponse(data)
  }

  const signup = async (email: string, password: string, fullName: string) => {
    const { data } = await api.post('/api/auth/signup', {
      email,
      password,
      full_name: fullName,
    })
    handleAuthResponse(data)
  }

  const googleLogin = async (credential: string) => {
    const { data } = await api.post('/api/auth/google', { credential })
    handleAuthResponse(data)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data }
      setUser(updated)
      localStorage.setItem('user', JSON.stringify(updated))
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, signup, googleLogin, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Menu, X, Video } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Video className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">ReelGen AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link to="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </Link>
            <Link to="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/#features"
              className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/#how-it-works"
              className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link
              to="/#pricing"
              className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

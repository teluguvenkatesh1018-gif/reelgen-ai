import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, FolderOpen, Settings, Video, Sparkles, TrendingUp } from 'lucide-react'

export default function DashboardHome() {
  const { user } = useAuth()

  const quickActions = [
    {
      to: '/dashboard/create',
      icon: Plus,
      title: 'Create Video',
      description: 'Start a new AI video project',
      color: 'bg-primary/10 text-primary',
    },
    {
      to: '/dashboard/videos',
      icon: FolderOpen,
      title: 'My Videos',
      description: 'View and manage your projects',
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      to: '/dashboard/settings',
      icon: Settings,
      title: 'Account Settings',
      description: 'Manage your profile and preferences',
      color: 'bg-orange-500/10 text-orange-500',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-xl bg-gradient-to-r from-primary/10 via-purple-500/5 to-blue-500/10 p-6 lg:p-8">
        <h2 className="text-2xl lg:text-3xl font-bold mb-2">
          Welcome back, {user?.full_name?.split(' ')[0]}!
        </h2>
        <p className="text-muted-foreground mb-4">
          Ready to create your next video? Get started with our AI-powered tools.
        </p>
        <Link to="/dashboard/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Video
          </Button>
        </Link>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link key={action.to} to={action.to}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <div
                    className={`inline-flex items-center justify-center h-12 w-12 rounded-lg ${action.color} mb-4`}
                  >
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold mb-1">{action.title}</h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Placeholder */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Total Videos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">Free</p>
                <p className="text-sm text-muted-foreground">Current Plan</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Credits Left</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

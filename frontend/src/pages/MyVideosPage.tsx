import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Video,
  Trash2,
  Eye,
  Calendar,
  Film,
  Loader2,
} from 'lucide-react'
import api from '@/utils/api'

interface Project {
  id: string
  project_name: string
  generation_mode: string
  language: string
  style: string
  duration: string
  status: string
  created_at: string
}

const modeLabels: Record<string, string> = {
  topic_to_video: 'Topic to Video',
  script_to_video: 'Script to Video',
  image_script_to_video: 'Image + Script',
  audio_image_to_video: 'Audio + Image',
}

const statusColors: Record<string, string> = {
  draft: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  processing: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  completed: 'bg-green-500/10 text-green-600 dark:text-green-400',
  failed: 'bg-red-500/10 text-red-600 dark:text-red-400',
}

export default function MyVideosPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      const { data } = await api.get('/api/projects/')
      setProjects(data)
    } catch {
      // handle silently
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    setDeleting(id)
    try {
      await api.delete(`/api/projects/${id}`)
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch {
      // handle silently
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">My Videos</h2>
          <p className="text-sm text-muted-foreground">{projects.length} project(s)</p>
        </div>
        <Link to="/dashboard/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Film className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first video project to get started.
            </p>
            <Link to="/dashboard/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Video
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
              {/* Thumbnail Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/20 flex items-center justify-center">
                <Video className="h-12 w-12 text-primary/40" />
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <h4 className="font-semibold truncate">{project.project_name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {modeLabels[project.generation_mode] || project.generation_mode}
                    </p>
                  </div>
                  <span
                    className={`flex-shrink-0 text-xs px-2 py-1 rounded-full font-medium ${
                      statusColors[project.status] || statusColors.draft
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="capitalize">{project.style}</span>
                  <span>&middot;</span>
                  <span>{project.duration}s</span>
                  <span>&middot;</span>
                  <span className="capitalize">{project.language}</span>
                </div>

                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(project.created_at).toLocaleDateString()}
                </div>

                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(project.id)}
                    disabled={deleting === project.id}
                  >
                    {deleting === project.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

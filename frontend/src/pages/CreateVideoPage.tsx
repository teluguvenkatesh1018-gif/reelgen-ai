import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wand2, Upload, Loader2 } from 'lucide-react'
import api from '@/utils/api'
import { cn } from '@/lib/utils'

const generationModes = [
  { value: 'topic_to_video', label: 'Topic to Video', description: 'Generate from a topic prompt' },
  { value: 'script_to_video', label: 'Script to Video', description: 'Convert your script to video' },
  {
    value: 'image_script_to_video',
    label: 'Image + Script to Video',
    description: 'Combine images with script',
  },
  {
    value: 'audio_image_to_video',
    label: 'Audio + Image to Video',
    description: 'Sync audio with images',
  },
]

const languages = [
  { value: 'english', label: 'English' },
  { value: 'telugu', label: 'Telugu' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'tamil', label: 'Tamil' },
]

const styles = [
  { value: 'realistic', label: 'Realistic' },
  { value: 'anime', label: 'Anime' },
  { value: 'cartoon', label: 'Cartoon' },
  { value: 'pixar', label: 'Pixar' },
  { value: 'cinematic', label: 'Cinematic' },
]

const durations = [
  { value: '15', label: '15 seconds' },
  { value: '30', label: '30 seconds' },
  { value: '60', label: '60 seconds' },
]

export default function CreateVideoPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    project_name: '',
    generation_mode: 'topic_to_video',
    script: '',
    language: 'english',
    style: 'realistic',
    duration: '15',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)

  const needsScript = ['topic_to_video', 'script_to_video', 'image_script_to_video'].includes(
    form.generation_mode
  )
  const needsImage = ['image_script_to_video', 'audio_image_to_video'].includes(
    form.generation_mode
  )
  const needsAudio = form.generation_mode === 'audio_image_to_video'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await api.post('/api/projects/', {
        project_name: form.project_name,
        generation_mode: form.generation_mode,
        script: form.script || null,
        image_url: imageFile ? `placeholder://${imageFile.name}` : null,
        audio_url: audioFile ? `placeholder://${audioFile.name}` : null,
        language: form.language,
        style: form.style,
        duration: form.duration,
      })
      navigate('/dashboard/videos')
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } }
      setError(error.response?.data?.detail || 'Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Create New Video
          </CardTitle>
          <CardDescription>
            Configure your video project settings. AI generation will be available soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Project Name */}
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                placeholder="My Awesome Video"
                value={form.project_name}
                onChange={(e) => setForm({ ...form, project_name: e.target.value })}
                required
              />
            </div>

            {/* Generation Mode */}
            <div className="space-y-2">
              <Label>Generation Mode</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {generationModes.map((mode) => (
                  <button
                    key={mode.value}
                    type="button"
                    onClick={() => setForm({ ...form, generation_mode: mode.value })}
                    className={cn(
                      'p-4 rounded-lg border text-left transition-all',
                      form.generation_mode === mode.value
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'hover:border-primary/50'
                    )}
                  >
                    <p className="font-medium text-sm">{mode.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{mode.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Script Input */}
            {needsScript && (
              <div className="space-y-2">
                <Label htmlFor="script">
                  {form.generation_mode === 'topic_to_video' ? 'Topic / Prompt' : 'Script'}
                </Label>
                <Textarea
                  id="script"
                  placeholder={
                    form.generation_mode === 'topic_to_video'
                      ? 'Describe the topic for your video...'
                      : 'Enter your video script here...'
                  }
                  value={form.script}
                  onChange={(e) => setForm({ ...form, script: e.target.value })}
                  rows={5}
                />
              </div>
            )}

            {/* Image Upload */}
            {needsImage && (
              <div className="space-y-2">
                <Label>Upload Image</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {imageFile ? imageFile.name : 'Click or drag to upload an image'}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="imageUpload"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('imageUpload')?.click()}>
                    Choose File
                  </Button>
                </div>
              </div>
            )}

            {/* Audio Upload */}
            {needsAudio && (
              <div className="space-y-2">
                <Label>Upload Audio</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {audioFile ? audioFile.name : 'Click or drag to upload audio'}
                  </p>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="audioUpload"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('audioUpload')?.click()}>
                    Choose File
                  </Button>
                </div>
              </div>
            )}

            {/* Settings Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  id="language"
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Style</Label>
                <Select
                  id="style"
                  value={form.style}
                  onChange={(e) => setForm({ ...form, style: e.target.value })}
                >
                  {styles.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select
                  id="duration"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                >
                  {durations.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving Project...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Save & Generate
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              AI video generation is coming soon. Projects will be saved as drafts.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

import { Link } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import { Button } from '@/components/ui/button'
import {
  Video,
  Sparkles,
  Wand2,
  Image,
  Mic,
  Globe,
  Palette,
  Clock,
  Zap,
  Users,
  Shield,
  ArrowRight,
  Check,
  Play,
} from 'lucide-react'

const features = [
  {
    icon: Wand2,
    title: 'Topic to Video',
    description: 'Enter any topic and get a professionally crafted video with AI-generated visuals.',
  },
  {
    icon: Sparkles,
    title: 'Script to Video',
    description: 'Write or paste your script and watch it transform into stunning video content.',
  },
  {
    icon: Image,
    title: 'Image + Script',
    description: 'Combine your images with scripts to create personalized video narratives.',
  },
  {
    icon: Mic,
    title: 'Audio + Image',
    description: 'Upload audio and images to generate videos with synchronized visuals.',
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    description: 'Create videos in English, Telugu, Hindi, Tamil and more languages coming soon.',
  },
  {
    icon: Palette,
    title: 'Multiple Styles',
    description: 'Choose from Realistic, Anime, Cartoon, Pixar, and Cinematic visual styles.',
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Choose Your Mode',
    description: 'Select from Topic, Script, Image+Script, or Audio+Image generation modes.',
  },
  {
    step: '02',
    title: 'Customize Settings',
    description: 'Pick your language, visual style, and video duration to match your vision.',
  },
  {
    step: '03',
    title: 'Generate & Download',
    description: 'Click generate and let AI create your professional video in minutes.',
  },
]

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Get started with basic video creation',
    features: ['3 videos per month', '15-second max duration', 'Basic styles', 'Watermarked output'],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For creators who need more power',
    features: [
      '50 videos per month',
      '60-second max duration',
      'All styles',
      'No watermark',
      'Priority rendering',
      'Voice cloning',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For teams and businesses',
    features: [
      'Unlimited videos',
      'Custom durations',
      'Custom styles',
      'API access',
      'Dedicated support',
      'Team collaboration',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 backdrop-blur px-4 py-1.5 text-sm mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI-Powered Video Generation Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              Create Stunning Videos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                with AI
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Transform your ideas into professional videos in minutes. From text prompts to
              complete productions — ReelGen AI handles it all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="text-base px-8 w-full sm:w-auto">
                  Start Creating Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-base px-8">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">10K+ Creators</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                <span className="text-sm">50K+ Videos Created</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Enterprise Ready</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 mx-auto max-w-5xl">
            <div className="rounded-xl border bg-card/50 backdrop-blur shadow-2xl p-1">
              <div className="rounded-lg bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/20 aspect-video flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/20 mb-4">
                    <Play className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-lg font-medium text-muted-foreground">
                    Platform Preview Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Create
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you create professional videos from any input.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to go from idea to finished video.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative text-center">
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 text-primary text-2xl font-bold mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Preview */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Built for the Future of Video Creation
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform is architected to support the most advanced AI video generation
                capabilities as they become available.
              </p>
              <div className="space-y-4">
                {[
                  'Character consistency across scenes',
                  'Voice cloning & narration',
                  'Auto-generated captions & subtitles',
                  'Smart hashtag generation',
                  'AI thumbnail creation',
                  'Scene-by-scene planning',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border bg-card p-8">
              <div className="space-y-4">
                {[
                  { icon: Wand2, label: 'Script Generation', status: 'Coming Soon' },
                  { icon: Users, label: 'Character Engine', status: 'Coming Soon' },
                  { icon: Mic, label: 'Voice Cloning', status: 'Coming Soon' },
                  { icon: Video, label: 'Video Rendering', status: 'Coming Soon' },
                  { icon: Clock, label: 'Caption Generator', status: 'Coming Soon' },
                  { icon: Zap, label: 'Hashtag Generator', status: 'Coming Soon' },
                ].map((module) => (
                  <div
                    key={module.label}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <module.icon className="h-5 w-5 text-primary" />
                      <span className="font-medium">{module.label}</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {module.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-8 ${
                  plan.popular
                    ? 'border-primary shadow-lg shadow-primary/20 relative'
                    : 'bg-card'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <Link to="/signup">
                  <Button
                    className="w-full mb-6"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-purple-500/5 to-primary/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Create Amazing Videos?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of creators already using ReelGen AI to produce stunning content.
          </p>
          <Link to="/signup">
            <Button size="lg" className="text-base px-8">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Video className="h-7 w-7 text-primary" />
                <span className="text-lg font-bold">ReelGen AI</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                AI-powered video generation platform for creators and businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Roadmap</a></li>
                <li><a href="#" className="hover:text-foreground">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ReelGen AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

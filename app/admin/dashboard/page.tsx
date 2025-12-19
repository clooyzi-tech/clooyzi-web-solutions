"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Edit, Trash2, ExternalLink, LogOut, Eye, Upload, Link as LinkIcon, Image as ImageIcon, MessageSquareQuote, Megaphone } from 'lucide-react'
import { Work, Testimonial } from '@/lib/supabase'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'works' | 'testimonials' | 'advertisements' | 'analytics'>('works')
  const [works, setWorks] = useState<Work[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [advertisements, setAdvertisements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingWork, setEditingWork] = useState<Work | null>(null)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [editingAdvertisement, setEditingAdvertisement] = useState<any | null>(null)
  const [imageMethod, setImageMethod] = useState<'url' | 'upload'>('url')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    project_link: ''
  })
  const [testimonialFormData, setTestimonialFormData] = useState({
    quote: '',
    author: '',
    company: '',
    image: ''
  })
  const [advertisementFormData, setAdvertisementFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    link_url: '',
    category: 'tech',
    is_active: true
  })

  useEffect(() => {
    // Verify token exists and is valid
    const verifyAuth = async () => {
      const token = sessionStorage.getItem('adminToken')
      if (!token) {
        window.location.href = '/admin/login'
        return
      }
      
      // Verify token with API
      try {
        const response = await fetch('/api/admin/works')
        if (response.status === 401) {
          sessionStorage.removeItem('adminToken')
          window.location.href = '/admin/login'
          return
        }
      } catch (error) {
        console.error('Auth verification failed:', error)
      }
      
      fetchWorks()
      fetchTestimonials()
      fetchAdvertisements()
    }
    
    verifyAuth()
  }, [])

  const fetchWorks = async () => {
    try {
      const response = await fetch('/api/admin/works')
      if (response.ok) {
        const data = await response.json()
        setWorks(data)
      }
    } catch (error) {
      console.error('Error fetching works:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials')
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    }
  }

  const fetchAdvertisements = async () => {
    try {
      const response = await fetch('/api/admin/advertisements')
      if (response.ok) {
        const data = await response.json()
        setAdvertisements(data)
      }
    } catch (error) {
      console.error('Error fetching advertisements:', error)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setFormData({ ...formData, image_url: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editingWork ? `/api/admin/works/${editingWork.id}` : '/api/admin/works'
    const method = editingWork ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        fetchWorks()
        setIsAddDialogOpen(false)
        setEditingWork(null)
        setFormData({ title: '', description: '', image_url: '', project_link: '' })
        setImagePreview('')
        setImageFile(null)
      }
    } catch (error) {
      console.error('Error saving work:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this work?')) return

    try {
      const response = await fetch(`/api/admin/works/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchWorks()
      }
    } catch (error) {
      console.error('Error deleting work:', error)
    }
  }

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editingTestimonial ? `/api/admin/testimonials/${editingTestimonial.id}` : '/api/admin/testimonials'
    const method = editingTestimonial ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialFormData)
      })

      if (response.ok) {
        fetchTestimonials()
        setIsAddDialogOpen(false)
        setEditingTestimonial(null)
        setTestimonialFormData({ quote: '', author: '', company: '', image: '' })
        setImagePreview('')
      }
    } catch (error) {
      console.error('Error saving testimonial:', error)
    }
  }

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchTestimonials()
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error)
    }
  }

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setTestimonialFormData({
      quote: testimonial.quote,
      author: testimonial.author,
      company: testimonial.company,
      image: testimonial.image
    })
    setImagePreview(testimonial.image)
    setIsAddDialogOpen(true)
  }

  const handleEdit = (work: Work) => {
    setEditingWork(work)
    setFormData({
      title: work.title,
      description: work.description,
      image_url: work.image_url,
      project_link: work.project_link
    })
    setImagePreview(work.image_url)
    setIsAddDialogOpen(true)
  }

  const handleAdvertisementSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editingAdvertisement ? `/api/admin/advertisements/${editingAdvertisement.id}` : '/api/admin/advertisements'
    const method = editingAdvertisement ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(advertisementFormData)
      })

      if (response.ok) {
        fetchAdvertisements()
        setIsAddDialogOpen(false)
        setEditingAdvertisement(null)
        setAdvertisementFormData({ title: '', description: '', image_url: '', link_url: '', category: 'tech', is_active: true })
        setImagePreview('')
      }
    } catch (error) {
      console.error('Error saving advertisement:', error)
    }
  }

  const handleDeleteAdvertisement = async (id: number) => {
    if (!confirm('Are you sure you want to delete this advertisement?')) return

    try {
      const response = await fetch(`/api/admin/advertisements/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchAdvertisements()
      }
    } catch (error) {
      console.error('Error deleting advertisement:', error)
    }
  }

  const handleEditAdvertisement = (advertisement: any) => {
    setEditingAdvertisement(advertisement)
    setAdvertisementFormData({
      title: advertisement.title,
      description: advertisement.description,
      image_url: advertisement.image_url,
      link_url: advertisement.link_url,
      category: advertisement.category || 'tech',
      is_active: advertisement.is_active
    })
    setImagePreview(advertisement.image_url)
    setIsAddDialogOpen(true)
  }

  const toggleAdvertisementStatus = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/advertisements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentStatus })
      })

      if (response.ok) {
        fetchAdvertisements()
      }
    } catch (error) {
      console.error('Error toggling advertisement status:', error)
    }
  }

  const handleLogout = async () => {
    // Clear token from sessionStorage
    sessionStorage.removeItem('adminToken')
    
    // Call logout API to clear HTTP-only cookie
    await fetch('/api/admin/logout', { method: 'POST' })
    
    window.location.href = '/admin/login'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
        <div className="text-white text-lg">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-purple-100 text-sm mt-1">Manage your portfolio works</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => window.open('/', '_blank')}
                variant="outline"
                size="sm"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">View Site</span>
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'works' | 'testimonials' | 'advertisements')} className="mb-8">
          <TabsList className="bg-[#2a2a3e] border border-gray-700">
            <TabsTrigger value="works" className="data-[state=active]:bg-purple-600">
              <ImageIcon className="w-4 h-4 mr-2" />
              Works
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-purple-600">
              <MessageSquareQuote className="w-4 h-4 mr-2" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="advertisements" className="data-[state=active]:bg-purple-600">
              <Megaphone className="w-4 h-4 mr-2" />
              Advertisements
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Works Tab */}
          <TabsContent value="works">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Portfolio Works</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingWork(null)
                  setFormData({ title: '', description: '', image_url: '', project_link: '' })
                  setImagePreview('')
                  setImageFile(null)
                  setImageMethod('url')
                }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Work
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1e1e2e] border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{editingWork ? 'Edit Work' : 'Add New Work'}</DialogTitle>
                <CardDescription className="text-gray-400">Fill in the details below</CardDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div>
                  <Label htmlFor="title" className="text-gray-200">Project Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-2 bg-[#2a2a3e] border-gray-600 text-white focus:border-purple-500"
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-200">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-2 bg-[#2a2a3e] border-gray-600 text-white focus:border-purple-500 min-h-[100px]"
                    placeholder="Describe your project"
                    required
                  />
                </div>

                <div>
                  <Label className="text-gray-200 mb-3 block">Project Image</Label>
                  <Tabs value={imageMethod} onValueChange={(v) => setImageMethod(v as 'url' | 'upload')} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-[#2a2a3e]">
                      <TabsTrigger value="url" className="data-[state=active]:bg-purple-600">
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Image URL
                      </TabsTrigger>
                      <TabsTrigger value="upload" className="data-[state=active]:bg-purple-600">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="url" className="mt-4">
                      <Input
                        value={formData.image_url}
                        onChange={(e) => {
                          setFormData({ ...formData, image_url: e.target.value })
                          setImagePreview(e.target.value)
                        }}
                        className="bg-[#2a2a3e] border-gray-600 text-white focus:border-purple-500"
                        placeholder="https://example.com/image.jpg"
                        required={imageMethod === 'url'}
                      />
                    </TabsContent>
                    <TabsContent value="upload" className="mt-4">
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-300">Click to upload image</p>
                          <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 10MB</p>
                        </label>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  {imagePreview && (
                    <div className="mt-4">
                      <Label className="text-gray-200 mb-2 block">Preview</Label>
                      <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-gray-600" />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="project_link" className="text-gray-200">Live Demo URL</Label>
                  <Input
                    id="project_link"
                    value={formData.project_link}
                    onChange={(e) => setFormData({ ...formData, project_link: e.target.value })}
                    className="mt-2 bg-[#2a2a3e] border-gray-600 text-white focus:border-purple-500"
                    placeholder="https://example.com"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-lg"
                >
                  {editingWork ? 'Update Work' : 'Add Work'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Works Grid */}
        {works.length === 0 ? (
          <Card className="bg-[#1e1e2e] border-gray-700 text-center py-16">
            <CardContent>
              <ImageIcon className="w-16 h-16 mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400 text-lg">No works added yet</p>
              <p className="text-gray-500 text-sm mt-2">Click "Add Work" to get started</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((work) => (
              <Card key={work.id} className="bg-[#1e1e2e] border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden group">
                <CardHeader className="p-0 relative">
                  <img
                    src={work.image_url}
                    alt={work.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardHeader>
                <CardContent className="p-5">
                  <CardTitle className="text-white mb-2 text-lg">{work.title}</CardTitle>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{work.description}</p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(work)}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(work.id)}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                    <Button
                      onClick={() => window.open(work.project_link, '_blank')}
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Testimonials</h2>
          <Dialog open={isAddDialogOpen && activeTab === 'testimonials'} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingTestimonial(null)
                  setTestimonialFormData({ quote: '', author: '', company: '', image: '' })
                  setImagePreview('')
                  setImageMethod('url')
                }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1e1e2e] border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleTestimonialSubmit} className="space-y-6 mt-4">
                <div>
                  <Label htmlFor="author" className="text-gray-200">Author Name</Label>
                  <Input
                    id="author"
                    value={testimonialFormData.author}
                    onChange={(e) => setTestimonialFormData({ ...testimonialFormData, author: e.target.value })}
                    className="mt-2 bg-[#2a2a3e] border-gray-600 text-white focus:border-purple-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="text-gray-200">Company</Label>
                  <Input
                    id="company"
                    value={testimonialFormData.company}
                    onChange={(e) => setTestimonialFormData({ ...testimonialFormData, company: e.target.value })}
                    className="mt-2 bg-[#2a2a3e] border-gray-600 text-white focus:border-purple-500"
                    placeholder="Company Name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="quote" className="text-gray-200">Testimonial Quote</Label>
                  <Textarea
                    id="quote"
                    value={testimonialFormData.quote}
                    onChange={(e) => setTestimonialFormData({ ...testimonialFormData, quote: e.target.value })}
                    className="mt-2 bg-[#2a2a3e] border-gray-600 text-white focus:border-purple-500 min-h-[120px]"
                    placeholder="Write the testimonial..."
                    required
                  />
                </div>

                <div>
                  <Label className="text-gray-200 mb-3 block">Author Image</Label>
                  <Tabs value={imageMethod} onValueChange={(v) => setImageMethod(v as 'url' | 'upload')} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-[#2a2a3e]">
                      <TabsTrigger value="url" className="data-[state=active]:bg-purple-600">
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Image URL
                      </TabsTrigger>
                      <TabsTrigger value="upload" className="data-[state=active]:bg-purple-600">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="url" className="mt-4">
                      <Input
                        value={testimonialFormData.image}
                        onChange={(e) => {
                          setTestimonialFormData({ ...testimonialFormData, image: e.target.value })
                          setImagePreview(e.target.value)
                        }}
                        className="bg-[#2a2a3e] border-gray-600 text-white focus:border-purple-500"
                        placeholder="https://example.com/image.jpg"
                        required={imageMethod === 'url'}
                      />
                    </TabsContent>
                    <TabsContent value="upload" className="mt-4">
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onloadend = () => {
                                setImagePreview(reader.result as string)
                                setTestimonialFormData({ ...testimonialFormData, image: reader.result as string })
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                          className="hidden"
                          id="testimonial-image-upload"
                        />
                        <label htmlFor="testimonial-image-upload" className="cursor-pointer">
                          <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-300">Click to upload image</p>
                          <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 10MB</p>
                        </label>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  {imagePreview && (
                    <div className="mt-4">
                      <Label className="text-gray-200 mb-2 block">Preview</Label>
                      <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-full border border-gray-600 mx-auto" />
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-lg"
                >
                  {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {testimonials.length === 0 ? (
          <Card className="bg-[#1e1e2e] border-gray-700 text-center py-16">
            <CardContent>
              <MessageSquareQuote className="w-16 h-16 mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400 text-lg">No testimonials added yet</p>
              <p className="text-gray-500 text-sm mt-2">Click "Add Testimonial" to get started</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-[#1e1e2e] border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden group">
                <CardHeader className="p-5 text-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-purple-500"
                  />
                  <CardTitle className="text-white text-lg">{testimonial.author}</CardTitle>
                  <p className="text-gray-400 text-sm">{testimonial.company}</p>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="text-gray-300 text-sm line-clamp-3">{testimonial.quote}</p>
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => handleEditTestimonial(testimonial)}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
          </TabsContent>

          {/* Advertisements Tab */}
          <TabsContent value="advertisements">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-white">Advertisements</h2>
              <Dialog open={isAddDialogOpen && activeTab === 'advertisements'} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setEditingAdvertisement(null)
                      setAdvertisementFormData({ title: '', description: '', image_url: '', link_url: '', category: 'tech', is_active: true })
                      setImagePreview('')
                      setImageMethod('url')
                    }}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Advertisement
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1e1e2e] border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{editingAdvertisement ? 'Edit Advertisement' : 'Add New Advertisement'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAdvertisementSubmit} className="space-y-6 mt-4">
                    <div>
                      <Label htmlFor="ad-title" className="text-gray-200">Advertisement Title</Label>
                      <Input
                        id="ad-title"
                        value={advertisementFormData.title}
                        onChange={(e) => setAdvertisementFormData({ ...advertisementFormData, title: e.target.value })}
                        className="mt-2 bg-[#2a2a3e] border-gray-600 text-white focus:border-purple-500"
                        placeholder="Enter advertisement title"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="ad-description" className="text-gray-200">Description</Label>
                      <Textarea
                        id="ad-description"
                        value={advertisementFormData.description}
                        onChange={(e) => setAdvertisementFormData({ ...advertisementFormData, description: e.target.value })}
                        className="mt-2 bg-[#2a2a3e] border-gray-600 text-white focus:border-purple-500 min-h-[100px]"
                        placeholder="Describe your advertisement"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-gray-200 mb-3 block">Advertisement Image</Label>
                      <Tabs value={imageMethod} onValueChange={(v) => setImageMethod(v as 'url' | 'upload')} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-[#2a2a3e]">
                          <TabsTrigger value="url" className="data-[state=active]:bg-purple-600">
                            <LinkIcon className="w-4 h-4 mr-2" />
                            Image URL
                          </TabsTrigger>
                          <TabsTrigger value="upload" className="data-[state=active]:bg-purple-600">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Image
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="url" className="mt-4">
                          <Input
                            value={advertisementFormData.image_url}
                            onChange={(e) => {
                              setAdvertisementFormData({ ...advertisementFormData, image_url: e.target.value })
                              setImagePreview(e.target.value)
                            }}
                            className="bg-[#2a2a3e] border-gray-600 text-white focus:border-purple-500"
                            placeholder="https://example.com/ad-image.jpg"
                            required={imageMethod === 'url'}
                          />
                        </TabsContent>
                        <TabsContent value="upload" className="mt-4">
                          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const reader = new FileReader()
                                  reader.onloadend = () => {
                                    setImagePreview(reader.result as string)
                                    setAdvertisementFormData({ ...advertisementFormData, image_url: reader.result as string })
                                  }
                                  reader.readAsDataURL(file)
                                }
                              }}
                              className="hidden"
                              id="ad-image-upload"
                            />
                            <label htmlFor="ad-image-upload" className="cursor-pointer">
                              <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                              <p className="text-gray-300">Click to upload image</p>
                              <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 10MB</p>
                            </label>
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      {imagePreview && (
                        <div className="mt-4">
                          <Label className="text-gray-200 mb-2 block">Preview</Label>
                          <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-gray-600" />
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="ad-link" className="text-gray-200">Link URL</Label>
                      <Input
                        id="ad-link"
                        value={advertisementFormData.link_url}
                        onChange={(e) => setAdvertisementFormData({ ...advertisementFormData, link_url: e.target.value })}
                        className="mt-2 bg-[#2a2a3e] border-gray-600 text-white focus:border-purple-500"
                        placeholder="https://example.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="ad-category" className="text-gray-200">Category</Label>
                      <select
                        id="ad-category"
                        value={advertisementFormData.category}
                        onChange={(e) => setAdvertisementFormData({ ...advertisementFormData, category: e.target.value })}
                        className="mt-2 w-full bg-[#2a2a3e] border border-gray-600 text-white focus:border-purple-500 rounded-md px-3 py-2"
                        required
                      >
                        <option value="tech">Technology</option>
                        <option value="fashion">Fashion</option>
                        <option value="education">Education</option>
                        <option value="business">Business</option>
                        <option value="health">Health</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="is-active"
                        checked={advertisementFormData.is_active}
                        onChange={(e) => setAdvertisementFormData({ ...advertisementFormData, is_active: e.target.checked })}
                        className="w-4 h-4 text-purple-600 bg-[#2a2a3e] border-gray-600 rounded focus:ring-purple-500"
                      />
                      <Label htmlFor="is-active" className="text-gray-200">Active Advertisement</Label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-lg"
                    >
                      {editingAdvertisement ? 'Update Advertisement' : 'Add Advertisement'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {advertisements.length === 0 ? (
              <Card className="bg-[#1e1e2e] border-gray-700 text-center py-16">
                <CardContent>
                  <Megaphone className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                  <p className="text-gray-400 text-lg">No advertisements added yet</p>
                  <p className="text-gray-500 text-sm mt-2">Click "Add Advertisement" to get started</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {advertisements.map((ad) => (
                  <Card key={ad.id} className={`bg-[#1e1e2e] border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden group ${!ad.is_active ? 'opacity-60' : ''}`}>
                    <CardHeader className="p-0 relative">
                      <img
                        src={ad.image_url}
                        alt={ad.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ad.is_active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                          {ad.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardHeader>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-white text-lg">{ad.title}</CardTitle>
                        <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full capitalize">
                          {ad.category}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{ad.description}</p>
                      <div className="flex gap-2 mb-2">
                        <Button
                          onClick={() => handleEditAdvertisement(ad)}
                          size="sm"
                          variant="outline"
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteAdvertisement(ad.id)}
                          size="sm"
                          variant="outline"
                          className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => toggleAdvertisementStatus(ad.id, ad.is_active)}
                          size="sm"
                          variant="outline"
                          className={`flex-1 ${ad.is_active ? 'border-yellow-600 text-yellow-400 hover:bg-yellow-600' : 'border-green-600 text-green-400 hover:bg-green-600'} hover:text-white`}
                        >
                          {ad.is_active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          onClick={() => window.open(ad.link_url, '_blank')}
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AnalyticsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function AnalyticsSection() {
  const [analytics, setAnalytics] = useState({
    overview: null,
    publisherStats: {},
    categoryStats: {}
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const [overview, publishers, categories] = await Promise.all([
        fetch('/api/admin/analytics?type=overview').then(r => r.json()),
        fetch('/api/admin/analytics?type=publishers').then(r => r.json()),
        fetch('/api/admin/analytics?type=categories').then(r => r.json())
      ])

      setAnalytics({
        overview,
        publisherStats: publishers.publisherStats || {},
        categoryStats: categories.categoryStats || {}
      })
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-white p-6">Loading analytics...</div>

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-white">Advertisement Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1e1e2e] border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Clicks</h3>
            <p className="text-4xl font-bold text-blue-500">{analytics.overview?.totalClicks || 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1e1e2e] border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Active Ads</h3>
            <p className="text-4xl font-bold text-green-500">{analytics.overview?.activeAds || 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1e1e2e] border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Ads</h3>
            <p className="text-4xl font-bold text-purple-500">{analytics.overview?.totalAds || 0}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1e1e2e] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Publisher Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(analytics.publisherStats).length === 0 ? (
            <p className="text-gray-400 text-center py-8">No publisher data available</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(analytics.publisherStats).map(([publisher, clicks]) => (
                <div key={publisher} className="flex justify-between items-center p-3 bg-[#2a2a3e] rounded-lg hover:bg-[#333347] transition-colors">
                  <span className="text-gray-300">{publisher || 'Unknown'}</span>
                  <span className="font-semibold text-purple-400">{clicks} clicks</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-[#1e1e2e] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(analytics.categoryStats).length === 0 ? (
            <p className="text-gray-400 text-center py-8">No category data available</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(analytics.categoryStats).map(([category, clicks]) => (
                <div key={category} className="flex justify-between items-center p-3 bg-[#2a2a3e] rounded-lg hover:bg-[#333347] transition-colors">
                  <span className="text-gray-300 capitalize">{category}</span>
                  <span className="font-semibold text-indigo-400">{clicks} clicks</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
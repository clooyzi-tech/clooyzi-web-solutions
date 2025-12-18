"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Edit, Trash2, ExternalLink, LogOut, Eye, Upload, Link as LinkIcon, Image as ImageIcon, MessageSquareQuote } from 'lucide-react'
import { Work, Testimonial } from '@/lib/supabase'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'works' | 'testimonials'>('works')
  const [works, setWorks] = useState<Work[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingWork, setEditingWork] = useState<Work | null>(null)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
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
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'works' | 'testimonials')} className="mb-8">
          <TabsList className="bg-[#2a2a3e] border border-gray-700">
            <TabsTrigger value="works" className="data-[state=active]:bg-purple-600">
              <ImageIcon className="w-4 h-4 mr-2" />
              Works
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-purple-600">
              <MessageSquareQuote className="w-4 h-4 mr-2" />
              Testimonials
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
        </Tabs>
      </div>
    </div>
  )
}
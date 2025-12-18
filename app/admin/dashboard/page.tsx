"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Edit, Trash2, ExternalLink, LogOut, Eye, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react'
import { Work } from '@/lib/supabase'

export default function AdminDashboard() {
  const [works, setWorks] = useState<Work[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingWork, setEditingWork] = useState<Work | null>(null)
  const [imageMethod, setImageMethod] = useState<'url' | 'upload'>('url')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    project_link: ''
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
        {/* Add Work Button */}
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
      </div>
    </div>
  )
}
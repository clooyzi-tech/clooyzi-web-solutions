'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Advertisement {
  id: number
  title: string
  description: string
  image_url: string
  link_url: string
  category: string
  is_active: boolean
}

export default function PublisherDemo() {
  const [ads, setAds] = useState<Advertisement[]>([])
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('tech')

  const fetchAds = async (selectedCategory: string) => {
    setLoading(true)
    try {
      // Example API call that publishers would make
      const response = await fetch(`/api/ads?category=${selectedCategory}&publisherSite=demo-site&pageType=article&limit=3`)
      const data = await response.json()
      
      if (data.success) {
        setAds(data.ads)
      }
    } catch (error) {
      console.error('Error fetching ads:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdClick = async (adId: number) => {
    try {
      // Track the click
      const response = await fetch('/api/ads/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adId,
          publisherSite: 'demo-site',
          pageType: 'article'
        })
      })
      
      const data = await response.json()
      if (data.success && data.redirectUrl) {
        window.open(data.redirectUrl, '_blank')
      }
    } catch (error) {
      console.error('Error tracking click:', error)
    }
  }

  useEffect(() => {
    fetchAds(category)
  }, [category])

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 min-h-screen">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold text-gray-900 text-4xl">
            Publisher Integration Demo
          </h1>
          <p className="mb-8 text-gray-600 text-xl">
            Example of how publisher websites can request and display advertisements
          </p>
          
          {/* Category Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {['tech', 'fashion', 'education', 'business', 'health'].map((cat) => (
              <Button
                key={cat}
                onClick={() => setCategory(cat)}
                variant={category === cat ? 'default' : 'outline'}
                className="capitalize"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* API Request Example */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>API Request Example</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 p-4 rounded-lg font-mono text-green-400 text-sm">
              <div className="mb-2">// GET Request</div>
              <div className="text-blue-300">
                GET /api/ads?category={category}&publisherSite=demo-site&pageType=article&limit=3
              </div>
              <div className="mt-4 mb-2">// POST Request</div>
              <div className="text-blue-300">
                POST /api/ads
                <br />
                {JSON.stringify({
                  category,
                  publisherSite: 'demo-site',
                  pageType: 'article',
                  limit: 3
                }, null, 2)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advertisement Display */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full py-12 text-center">
              <div className="text-gray-600">Loading advertisements...</div>
            </div>
          ) : ads.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <div className="text-gray-600">No advertisements available for "{category}" category</div>
            </div>
          ) : (
            ads.map((ad) => (
              <Card key={ad.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="p-0">
                  <img
                    src={ad.image_url}
                    alt={ad.title}
                    className="rounded-t-lg w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="mb-2 text-lg">{ad.title}</CardTitle>
                  <p className="mb-4 text-gray-600 text-sm line-clamp-2">
                    {ad.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-100 px-2 py-1 rounded-full text-blue-800 text-xs capitalize">
                      {ad.category}
                    </span>
                    <Button
                      onClick={() => handleAdClick(ad.id)}
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 hover:from-purple-700 to-indigo-600 hover:to-indigo-700"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Integration Instructions */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Integration Instructions for Publishers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Step 1: Request Advertisements</h3>
              <p className="text-gray-600">
                Make a GET or POST request to <code className="bg-gray-100 px-2 py-1 rounded">/api/ads</code> with your parameters
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Step 2: Display Advertisements</h3>
              <p className="text-gray-600">
                Render the returned advertisements on your website using the provided data
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Step 3: Track Clicks</h3>
              <p className="text-gray-600">
                When users click ads, send a POST request to <code className="bg-gray-100 px-2 py-1 rounded">/api/ads/click</code> for analytics
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card
      className="relative flex flex-col h-full transition-all duration-300 group 
                 hover:shadow-xl hover:shadow-purple-500/30"
    >
      {/* Light purple animated background glow */}
      <div className="absolute inset-0 rounded-xl bg-purple-500 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" />

      <CardHeader className="relative">
        <div className="mb-2 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-800">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="relative flex flex-col flex-1">
        <CardDescription className="flex-1 mb-4">{description}</CardDescription>

        {/* Button hover -> purple */}
        <Button
          variant="outline"
          className="w-full mt-auto group/button transition-colors duration-300 
                     hover:bg-purple-600 hover:text-white border-purple-600"
        >
          Learn More
          <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/button:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

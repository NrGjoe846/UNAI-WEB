import { NextResponse } from 'next/server'

// Mock course data
const courses = [
  { id: '1', title: 'Introduction to AI', description: 'Learn the basics of AI', image: '/placeholder.svg?height=200&width=400', duration: '4 weeks', level: 'Beginner', rating: 4.5 },
  { id: '2', title: 'Machine Learning Fundamentals', description: 'Dive into machine learning concepts', image: '/placeholder.svg?height=200&width=400', duration: '6 weeks', level: 'Intermediate', rating: 4.7 },
  { id: '3', title: 'Deep Learning with PyTorch', description: 'Master deep learning using PyTorch', image: '/placeholder.svg?height=200&width=400', duration: '8 weeks', level: 'Advanced', rating: 4.8 },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (query) {
    const filteredCourses = courses.filter(course => 
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase())
    )
    return NextResponse.json(filteredCourses)
  }

  return NextResponse.json(courses)
}


import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'
import PDFDocument from 'pdfkit'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  constconst { courseId } = req.body

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { completedBy: true }
    })

    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    if (!course.completedBy.some(user => user.id === session.user.id)) {
      return res.status(403).json({ message: 'Course not completed' })
    }

    const doc = new PDFDocument()
    const chunks: Buffer[] = []

    doc.on('data', chunk => chunks.push(chunk))
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks)
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `attachment; filename=certificate-${courseId}.pdf`)
      res.send(pdfBuffer)
    })

    // Generate certificate content
    doc.fontSize(24).text('Certificate of Completion', { align: 'center' })
    doc.moveDown()
    doc.fontSize(16).text(`This is to certify that ${session.user.name}`, { align: 'center' })
    doc.fontSize(16).text(`has successfully completed the course:`, { align: 'center' })
    doc.moveDown()
    doc.fontSize(20).text(course.title, { align: 'center' })
    doc.moveDown()
    doc.fontSize(14).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' })

    doc.end()
  } catch (error) {
    console.error('Certificate generation error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}


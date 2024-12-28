import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { courseId } = req.body

  try {
    const course = await prisma.course.findUnique({ where: { id: courseId } })

    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
            },
            unit_amount: course.price * 100, // Stripe expects the amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/courses/${courseId}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/courses/${courseId}?canceled=true`,
      customer_email: session.user.email,
    })

    res.status(200).json({ sessionId: stripeSession.id })
  } catch (error) {
    console.error('Payment session creation error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}


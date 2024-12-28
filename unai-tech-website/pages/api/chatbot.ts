import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { message } = req.body

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant for an online learning platform." },
        { role: "user", content: message }
      ],
    })

    res.status(200).json({ reply: completion.data.choices[0].message.content })
  } catch (error) {
    console.error('Chatbot error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}


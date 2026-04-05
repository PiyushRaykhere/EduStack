import "dotenv/config"

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash"
const GEMINI_API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

const DoubtController = {
  async askDoubt(req, res) {
    try {
      const { query } = req.body

      if (!query) {
        return res.status(400).json({
          message: "Query is required"
        })
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          message: "GEMINI_API_KEY is not configured in backend environment"
        })
      }

      const prompt = `
You are an educational assistant for an online learning platform.
Student question: ${query}

Give a clear, beginner-friendly answer in simple language.
      `.trim()

      const geminiResponse = await fetch(GEMINI_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      })

      const data = await geminiResponse.json()

      if (!geminiResponse.ok) {
        return res.status(geminiResponse.status).json({
          message: data?.error?.message || "Gemini API request failed"
        })
      }

      const answer =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received from Gemini."

      return res.status(200).json({
        query,
        answer
      })
    } catch (error) {
      console.error("Error while asking Gemini:", error)
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      })
    }
  }
}

export default DoubtController

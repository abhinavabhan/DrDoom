export default async function handler(req, res) {

  try {

    const prompt = "romantic couple hugging, cinematic lighting, ultra realistic photography, beautiful couple portrait"

    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt,
          options: { wait_for_model: true }
        })
      }
    )

    if (!response.ok) {
      const text = await response.text()
      return res.status(500).send(text)
    }

    const image = await response.arrayBuffer()

    res.setHeader("Content-Type", "image/png")
    res.send(Buffer.from(image))

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: "Image generation failed"
    })

  }

}

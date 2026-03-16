export default async function handler(req,res){

const response = await fetch(
"https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
{
method:"POST",
headers:{
Authorization:`Bearer ${process.env.HF_TOKEN}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
inputs:"romantic couple hugging cinematic lighting professional photography"
})
}
)

const buffer = await response.arrayBuffer()

res.setHeader("Content-Type","image/png")
res.send(Buffer.from(buffer))

}

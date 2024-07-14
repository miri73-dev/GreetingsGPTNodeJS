const express = require ('express');
const dotenv = require ('dotenv');
const { OpenAI } = require('openai');
const cors = require('cors');

dotenv.config();
const app = express()

app.use(express.json());
app.use(cors());

const openai = new OpenAI ({
    apiKey:process.env.OPENAI_API_KEY,    
});

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/gpt',async(req, res) => {
const runPrompt = async()=>{
    const prompt = `Don't include in the response
        "creating", "creating an ai", "generating", "ai", "desgining", "video", "incorporating".
        My request is: Please provide 3 ideas of ${req.body.text}
        Also, return the response in JSON format that can be parsed as follows:
        {
        "1":"...",
        "2":"...",
        "3":"..."
        }`;
    const response = await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
        messages:[{role: "system", content: prompt}],
        max_tokens:100,
    });

    const parsableJSONresponse = response.choices[0].message.content
    console.log("__________"+parsableJSONresponse)
    let parsedResponse;
    try{
      parsedResponse = JSON.parse(parsableJSONresponse)
    }
    catch (error){
        console.error("Error parsing JSON response:", error)
        res.status(500).send("Error parsing JSON response")
        return{}
    }

    console.log("prompt 1:", parsedResponse["1"]);
    console.log("prompt 2:", parsedResponse["2"]);
    console.log("prompt 3:", parsedResponse["3"]);
    
    res.json(parsedResponse)
    }

    try {
        const response = await runPrompt();
        res.send(response);  // שולח את התגובה ללקוח
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on http://localhost:${process.env.PORT}`)
  })

console.log("hi")
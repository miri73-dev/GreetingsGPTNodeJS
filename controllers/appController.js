import dotenv from "dotenv";
import OpenAI from 'openai';

dotenv.config();
const secret = "JIs%WCfS#Sl454d5FX";

const openai = new OpenAI ({
    apiKey:process.env.OPENAI_API_KEY,
});

console.log("----ENV----"+process.env.OPENAI_API_KEY);

const appController={
   post: async (req, res) => {
    const runPrompt = async()=>{
        const prompt = ` Do not include in the response
            "Do not include in the response
            "Creator", "AI Creator", "Creator", "AI", "Design", "Video", "Integration".
            My request is:
            I need to write a greeting for ${req.body.detail}
            The greeting should be in the writing type of: ${req.body.writing}
            The greeting should be in the mood of ${req.body.atmosphere} and in the style: ${req.body.style}
            And please provide 3 ideas that fit the criteria.
            Also, return the response in JSON format that can be parsed as follows:
            {
            "1":"...",
            "2":"...",
            "3":..."
            }
            Please note that all answers will not exceed 120 words
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
    },
   
};
export default appController;
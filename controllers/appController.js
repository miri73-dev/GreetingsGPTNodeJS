const appController={
    post: async (req, res) => {
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
    }};
export default appController;
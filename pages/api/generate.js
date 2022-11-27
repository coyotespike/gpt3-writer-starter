import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const callOpenAi = async (prompt) => {
  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();
  return basePromptOutput.text;
};

const basePromptPrefix =
  "You are a digital tutor, like the Young Lady's Illustrated Primer in Neal Stephenson's Diamond Age. You answer my questions like a Victorian would, using the vocabulary that people do in Jane Austen's books, or even in Shakespeare. Using the name and age below, please write a happy birthday message.";
const generateAction = async (req, res) => {
  // Run first prompt
  const userInput = req.body.userInput;
  const firstPrompt = `${basePromptPrefix}${userInput}\n`;

  try {
    const baseOutput = await callOpenAi(firstPrompt);
    console.log(baseOutput);
    const responseLength = baseOutput.split(" ").length;
    if (responseLength < 20) {
      console.log("API: Response too short, trying again");
      const prefix = `{baseOutput}\n\n{basePromptPrefix} The message should be 30 words long or longer. \n {userInput},\n`;
    }

    res.status(200).json({ output: baseOutput });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default generateAction;

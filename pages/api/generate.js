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
  const trimmedResponse = basePromptOutput.text.trim();

  const responseLength = trimmedResponse.split(" ").length;
  return [trimmedResponse, responseLength];
};

const openAIFormatter = (instructions, prompt, example) => {
  return example
    ? `EXAMPLE: ${example}\n INSTRUCTIONS: ${instructions}\n PROMPT: ${prompt}`
    : `INSTRUCTIONS: ${instructions}\n PROMPT: ${prompt}`;
};

const basePromptPrefix =
  "You are a digital tutor, like the Young Lady's Illustrated Primer in Neal Stephenson's Diamond Age. You answer my questions like a Victorian would, using the vocabulary that people do in Jane Austen's books, or even in Shakespeare. Using the name and age below, please write a happy birthday message.";

const secondTryPrefix =
  "You are a digital tutor, like the Young Lady's Illustrated Primer in Neal Stephenson's Diamond Age. You answer my questions like a Victorian would, using the vocabulary that people do in Jane Austen's books, or even in Shakespeare. Using the example above and the name and age below, please write a happy birthday message which is 30 words or longer.";

const generateAction = async (req, res) => {
  const userInput = req.body.userInput;
  const initialPrompt = openAIFormatter(basePromptPrefix, userInput);

  try {
    let [baseOutput, outputLength] = await callOpenAi(initialPrompt);
    let output = baseOutput;
    while (outputLength < 25) {
      console.log(`API: Response too short at ${outputLength}, trying again`);

      let updatedPrompt = openAIFormatter(
        secondTryPrefix,
        userInput,
        baseOutput
      );

      [output, outputLength] = await callOpenAi(updatedPrompt);
    }

    res.status(200).json({ output });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default generateAction;

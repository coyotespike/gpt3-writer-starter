import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const callOpenAi = async (prompt) => {
  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.8,
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

const titlesInstructions = `Take this list of prompts and give back a four word title for each image. Put each title into a list as well, so they look like ["title", "title"].`;

const christmasCardInstructions = (
  title,
  fromNames,
  toNames,
  isPoem = false,
) => {
  return `A Christmas card has a picture on the front with the title ${title}. The card is from ${fromNames}, and addressed to ${toNames}. Write a creative and warm ${
    isPoem ? "rhyming poem" : "message"
  } with a joke based on the picture title. Don't put the title in the message.`;
};

const generateAction = async (req, res) => {
  try {
    const { title, fromNames, toNames, isPoem } = req.body;
    const instructions = christmasCardInstructions(
      title,
      fromNames,
      toNames,
      isPoem,
    );
    const [response, responseLength] = await callOpenAi(instructions);

    res.status(200).json({ output: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default generateAction;

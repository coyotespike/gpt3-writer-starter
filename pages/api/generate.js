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
    max_tokens: 500,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();
  const trimmedResponse = basePromptOutput.text.trim();

  const responseLength = trimmedResponse.split(" ").length;
  return [trimmedResponse, responseLength];
};

const openAIFormatter = (instructions, prompt, example) => {
  return example
    ? `EXAMPLE: ${example}\n INSTRUCTIONS: ${instructions}\n PROMPT: ${prompt}`
    : `INSTRUCTIONS: ${instructions}\n DATA: ${prompt}`;
};

const titlesInstructions = `Here is a list of prompts. For each prompt, write a title based on the prompt. Put each title in a list so it looks like ["title", "title"]. Reply only with the list of titles.`;
// "For each object in this list, write a title based on the prompt and replace the prompt with the title so each object looks like [{id: 1, title: TITLE}]. Reply only with the list. Make sure the is valid JSON and terminates correctly, even if .";

const christmasCardInstructions = (
  title,
  fromNames,
  toNames,
  isPoem = false
) => {
  return `A Christmas card has a picture on the front with the title ${title}. The card is from ${fromNames}, and addressed to ${toNames}. Write a creative and warm ${
    isPoem ? "rhyming poem" : "message"
  } with a joke based on the picture title. Don't put the title in the message.`;
};

const formatResponse = (response) => {
  // the response is a string representing a list of objects
  // but sometimes the response is not valid JSON

  // there are 6 cases:
  // 1. The string ends with a number. In this case, we should add `}]` to the end of the string
  // 2. The string ends with a quotation mark. In this case, we should add `}]` to the end of the string
  // 3. The string ends with a comma. In this case, we should add `}]` to the end of the string
  // 4. The string ends with a curly brace. In this case, we should add `]` to the end of the string
  // 5. The string ends with a letter. In this case, we should add `"}]` to the end of the string
  // 6. The string ends with a space. In this case, we should add `}]` to the end of the string

  // first, figure out which of the 6 cases we have here
  const lastChar = response[response.length - 1];
  const lastTwoChars = response.slice(response.length - 2);
  const lastThreeChars = response.slice(response.length - 3);

  if (lastChar === " ") {
    return response + "}]";
  } else if (lastChar === "}") {
    return response + "]";
  } else if (lastChar === ",") {
    return response + "}]";
  } else if (lastChar === '"') {
    return response + "}]";
  } else if (
    lastChar === "0" ||
    lastChar === "1" ||
    lastChar === "2" ||
    lastChar === "3" ||
    lastChar === "4" ||
    lastChar === "5" ||
    lastChar === "6" ||
    lastChar === "7" ||
    lastChar === "8" ||
    lastChar === "9"
  ) {
    return response + "}]";
  } else if (lastTwoChars === '""') {
    return response + "}]";
  } else if (lastThreeChars === '""}') {
    return response + "]";
  } else {
    return response + '"}]';
  }
};

function startsWith(str, test) {
  return str.substr(0, test.length).toLowerCase() === test.toLowerCase();
}
const flexibleParser = (data) => {
  const prefix = "Answer";
  if (startsWith(data, prefix)) {
    let regex = new RegExp("Answer: ", "i");
    data = data.split(regex)[1];
  }
  try {
    let parsed = JSON.parse(data);
    return parsed;
  } catch (e) {
    try {
      console.log("trying to fix the response", data);
      const formatted = formatResponse(data);
      let parsed = JSON.parse(formatted);
      return parsed;
    } catch (e) {
      return [];
    }
  }
};

const generateAction = async (req, res) => {
  try {
    let response, responseLength;
    const { "request-type": requestType } = req.headers;

    if (requestType === "generateTitles") {
      const { prompts } = req.body;

      if (prompts.length > 25) {
        const firstGroup = JSON.stringify(prompts.slice(0, 25));
        const secondGroup = JSON.stringify(prompts.slice(25));

        console.log("Calling OpenAI for first group");
        const instructions = openAIFormatter(titlesInstructions, firstGroup);
        const [firstResponse, firstResponseLength] = await callOpenAi(
          instructions
        );
        const firstResponseParsed = flexibleParser(firstResponse);

        console.log("Calling OpenAI for second group");
        const secondInstructions = openAIFormatter(
          titlesInstructions,
          secondGroup
        );
        const [secondResponse, secondResponseLength] = await callOpenAi(
          secondInstructions
        );
        const secondResponseParsed = flexibleParser(secondResponse);
        console.log(secondResponseParsed, "secondResponseParsed");

        // concat returns the thing that is being concatenated to
        response = [...firstResponseParsed, ...secondResponseParsed];
        console.log(
          firstResponseParsed.length,
          secondResponseParsed.length,
          response.length,
          "response length"
        );
      } else {
        const instructions = openAIFormatter(titlesInstructions, prompts);

        [response, responseLength] = await callOpenAi(instructions);
      }
    } else {
      const { title, fromNames, toNames, isPoem } = req.body;

      const instructions = christmasCardInstructions(
        title,
        fromNames,
        toNames,
        isPoem
      );
      [response, responseLength] = await callOpenAi(instructions);
    }

    console.log(response, "response");

    res.status(200).json({ output: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default generateAction;

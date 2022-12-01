import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { Card, Emoji } from "components";

const Messages = () => {
  const [userInput, setUserInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiOutput, setApiOutput] = useState("");

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();

    const { output } = data;
    console.log("OpenAI replied...", output);

    setApiOutput(`${output}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <Stack justifyContent="center" alignItems="center" spacing={10}>
      <Link href="/artwork" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => callGenerateEndpoint()}
        >
          Make some text!
        </Button>
      </Link>
    </Stack>
  );
};

export default Messages;

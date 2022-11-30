import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { Card } from "../components";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiOutput, setApiOutput] = useState("");

  const [isOpened, setIsOpened] = useState(false);

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
    <div onClick={() => setIsOpened((isOpened) => !isOpened)}>
      <Card isOpened={isOpened} />
    </div>
  );
};

export default Home;

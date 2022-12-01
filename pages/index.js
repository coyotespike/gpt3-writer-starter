import Head from "next/head";
import { useEffect, useState } from "react";
import { BackgroundImage, Card, ImageGallery } from "../components";
import { Button, Grid, Item, Stack } from "@mui/material";
import emoji from "node-emoji";

const Emoji = (props) => {
  const symbol = emoji.get(props.name);

  return (
    <span
      className="emoji"
      role="img"
      aria-label={props.name}
      aria-hidden={false}
    >
      {symbol}
    </span>
  );
};

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiOutput, setApiOutput] = useState("");

  const [isOpened, setIsOpened] = useState(false);
  const [images, setImages] = useState([]);
  useEffect(() => {
    async function fetchImages() {
      const response = await fetch("/api/lexica");
      const data = await response.json();
      setImages(data.images);
    }
    // fetchImages();
  }, []);

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
    <div>
      <BackgroundImage />
      <Stack justifyContent="center" alignItems="center" spacing={10}>
        <div className="is-hidden">for vertical spacing</div>
        <div onClick={() => setIsOpened((isOpened) => !isOpened)}>
          <Card isOpened={isOpened} />
        </div>
        <Button
          variant="contained"
          color="success"
          size="large"
          startIcon={<Emoji name="snowman" />}
        >
          Get started!
        </Button>
        {/* {images && <ImageGallery images={images} />} */}
        {/* <ImageGallery /> */}
      </Stack>
    </div>
  );
};

export default Home;

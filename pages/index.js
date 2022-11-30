import Head from "next/head";
import { useEffect, useState } from "react";
import { Card, ImageGallery } from "../components";

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
    fetchImages();
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
      <div onClick={() => setIsOpened((isOpened) => !isOpened)}>
        <Card isOpened={isOpened} />
      </div>

      {/* {images && <ImageGallery images={images} />} */}
    </div>
  );
};

export default Home;

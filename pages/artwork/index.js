import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { Elf, ImageGallery } from "components";
import { useGlobalContext } from "utils/Context";

const prepImages = (images) => {
  return images.map((image) => ` PROMPT: ${image.prompt}`);
};

const ArtSelector = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fetchedImages, setFetchedImages] = useState(false);

  const [state, setGlobalState] = useGlobalContext();
  useEffect(() => {
    setGlobalState("selectedImage", selectedImage);
  }, [selectedImage]);

  function setOrUnsetSelectedImage(image) {
    if (!selectedImage || selectedImage.src !== image.src) {
      setSelectedImage(image);
    } else {
      setSelectedImage(null);
    }
  }

  async function fetchImages(searchUrl = "") {
    const response = await fetch(`/api/lexica?url=${searchUrl}`, {});
    const data = await response.json();
    setImages(data.images);
    setFetchedImages(!fetchedImages);
  }

  async function fetchTitles() {
    const prompts = prepImages(images);

    const response = await fetch(`/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "request-type": "generateTitles",
      },
      body: JSON.stringify({ prompts }),
    });
    const data = await response.json();
    const titles = data.output;
    console.log(titles);
    const imagesWithTitles = images.map((image, index) => ({
      ...image,
      title: titles[index] || "A Christmas Scene",
    }));
    setImages(imagesWithTitles);
  }
  useEffect(() => {
    if (images.length) {
      fetchTitles();
    }
  }, [fetchedImages]);

  return (
    <Stack alignItems="center" spacing={4}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      />
      <Typography variant="h4">
        Select an example to start your custom card!
      </Typography>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={3} />
        <Grid
          item
          xs={2}
          style={{ width: "100px", height: "200px", position: "relative" }}
        >
          <Elf variant="secondElf" />
        </Grid>
        <Grid item xs={4}>
          <Stack alignItems="center">
            <Typography variant="h6">
              {selectedImage
                ? "You selected " + selectedImage.title
                : "Choose a picture below"}
            </Typography>

            <Box>
              <Button
                variant="contained"
                color="success"
                onClick={() => fetchImages(selectedImage.src)}
                disabled={!selectedImage}
              >
                Get More Like This
              </Button>

              <Typography variant="body">OR</Typography>

              <Link href="/messages" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!selectedImage}
                >
                  Let's use this one!
                </Button>
              </Link>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <ImageGallery
        setSelectedImage={setOrUnsetSelectedImage}
        images={images}
      />
    </Stack>
  );
};

export default ArtSelector;

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
    const prompts = images.map((image) => image.prompt);

    const response = await fetch(`/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompts }),
    });
    const data = await response.json();
    const titles = data.titles;
    const imagesWithTitles = images.map((image, index) => ({
      ...image,
      title: titles[index],
    }));
    setImages(imagesWithTitles);
  }
  // useEffect(() => {
  //   fetchTitles();
  // }, [fetchedImages]);

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
        {selectedImage ? (
          <>
            <Grid
              item
              xs={3}
              style={{ width: "100px", height: "200px", position: "relative" }}
            >
              <Elf variant="secondElf" />
            </Grid>
            <Grid item xs={3}>
              <Stack alignItems="center">
                <Typography variant="h6">
                  {"You selected " + selectedImage.title}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={() => fetchImages(selectedImage.src)}
                >
                  Have the elves make more like it!
                </Button>

                <Typography variant="body">OR</Typography>

                <Link href="/messages" style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="primary" size="large">
                    Let's use this one!
                  </Button>
                </Link>
              </Stack>
            </Grid>
          </>
        ) : (
          <Grid item xs={6} style={{ height: "250px" }}>
            <Typography variant="h5">
              We'll send it off to the robot elves to generate a brand-new
              picture for you
            </Typography>
          </Grid>
        )}
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

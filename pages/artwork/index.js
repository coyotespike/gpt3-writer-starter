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

const ArtSelector = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch("/api/lexica");
      const data = await response.json();
      setImages(data.images);
    }
    // fetchImages();
  }, []);

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
      <Typography variant="h6">
        {" "}
        We'll send it off to the robot elves to generate a brand-new picture for
        you
      </Typography>
      <div style={{ width: "100px", height: "200px", position: "relative" }}>
        <Elf variant="secondElf" />
      </div>

      <Link href="/messages" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="success" size="large">
          Get started!
        </Button>
      </Link>
      {/* {images && <ImageGallery images={images} />} */}
      <ImageGallery setSelectedImage={setSelectedImage} />
    </Stack>
  );
};

export default ArtSelector;

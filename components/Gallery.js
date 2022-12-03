import * as React from "react";
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

export default function MasonryImageList({
  images = itemData,
  setSelectedImage,
}) {
  const imagesToMap = images.length ? images : itemData;
  return (
    <Box sx={{ width: 700, height: 700, overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={2} gap={8}>
        {imagesToMap.map((item) => (
          <ImageListItem key={item.src} onClick={() => setSelectedImage(item)}>
            <img
              src={`${item.src}?w=248&fit=crop&auto=format`}
              srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
              height={item.height}
              width={item.width}
              loading="lazy"
            />
            <ImageListItemBar title={item.title || "Generating title"} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    src: "https://image.lexica.art/md/bac12345-00c5-4fbe-8bbd-f04b8a9abdae",
    title: "Krampus Christmas",
    altSrc: "https://lexica.art/prompt/ecf6e5b1-6866-4e05-a234-89ab152998f4",
    prompt:
      "a lonely christmas tree surrounded by krampus like monsters, nighttime, dark, surroundings are illuminated by the christmas tree, eerie, in the style of craig mullins",
  },
  {
    src: "https://image.lexica.art/md/36e3b304-ec0c-4e51-a054-bbad147b5a53",
    altSrc: "https://lexica.art/prompt/d7495c99-c7c6-4947-9f72-2a7264ea1e37",
    title: "Nightmare Before Christmas",
    prompt:
      "a scene from tim burtons nightmare before christmas, illustration, reality, wide shot, light colors, highly detailed, sharp focus, cinema 4 d, 3 d, octane render ",
  },
  {
    src: "https://image.lexica.art/md/079ca508-a2f9-42be-9b33-e5e3a2d485c0",
    altSrc: "https://lexica.art/prompt/e23a19a0-190b-41b6-8406-d27a83c2d9e5",
    title: "Black Forest Village",
    prompt:
      "an abandoned village in the black forest at midnight illuminated by christmas lights ",
  },
  {
    src: "https://image.lexica.art/md/fd87dc48-7ba9-4cfb-b89a-832da67fc933",
    title: "Ugly Sweater Christmas",
    altSrc: "https://lexica.art/prompt/e7e0ee3c-a263-46d5-ab2b-54429c24b2b1",
    prompt:
      "award winning product photograph of an wool ugly christmas sweater style with ancient egyptian hieroglyphic iconography design, displayed on a model, hd ",
  },
  {
    src: "https://image.lexica.art/md/d4a9a296-c656-4e06-b908-8b5bd63701eb",
    title: "Cardinal",
    altSrc: "https://lexica.art/prompt/d088f1e5-3533-4c8b-8103-2412a4f64ad2",
    prompt:
      "detailed oil painting of magical winter christmas tree with snow and lights and bulbs and red cardinal bird sitting on branch 4k",
  },
  {
    src: "https://image.lexica.art/md/04e41afd-07cd-4651-b8e8-ac695823b9a5",
    title: "It's basically IKEA",
    altSrc: "https://lexica.art/prompt/0b6f89f6-97ff-4d64-abf1-df68baa4b423",
    prompt:
      "flat sticker scandi christmas tree with kitsch glitzy baubles and stars and christmas robin bird decorations, silver pink white red mood, smooth sharp focus",
  },
  {
    src: "https://image.lexica.art/md/4d340554-3771-464c-8cf3-0f4c10592cbe",
    title: "Zombie Christmas",
    altSrc: "https://lexica.art/prompt/c7851035-0399-4255-9f3d-50765b27663a",
    prompt:
      "a zombie family christmas dinner by ross tan, hyper realistic, ambient lighting, concept art, intricate, hyper detailed, smooth, dynamic volumetric lighting, octane, cinematic",
  },
  {
    src: "https://image.lexica.art/md/7db4d997-6acd-4def-996b-5f5168ac70d6",
    title: "Home for the Holidays",
    altSrc: "https://lexica.art/prompt/cbe93f19-e0b2-4050-84be-e3d7d1e45dcd",
    prompt:
      "a christmas eve photorealistic painting, cozy home, interior, sci - fi, wlop, concept art, octane render, deviantart, greg rutkowski, cinematic, key art, hyperrealism",
  },
  {
    src: "https://image.lexica.art/md/6508d366-4526-40fd-8223-1411fc45d6f1",
    title: "Bah humbug Mr. Scrooge",
    altSrc: "https://lexica.art/prompt/cec46d3b-3785-4234-87bc-0722085ca582",
    prompt: "A beautiful christmas morning",
  },
  {
    src: "https://image.lexica.art/md/c08261ee-9d17-45f9-8342-ff1cb373f76b",
    title: "Capuchin monkeys like Santa too",
    altSrc: "https://lexica.art/prompt/e17545c3-0963-4f03-84a5-4ddbd0b8cb95",
    prompt:
      "capuchin monkey putting christmas tree ornament on christmas tree, standing next to humanoid robot, living room, 2 0 0 6 youtube video",
  },
  {
    src: "https://image.lexica.art/md/8e043132-69c0-42e3-bfc3-f98d104495d2",
    title: "Switzerland, home of chocolate",
    altSrc: "https://lexica.art/prompt/d7c1991f-4355-4e8e-a72f-f8658cad0731",
    prompt:
      "A portal christmas leyline to switzerland, heavely planes spiritual",
  },
  {
    src: "https://image.lexica.art/md/ffb32e89-490d-4b57-a8bf-c45ba6030fc7",
    title: "Doing our best impressionism of art here",
    altSrc: "https://lexica.art/prompt/ff398812-1eee-4d05-ada4-87cdb4b3006e",
    prompt:
      "an impressionist painting of a family sitting in the foreground there’s a beautiful woman with a symmetric face with two young children on her lap, a boy and a girl. There’s a Christmas tree and a log fire burning in the background. On the sofa in the background a scruffy homeless man sleeping.",
  },
];

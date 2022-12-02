import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Grid,
  Stack,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { Card, Elf, Emoji } from "components";
import { useGlobalContext } from "utils/Context";

const Messages = () => {
  const [names, setNames] = useState({ from: "", to: "" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState("");

  const [state, setGlobalState] = useGlobalContext();

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const title = state.selectedImage?.title || "Cozy Christmas Scene";
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        fromNames: names.from,
        toNames: names.to,
      }),
    });

    const data = await response.json();

    const { output } = data;
    console.log("OpenAI replied...", output);

    setMessage(output);
    setIsGenerating(false);
  };

  const inputNames = (event) => {
    setNames({ ...names, [event.target.id]: event.target.value });
  };
  return (
    <Stack justifyContent="center" alignItems="center">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        mt={10}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          style={{
            width: "100px",
            height: "210px",
            position: "relative",
          }}
        >
          <Elf variant="thirdElf" />
        </Box>
        <Paper>
          <TextField
            error
            id="from"
            placeholder="Who's the card from?"
            onChange={inputNames}
          />
          <TextField
            error
            id="to"
            placeholder="And who's it to?"
            onChange={inputNames}
          />
        </Paper>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          margin: "auto",
          width: "fit-content",
          height: "200px",
        }}
      >
        <Paper
          elevation={24}
          variant="outline"
          sx={{
            width: "fit-content",
            height: "fit-content",
            padding: "10px",
            margin: "auto",
            minHeight: "100px",
            backgroundColor: "#efe5d5",
            border: "1px solid #ccc",
          }}
        >
          <Typography>
            {message
              ? message
              : "The elves will write your message here after you put your names in the boxes above. But you can edit it when they're done or just write your own message!"}
          </Typography>
        </Paper>
      </Box>
      <Box>
        <Button
          disabled={!names.to.length}
          variant="contained"
          onClick={() => callGenerateEndpoint()}
        >
          {message && !!message.length ? "Try again" : "Write your message!"}
        </Button>
        {message && !!message.length && (
          <>
            <Typography variant="body" sx={{ mx: 2 }}>
              OR
            </Typography>

            <Link href="/checkout" style={{ textDecoration: "none" }}>
              <Button variant="contained">Let's send your card!</Button>
            </Link>
          </>
        )}
      </Box>
    </Stack>
  );
};

export default Messages;

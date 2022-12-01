import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { Card, Emoji } from "components";

const Home = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Stack justifyContent="center" alignItems="center" spacing={10}>
      <div className="is-hidden">for vertical spacing</div>
      <div onClick={() => setIsOpened((isOpened) => !isOpened)}>
        <Card isOpened={isOpened} />
      </div>

      <Link href="/artwork" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          startIcon={<Emoji name="snowman" />}
        >
          Get started!
        </Button>
      </Link>
    </Stack>
  );
};

export default Home;

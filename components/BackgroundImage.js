import styled from "styled-components";
import Image from "next/image";

const BackgroundImage = () => (
  <div className="bgWrap">
    <Image
      src="/backgroundImage.webp"
      alt="Generated on Lexica with: wide view of white snowy landscape with gently rolling hills, elegant crisp line drawing, pine trees in the distant background, two small reindeer grazing at the edges, 1920 pixels wide x 1080 pixels high"
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: "cover",
      }}
    />
  </div>
);

export default BackgroundImage;

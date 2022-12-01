import Image from "next/image";

const elves = {
  firstElf: "/elf.webp",
  secondElf: "/elf.webp",
  thirdElf: "/elf.webp",
};

const ElfImage = ({ variant = "firstElf" }) => {
  const elfSource = elves[variant];
  return (
    <div style={{ width: "90%", height: "90%", position: "relative" }}>
      <Image src={elfSource} objectFit="contain" layout="fill" />
    </div>
  );
};

export default ElfImage;

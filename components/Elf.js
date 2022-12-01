import Image from "next/image";

const elves = {
  firstElf: "/elf.webp",
  secondElf: "/elf2.webp",
  thirdElf: "/elf3.webp",
};

const ElfImage = ({ variant = "firstElf" }) => {
  const elfSource = elves[variant];
  return (
    <div style={{ width: "90%", height: "90%", position: "relative" }}>
      <Image
        src={elfSource}
        objectFit="contain"
        layout="fill"
        alt="a friendly elf"
      />
    </div>
  );
};

export default ElfImage;

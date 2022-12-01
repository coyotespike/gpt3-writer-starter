import { MerryChristmas } from "./MerryChristmas";
import {
  StyledCard,
  StyledCardFront,
  StyledOutsideCard,
  StyledCardInside,
  StyledCardBottom,
} from "./CardPieces";
import { ClickIcon } from "./ClickIcon";
import ElfImage from "./Elf";

export const Card = ({ isOpened }) => {
  return (
    <StyledCard isOpened={isOpened}>
      <StyledCardFront>
        <StyledOutsideCard />
        <StyledCardInside>
          <ElfImage />
        </StyledCardInside>
        <ClickIcon isOpened={isOpened} />
      </StyledCardFront>

      <StyledCardBottom>
        <p>
          This year, ask our robotic elves to make original artwork and messages
          for you! They'll even mail a physical card to your loved ones!
        </p>
      </StyledCardBottom>
    </StyledCard>
  );
};

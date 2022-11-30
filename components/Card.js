import { MerryChristmas } from "./MerryChristmas";
import {
  StyledCard,
  StyledCardFront,
  StyledOutsideCard,
  StyledCardInside,
  StyledCardBottom,
} from "./CardPieces";
import { ClickIcon } from "./ClickIcon";

export const Card = ({ isOpened }) => {
  return (
    <StyledCard isOpened={isOpened}>
      <StyledCardFront>
        <StyledOutsideCard />
        <StyledCardInside />
        <MerryChristmas />

        <ClickIcon isOpened={isOpened} />
      </StyledCardFront>

      <StyledCardBottom>
        <p>Lorem ipsum dolor. Sit Amet</p>
      </StyledCardBottom>
    </StyledCard>
  );
};

import styled from "styled-components";
import { MerryChristmas } from "./MerryChristmas";
import {
  StyledCard,
  StyledCardFront,
  StyledOutsideCard,
  StyledCardInside,
  StyledCardBottom,
} from "./CardPieces";

export const Card = ({ isOpened }) => {
  return (
    <StyledCard isOpened={isOpened}>
      <StyledCardFront>
        <StyledOutsideCard />
        <StyledCardInside />
        <MerryChristmas />
      </StyledCardFront>

      <StyledCardBottom>
        <p>Lorem ipsum dolor. Sit Amet</p>
      </StyledCardBottom>
    </StyledCard>
  );
};

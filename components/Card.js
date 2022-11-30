import styled from "styled-components";
import { MerryChristmas } from "./MerryChristmas";

const StyledOutsideCard = styled.div`
  border: 10px solid #fbfbfb;
  background: #c72320
    url("https://www.dropbox.com/s/xsgg2exs2oparkm/front-bg.png?raw=1")
    no-repeat center;
  background-size: cover;
  width: 100%;
  height: 100%;

  @media (max-width: 767px) {
    border: 5px solid #fbfbfb;
  }
  position: absolute;
  -webkit-backface-visibility: hidden;
`;

export const Card = ({ isOpened }) => {
  return (
    <div>
      <div className={`card ${"is-opened"}`}>
        <div className="card-page cart-page-front">
          <StyledOutsideCard className="card-page" />
          <div className="card-page cart-page-inside"></div>
          <MerryChristmas />
        </div>
        <div className="card-page cart-page-bottom">
          <p>Lorem ipsum dolor. Sit Amet</p>
        </div>
      </div>
    </div>
  );
};

import styled, { css, keyframes } from "styled-components";

/**
   Made with thanks to https://codepen.io/lukasz-niedzwiecki/pen/ZBNmpy
   **/

const cardIn = keyframes`
  0% {
    opacity: 0;
    transform: rotate(-10deg) translate(0, -100%);
  }
  25% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: rotate(-10deg) translate(0, 0);
  }
`;

const StyledCard = styled.div.attrs((props) => ({
  className: `card ${props.isOpened ? "is-opened" : ""}`,
}))``;

const StyledCardPage = styled.div`
  width: 350px;
  height: 500px;
  @media (max-width: 767px) {
    width: 230px;
    height: 329px;
  }
  @media (max-width: 479px) {
    width: 150px;
    height: 214px;
  }
  transition: transform 1s ease-in-out;
  cursor: pointer;
  position: absolute;
  outline: 1px solid transparent;
`;

const StyledOutsideCard = styled(StyledCardPage)`
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

const StyledCardFront = styled(StyledCardPage).attrs((props) => ({
  className: "cart-page-front",
}))``;

const StyledCardInside = styled(StyledCardPage)`
  position: absolute;
  -webkit-backface-visibility: hidden;
  position: absolute;
  -webkit-backface-visibility: hidden;

  background-color: #d4d1d0;
  background-image: url("https://www.dropbox.com/s/8hw7guch8d151kg/pattern.png?raw=1");
  border: 20px solid #d4d1d0;
  display: flex;
  box-pack: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -o-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  box-align: center;
  -moz-align-items: center;
  -ms-align-items: center;
  -o-align-items: center;
  align-items: center;
  -ms-flex-align: center;
  text-align: center;
  @media (max-width: 767px) {
    border: 10px solid #d4d1d0;
    background-position: 0px 30px;
  }
  @media (max-width: 479px) {
    background-position: 0px 30px;
  }
  transform: rotateY(-180deg);
  border-right: none !important;
  background-position: 0px 80px;
`;

const StyledCardBottom = styled(StyledCardPage)`
  background-color: #d4d1d0;
  background-image: url("https://www.dropbox.com/s/8hw7guch8d151kg/pattern.png?raw=1");
  border: 20px solid #d4d1d0;
  display: -webkit-box;
  display: -moz-box;
  display: box;
  display: -moz-flex;
  display: flex;
  box-pack: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -o-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  box-align: center;
  -moz-align-items: center;
  -ms-align-items: center;
  -o-align-items: center;
  align-items: center;
  -ms-flex-align: center;
  text-align: center;

  @media (max-width: 767px) {
    border: 10px solid #d4d1d0;
    background-position: 85px 30px;
  }
  @media (max-width: 479px) {
    background-position: 0px 30px;
  }
  z-index: 1;
  border-left: none !important;
  background-position: -22px 80px;
`;

export {
  StyledCard,
  StyledOutsideCard,
  StyledCardFront,
  StyledCardInside,
  StyledCardBottom,
};

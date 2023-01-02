import { createGlobalStyle } from "styled-components";
import ocraextended from "../assets/fonts/ocraextended.ttf";
//src: url(${OcraExtended}) format('ttf');
export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Ocra';
  src:  local('ocraextended'),
  url("fonts/ocraextended.ttf") format('ttf');
  src:  local('ocraextended'),
  url("fonts/ocraextended.woff") format('woff');  
  font-weight: normal;
  font-style: normal;
  font-display: auto;
}
`;


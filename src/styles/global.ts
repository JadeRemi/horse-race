import { createGlobalStyle } from 'styled-components';
import ocraextended from '../assets/fonts/ocraextended.ttf';

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

*,
*::before,
*::after {
  box-sizing: border-box;
}

ul[class],
ol[class] {
  padding: 0;
}

body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

ul[class],
ol[class] {
  list-style: none;
}

a:not([class]) {
  text-decoration-skip-ink: auto;
}

img {
  max-width: 100%;
  display: block;
}

article > * + * {
  margin-top: 1em;
}

input,
button,
textarea,
select {
  font: inherit;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

`;


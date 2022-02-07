import { createGlobalStyle } from "styled-components";

const breakpoints = {
  xxs: "320px",
  xs: "576px",
  sm: "768px",
  md: "992px",
  lg: "1200px",
  xl: "1440px",
};

const _breakpointsReverse = {
  xxs: "319.98px",
  xs: "575.98px",
  sm: "767.98px",
  md: "991.98px",
  lg: "1199.98px",
  xl: "1339.98px",
};

export const size = {
  maxMobileXS: `(max-width: ${breakpoints.xxs})`,
  maxMobileS: `(max-width: ${breakpoints.xs})`,
  maxMobile: `(max-width: ${breakpoints.sm})`,
  maxTablet: `(max-width: ${breakpoints.md})`,
  maxDesktop: `(max-width: ${breakpoints.lg})`,
  maxDesktopXL: `(max-width: ${breakpoints.xl})`,

  minMobileXS: `(min-width: ${_breakpointsReverse.xxs})`,
  minMobileS: `(min-width: ${_breakpointsReverse.xs})`,
  minMobile: `(min-width: ${_breakpointsReverse.sm})`,
  minTablet: `(min-width: ${_breakpointsReverse.md})`,
  minDesktop: `(min-width: ${_breakpointsReverse.lg})`,
  minDesktopXL: `(min-width: ${_breakpointsReverse.xl})`,
};

export const fontDef = {
  h1: { size: "78px", mobileSize: "32px", weight: 700 },
  h2: { size: "54px", mobileSize: "30px", weight: 700 },
  h3: { size: "48px", mobileSize: "28px", weight: 700 },
  h4: { size: "36px", mobileSize: "26px", weight: 700 },
  h5: { size: "30px", mobileSize: "24px", weight: 700 },
  h6: { size: "24px", mobileSize: "20px", weight: 400 },
  bodyLarge: { size: "20px", mobileSize: "16px", weight: 400 },
  body: { size: "16px", mobileSize: "14px", weight: 400 },
  bodySmall: { size: "14px", mobileSize: "14px", weight: 400 },
  small: { size: "12px", mobileSize: "12px", weight: 400 },
};

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary : #1DB954;
    --color-primary-light: #1ed760;
    --color-black : #121212;
    --color-dark : #181818;
    --color-white : #ffffff;
    --color-gray: #B3B3B3;
  }

  *,html{
    font-family: Helvetica, sans-serif;
    transition: color 0.2s, background-color 0.2s;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body{
    padding:0;
    margin: 0 auto;
    background-color: var(--color-black);
    color: var(--color-white);
  }

`;

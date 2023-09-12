import { useEffect, useRef } from "react";
import styled from "styled-components";

const Body = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  flex-direction: column;
  --mix-color-light: #fff8e0;
  /* --mix-color-light: hsl(46.66666666666668, 60%, 100%); */
  --base-color: hsl(46.66666666666667, 50%, 62.94117647058823%);
  --mix-color-dark: hsl(46.66666666666667, 50%, 32.94117647058823%);
  --mix-mode: in oklab;
  text-shadow: 1px 1px white, -1px -1px white;
  font-size: 1.5rem;
  > div {
    flex: 1;
    width: 100%;
    display: flex;
    border-bottom: 1px dashed black;
    &::before {
      content: attr(data-color-mode);
      min-width: 120px;
    }
  }
  > div:nth-child(1) div {
    --mix-mode: in lab;
  }
  > div:nth-child(2) div {
    --mix-mode: in oklab;
  }
  > div:nth-child(3) div {
    --mix-mode: in lch;
  }
  > div:nth-child(4) div {
    --mix-mode: in hsl;
  }
  > div:nth-child(5) div {
    --mix-mode: in srgb-linear;
  }
  > div:nth-child(6) div {
    --mix-mode: in xyz;
  }
  > div:nth-child(7) div {
    --mix-mode: in xyz-d50;
  }
  > div:nth-child(8) div {
    --mix-mode: in xyz-d65;
  }
  > div:nth-child(9) div {
    --mix-mode: in hwb;
  }
  > div:nth-child(10) div {
    --mix-mode: in oklch;
  }
  div > div {
    width: 100%;
    height: 100%;
    &:nth-child(1) {
      background: color-mix(
        var(--mix-mode),
        var(--mix-color-light),
        var(--base-color) 10%
      );
    }
    &:nth-child(2) {
      background: color-mix(
        var(--mix-mode),
        var(--mix-color-light),
        var(--base-color) 20%
      );
    }
    &:nth-child(3) {
      background: color-mix(
        var(--mix-mode),
        var(--mix-color-light),
        var(--base-color) 30%
      );
    }
    &:nth-child(4) {
      background: color-mix(
        var(--mix-mode),
        var(--mix-color-light),
        var(--base-color) 40%
      );
    }
    &:nth-child(5) {
      background: color-mix(
        var(--mix-mode),
        var(--mix-color-light),
        var(--base-color) 50%
      );
    }
    &:nth-child(6) {
      background: color-mix(
        var(--mix-mode),
        var(--mix-color-light),
        var(--base-color) 60%
      );
    }
    &:nth-child(7) {
      background: color-mix(
        var(--mix-mode),
        var(--mix-color-light),
        var(--base-color) 70%
      );
    }
    &:nth-child(8) {
      background: color-mix(
        var(--mix-mode),
        var(--mix-color-light),
        var(--base-color) 80%
      );
    }
    &:nth-child(9) {
      background: color-mix(
        var(--mix-mode),
        var(--mix-color-light),
        var(--base-color) 90%
      );
    }
    &:nth-child(9) {
      background: var(--base-color);
    }
  }
`;

function Test() {
  return (
    <Body>
      <DivHolder colorMode="oklab" />
      <DivHolder colorMode="lab" />
      <DivHolder colorMode="oklab" />
      <DivHolder colorMode="lch" />
      <DivHolder colorMode="hsl" />
      <DivHolder colorMode="srgb-linear" />
      <DivHolder colorMode="xyz" />
      <DivHolder colorMode="xyz-d50" />
      <DivHolder colorMode="xyz-d65" />
      <DivHolder colorMode="hwb" />
      <DivHolder colorMode="oklch" />
    </Body>
  );
}
const DivHolder = ({ colorMode }: { colorMode: string }) => {
  return (
    <div data-color-mode={colorMode}>
      <div id="mix1">10% </div>
      <div id="mix2">20% </div>
      <div id="mix3">30% </div>
      <div id="mix4">40% </div>
      <div id="mix5">50% </div>
      <div id="mix6">base </div>
      <div id="mix7">50% </div>
      <div id="mix8">40% </div>
      <div id="mix9">30% </div>
      <div id="mix10">20% </div>
      <div id="mix11">10%</div>
    </div>
  );
};

export default Test;

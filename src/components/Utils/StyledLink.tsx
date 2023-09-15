import { ComponentProps } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

type LinkTypes = "text" | "button";
type StyledLinkProps = ComponentProps<typeof Link> & {
  linkStyle?: "primary" | "secondary" | "tertiary" | "nav";
  linkType?: LinkTypes;
  inversed?: boolean;
  filled?: boolean;
};
const SLink = styled(Link)<StyledLinkProps>`
  --hover-background-color: var(--background-color);

  ${({ theme, ...p }) => {
    // return css`
    //   --text-color: ${styleHandler};
    //   --background-color: ${p.linkType === "button"
    //     ? theme.colors.primary["500"]
    //     : "transparent"};
    //   --hover-text-color: ${p.linkType === "button"
    //     ? theme.colors.secondary["200"]
    //     : theme.colors.primary["500"]};
    // `;
    return styleHandler(p.linkStyle || "primary", "text", p.linkType);
  }}
  color: var(--text-color);
  text-decoration: none;
  border: 1px solid var(--background-color);
  ${({ linkType }) =>
    linkType === "text" &&
    css`
      border: none;
    `};
  padding: ${({ linkType }: StyledLinkProps) =>
    linkType === "button" ? "10px" : "0"};
  border-radius: 5px;
  ${({ filled }) =>
    filled &&
    css`
      background: var(--background-color);
      color: var(--hover-text-color);
    `};
  text-align: center;
  &:hover {
    ${({ linkType }) =>
      linkType == "button" &&
      css`
        text-decoration: none;
      `};

    color: var(--hover-text-color);
    background: var(--hover-background-color);
    transition: 0.3s ease-out;
  }
`;
function StyledLink({
  linkType = "text",
  linkStyle = "primary",
  filled,
  ...props
}: StyledLinkProps) {
  console.log(linkType, linkStyle, filled);
  return (
    <SLink
      linkStyle={linkStyle}
      filled={filled ?? linkStyle == "nav"}
      linkType={linkType ?? linkStyle == "nav" ? "button" : "text"}
      {...props}
    />
  );
}

export default StyledLink;

function styleHandler(style: string, property: string, type?: LinkTypes) {
  switch (style) {
    case "primary":
      return css`
        --text-color: ${({ theme }) => theme.colors.primary["800"]};
        --background-color: ${({ theme }) => theme.colors.primary["500"]};
        --hover-text-color: ${({ theme }) => theme.colors.secondary["200"]};
      `;
    case "secondary":
      return css`
        --text-color: ${({ theme }) => theme.colors.primary["800"]};
        --background-color: transparent;
        --hover-text-color: ${({ theme }) => theme.colors.primary["500"]};
      `;
    case "tertiary":
      return css`
        --text-color: ${({ theme }) => theme.colors.primary["800"]};
        --background-color: transparent;
        --hover-text-color: ${({ theme }) => theme.colors.primary["500"]};
      `;
    case "nav":
      return css`
        display: flex;
        align-self: stretch;
        align-items: center;
        justify-content: center;
        max-height: 100%;
        border-radius: 0 !important;
        --text-color: ${({ theme }) => theme.colors.primary["800"]};
        --background-color: ${({ theme }) => theme.colors.secondary["400"]};
        --hover-text-color: ${({ theme }) => theme.colors.primary["500"]};
        --hover-background-color: ${({ theme }) =>
          theme.colors.secondary["100"]};
      `;
    default:
      return css`
        --text-color: ${({ theme }) => theme.colors.primary["800"]};
        --background-color: transparent;
        --hover-text-color: ${({ theme }) => theme.colors.primary["500"]};
      `;
  }
}

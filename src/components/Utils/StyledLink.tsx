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
  ${({ theme, ...p }) => {
    return css`
      --text-color: ${p.linkType === "button"
        ? theme.colors.primary["800"]
        : theme.colors.primary["800"]};
      --background-color: ${p.linkType === "button"
        ? theme.colors.primary["500"]
        : "transparent"};
      --hover-text-color: ${p.linkType === "button"
        ? theme.colors.secondary["200"]
        : theme.colors.primary["500"]};
    `;
  }}
  color: var(--text-color);
  text-decoration: none;
  border: 1px solid var(--background-color);
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
    ${({ filled }) =>
      !filled &&
      css`
        text-decoration: underline;
      `};

    color: var(--hover-text-color);
    background: var(--background-color);
    transition: 0.3s ease-out;
  }
`;
function StyledLink({ linkType = "text", ...props }: StyledLinkProps) {
  return <SLink linkType={linkType} {...props} />;
}

export default StyledLink;

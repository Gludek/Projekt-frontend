import styled from "styled-components";

const Body = styled.div`
  display: flex;
  width: 20rem;
  height: 20rem;
  border-radius: 2rem;
  position: relative;
  filter: grayscale(0);
  transition: all 0.3s ease-in-out;
  *:hover > &:not(:hover) {
    filter: grayscale(0.75);

    transform: scale(0.95);
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }
`;
const SImage = styled.img`
  object-fit: cover;
  object-position: center;
  position: absolute;

  width: 100%;
  height: 100%;
  border-radius: calc(2rem - 4px);
  border: 2px solid ${({ theme }) => theme.colors.primary["600"]};
`;

function ImageCard({ img }: { img: string }) {
  return (
    <Body>
      <SImage src={img} />
    </Body>
  );
}

export default ImageCard;

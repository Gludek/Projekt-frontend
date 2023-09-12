import styled from "styled-components";

const Body = styled.div`
  display: flex;
  width: 20rem;
  height: 20rem;
  border-radius: 2rem;
  overflow: hidden;
`;
const SImage = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
`;
function ImageCard() {
  return (
    <Body>
      <SImage src="https://images.unsplash.com/photo-1604654894610-df63bc536371" />
    </Body>
  );
}

export default ImageCard;

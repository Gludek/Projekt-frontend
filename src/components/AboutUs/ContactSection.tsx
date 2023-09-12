import styled from "styled-components";
import StyledLink from "../Utils/StyledLink";

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Map = styled.iframe`
  flex: 1;
  display: flex;
  border: 0;
  min-height: 30rem;
`;
const Info = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  font-size: 120%;
  gap: 20px;
  color: ${({ theme }) => theme.colors.primary["700"]};
  h4 {
    font-size: 120%;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary["600"]};
  }
  @media (max-width: 426px) {
    width: 100%;

    grid-template-columns: 1fr;
    gap: 0;
  }
`;
const Address = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  grid-row: 1/2;
  grid-column: 1/2;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
  div {
    display: flex;
    flex-direction: column;
    gap: 30px;

    p {
      line-height: 1.5;
    }
  }
`;
const Contact = styled.div`
  grid-row: 2/3;
  grid-column: 1/2;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span:first-child {
      font-weight: 700;
    }
  }
`;
const OpeningHours = styled.div`
  grid-row: 1/3;
  grid-column: 2/3;
  @media (max-width: 426px) {
    width: 100%;
    grid-row: 3/4;
    grid-column: 1/2;
  }
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  height: 100%;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span:first-child {
      font-weight: 700;
    }
  }
`;
function ContactSection() {
  return (
    <Body>
      <Map
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2423.8260826934197!2d14.64599957652256!3d52.59083627207985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470773145cce7081%3A0xc95e95d78349168!2sSalon%20Kosmetyczny%20%22Sekret%20Pi%C4%99kna%22%20Aneta%20Nadbrze%C5%BCna!5e0!3m2!1sen!2spl!4v1694177105885!5m2!1sen!2spl"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
      <Info>
        <Address>
          <h4>Adres</h4>
          <div>
            <p>
              Piastowska 8a
              <br />
              66-470 Kostrzyn nad Odrą
              <br />
              Polska
            </p>
            <StyledLink
              linkType="button"
              linkStyle="primary"
              inversed
              filled
              to="https://maps.google.com/maps/dir//Salon+Kosmetyczny+%22Sekret+Pi%C4%99kna%22+Aneta+Nadbrze%C5%BCna+Piastowska+8a+66-470+Kostrzyn+nad+Odr%C4%85/@52.5908363,14.6485745,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x470773145cce7081:0xc95e95d78349168"
            >
              Wyznacz trasę
            </StyledLink>
          </div>
        </Address>
        <Contact>
          <h4>Kontakt</h4>
          <div>
            <span>Telefon:</span>
            <a href="tel:+48609824011">609 824 011</a>
          </div>
          <div>
            <span>Email:</span>
            <a href="mailto:sekret.piekna1@op.pl">sekret.piekna1@op.pl</a>
          </div>
        </Contact>
        <OpeningHours>
          <h4>Godziny otwarcia</h4>
          <div>
            <span>pon.:</span>
            <span>08:00 - 19:00</span>
          </div>
          <div>
            <span>wt.:</span>
            <span>08:00 - 19:00</span>
          </div>
          <div>
            <span>śr.:</span>
            <span>08:00 - 19:00</span>
          </div>
          <div>
            <span>czw.:</span>
            <span>08:00 - 19:00</span>
          </div>
          <div>
            <span>pt.:</span>
            <span>08:00 - 19:00</span>
          </div>
          <div>
            <span>sob.:</span>
            <span>nieczynne</span>
          </div>
          <div>
            <span>niedz.:</span>
            <span>nieczynne</span>
          </div>
        </OpeningHours>
      </Info>
    </Body>
  );
}

export default ContactSection;

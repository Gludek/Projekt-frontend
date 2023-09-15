import styled from "styled-components";
import PostCard from "../../components/Posts/postCard";
import { Link } from "react-router-dom";
import ImageCard from "../../components/Image/ImageCard";
import ContactSection from "../../components/AboutUs/ContactSection";

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 50px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const PostList = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: auto;
  @media (max-width: 682px) {
    padding-bottom: 10px;
  }
`;
const GalleryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 30rem;
  flex: 1;
  > * {
    flex: 1;
    flex-basis: auto;
  }
  @media (max-width: 426px) {
    max-height: 50rem;
    overflow: auto;
    scrollbar-gutter: stable;
    padding-right: 10px;
  }
  gap: 20px;
`;
function Home() {
  return (
    <Body>
      <h1>Salon Kosmetyczny "Sekret Piękna" Aneta Nadbrzeżna</h1>
      <Section>
        <h2>Artykuły</h2>
        <PostCard
          title={"Test"}
          img={
            "https://images.unsplash.com/photo-1693508171201-95c6ac806960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          }
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis sit
          enim quam cum illum, incidunt porro consequuntur! Cum neque earum
          architecto molestiae amet provident explicabo! Debitis molestias quas
          ipsum iusto. Enim dolorem sunt praesentium ullam amet corrupti hic
          tenetur reiciendis aperiam nesciunt fuga, ex accusamus? Deserunt
          labore vel, quis sint impedit ut odit excepturi molestias sunt minima
          aliquam animi eos. Obcaecati, aut quos pariatur voluptatum eligendi
          labore, vel minus animi culpa, dolor delectus ipsa unde! Beatae, cum
          voluptatibus sit iste quos corporis molestias eligendi error ea eos
          illum, aut provident!
        </PostCard>
        <PostList>
          <PostCard
            minified
            title={"Test"}
            img={
              "https://images.unsplash.com/photo-1693508171201-95c6ac806960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            }
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis sit
            enim quam cum illum, incidunt porro consequuntur! Cum neque earum
            architecto molestiae amet provident explicabo! Debitis molestias
            quas ipsum iusto. Enim dolorem sunt praesentium ullam amet corrupti
            hic tenetur reiciendis aperiam nesciunt fuga, ex accusamus? Deserunt
            labore vel, quis sint impedit ut odit excepturi molestias sunt
            minima aliquam animi eos. Obcaecati, aut quos pariatur voluptatum
            eligendi labore, vel minus animi culpa, dolor delectus ipsa unde!
            Beatae, cum voluptatibus sit iste quos corporis molestias eligendi
            error ea eos illum, aut provident!
          </PostCard>
          <PostCard minified title={"Test"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis sit
            enim quam cum illum, incidunt porro consequuntur! Cum neque earum
            architecto molestiae amet provident explicabo! Debitis molestias
            quas ipsum iusto. Enim dolorem sunt praesentium ullam amet corrupti
            hic tenetur reiciendis aperiam nesciunt fuga, ex accusamus? Deserunt
            labore vel, quis sint impedit ut odit excepturi molestias sunt
            minima aliquam animi eos. Obcaecati, aut quos pariatur voluptatum
            eligendi labore, vel minus animi culpa, dolor delectus ipsa unde!
            Beatae, cum voluptatibus sit iste quos corporis molestias eligendi
            error ea eos illum, aut provident!
          </PostCard>
          <PostCard minified title={"Test"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis sit
            enim quam cum illum, incidunt porro consequuntur! Cum neque earum
            architecto molestiae amet provident explicabo! Debitis molestias
            quas ipsum iusto. Enim dolorem sunt praesentium ullam amet corrupti
            hic tenetur reiciendis aperiam nesciunt fuga, ex accusamus? Deserunt
            labore vel, quis sint impedit ut odit excepturi molestias sunt
            minima aliquam animi eos. Obcaecati, aut quos pariatur voluptatum
            eligendi labore, vel minus animi culpa, dolor delectus ipsa unde!
            Beatae, cum voluptatibus sit iste quos corporis molestias eligendi
            error ea eos illum, aut provident!
          </PostCard>
          <PostCard minified title={"Test"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis sit
            enim quam cum illum, incidunt porro consequuntur! Cum neque earum
            architecto molestiae amet provident explicabo! Debitis molestias
            quas ipsum iusto. Enim dolorem sunt praesentium ullam amet corrupti
            hic tenetur reiciendis aperiam nesciunt fuga, ex accusamus? Deserunt
            labore vel, quis sint impedit ut odit excepturi molestias sunt
            minima aliquam animi eos. Obcaecati, aut quos pariatur voluptatum
            eligendi labore, vel minus animi culpa, dolor delectus ipsa unde!
            Beatae, cum voluptatibus sit iste quos corporis molestias eligendi
            error ea eos illum, aut provident!
          </PostCard>
        </PostList>
        <Link to="/posts">Zobacz wszystkie</Link>
      </Section>
      <Section>
        <h2>Galeria</h2>
        <GalleryList>
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
        </GalleryList>
      </Section>
      <Section>
        <ContactSection />
      </Section>
    </Body>
  );
}

export default Home;

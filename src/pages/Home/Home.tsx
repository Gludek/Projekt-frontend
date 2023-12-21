import styled from "styled-components";
import PostCard from "../../components/Posts/postCard";
import { Link } from "react-router-dom";
import ImageCard from "../../components/Image/ImageCard";
import ContactSection from "../../components/AboutUs/ContactSection";
import { useGetPosts } from "@/API/hooks/PostHooks";
import { useGetImages } from "@/API/hooks/GalleryHooks";

const Body = styled.div`
  width: 100%;
  display: flex;
  gap: 50px;
  flex-direction: column;
  align-items: center;
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  flex-direction: row;
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
  const postQuery = useGetPosts({ limit: 5 });
  const posts = postQuery.data?.data ?? [];
  posts?.map((post) => {
    let desc = post.description;
    post.pictures.forEach((_pic: string, i: number) => {
      desc = desc.replace(`</p>{img:${i}}<p>`, ``);
    });
    desc.replace("<p></p>", "");
    post.description = desc;
    return post;
  });
  const firstPost = posts[0];
  const postList = posts.slice(1, posts.length);
  const imageQuery = useGetImages(8);
  const images = imageQuery.data?.data ?? [];
  return (
    <Body>
      <h1>Salon Kosmetyczny "Sekret Piękna" Aneta Nadbrzeżna</h1>
      <Section>
        <h2>Artykuły</h2>
        {postQuery.isLoading ? (
          <div>Loading...</div>
        ) : posts.length > 0 && postQuery.isSuccess ? (
          <>
            <PostCard
              postId={firstPost.id}
              title={firstPost.title}
              img={firstPost.pictures[0]}
            >
              {firstPost.description}
            </PostCard>

            <PostList>
              {postList.map((post) => {
                return (
                  post && (
                    <PostCard
                      minified
                      postId={post.id}
                      key={post.id}
                      title={post.title}
                      img={post.pictures[0]}
                    >
                      {post.description}
                    </PostCard>
                  )
                );
              })}
            </PostList>
            <Link to="/posts">Zobacz wszystkie</Link>
          </>
        ) : (
          <div>Brak artykułów</div>
        )}
      </Section>
      <Section>
        <h2>Galeria</h2>
        <GalleryList>
          {imageQuery.isLoading ? (
            <div>Loading...</div>
          ) : images.length > 0 ? (
            images.map((image) => {
              return image && <ImageCard key={image.id} img={image.url} />;
            })
          ) : (
            <div>Brak zdjęć</div>
          )}
        </GalleryList>
      </Section>
      <Section>
        <ContactSection />
      </Section>
    </Body>
  );
}

export default Home;

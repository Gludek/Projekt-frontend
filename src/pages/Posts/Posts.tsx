import PostCard from "@/components/Posts/postCard";
import styled from "styled-components";
import { useContext } from "react";
import { userContext } from "@/API/apiClient";
import Button from "@/components/Utils/StyledButton";
import { useGetPosts } from "@/API/hooks/PostHooks";
import TitledModal from "@/components/Modal/TitledModal";
import StyledLink from "@/components/Utils/StyledLink";

const Body = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
`;
const PostList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;
`;
const ControlRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  width: 100%;
  padding: 10px;
`;
function Posts() {
  const postsQuery = useGetPosts();
  const posts = postsQuery.data?.data ?? [];
  const firstPost = posts.shift();
  const { currentUser } = useContext(userContext);
  return (
    <Body>
      <h1>Artykuły</h1>
      {currentUser?.permissions?.includes("admin") && (
        <ControlRow>
          <StyledLink linkType="button" to="/posts/new">
            Dodaj nowy artykuł
          </StyledLink>
        </ControlRow>
      )}
      {firstPost && (
        <PostCard title={firstPost.title} img={firstPost.picture}>
          {firstPost.description}
        </PostCard>
      )}
      <PostList>
        {posts.map((post) => {
          return (
            post && (
              <PostCard
                minified
                key={post.id}
                title={post.title}
                img={post.picture}
              >
                {post.description}
              </PostCard>
            )
          );
        })}
      </PostList>
    </Body>
  );
}

export default Posts;

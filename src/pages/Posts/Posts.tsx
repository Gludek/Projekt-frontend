import PostCard from "@/components/Posts/postCard";
import styled from "styled-components";
import { useContext } from "react";
import { userContext } from "@/API/apiClient";
import { useGetPosts } from "@/API/hooks/PostHooks";
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
  if (postsQuery.isLoading) return <div>Loading...</div>;
  posts.map((post) => {
    let desc = post.description;
    post.pictures.forEach((_pic: string, i: number) => {
      desc = desc.replace(`{img:${i}}`, ``);
    });
    post.description = desc;
    return post;
  });
  const firstPost = posts[0];
  const postList = posts.slice(1, posts.length);
  const { currentUser } = useContext(userContext);
  console.log(posts);
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
        <PostCard
          postId={firstPost.id}
          title={firstPost.title}
          img={firstPost.pictures[0]}
        >
          {firstPost.description}
        </PostCard>
      )}
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
    </Body>
  );
}

export default Posts;

import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiClient } from "../apiClient";

export const useGetPosts = (
  params?: Parameters<typeof ApiClient.getPosts>[0]
) => {
  params;
  // ^?
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: () => ApiClient.getPosts(params),
  });
  return query;
};
export const useGetPost = (id: number) => {
  const query = useQuery({
    queryKey: ["posts", id],
    queryFn: () => ApiClient.getPost(id),
  });
  return query;
};
export const useCreatePost = () => {
  const query = useMutation({
    mutationKey: ["posts"],
    mutationFn: (post: FormData) => ApiClient.createPost(post),
  });
  return query;
};

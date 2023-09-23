import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../apiClient";

export const useGetPosts = () => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: () => ApiClient.getPosts(),
  });
  return query;
};

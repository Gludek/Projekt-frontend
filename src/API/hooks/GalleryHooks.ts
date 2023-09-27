import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../apiClient";

export const useGetImages = (limit?: number) => {
  const query = useQuery({
    queryKey: ["images"],
    queryFn: () => ApiClient.getImages(limit),
  });
  return query;
};

import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../apiClient";

export const useTest = () => {
  const query = useQuery({
    queryKey: ["test"],
    queryFn: () => ApiClient.getTest(),
  });

  return query;
};

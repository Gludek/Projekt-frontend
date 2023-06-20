import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "./apiClient";

export const GetTokenValidity = () => {
  const query = useQuery({
    queryKey: ["token_validity"],
    queryFn: () =>
      ApiClient.getTestAuth()
        .then((res) => res.status === 200)
        .catch(() => false),
  });
  return (query.isFetched ? query.data : false) as boolean;
};

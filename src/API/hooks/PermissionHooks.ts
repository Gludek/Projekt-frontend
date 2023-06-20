import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../apiClient";

export const useGetPermissions = () => {
  const query = useQuery({
    queryKey: ["permissions"],
    queryFn: () => ApiClient.getPermissions(),
  });
  console.log(query.data);
  return query;
};

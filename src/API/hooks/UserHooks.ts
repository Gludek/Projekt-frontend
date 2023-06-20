import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../apiClient";
import { User, UserLogin, UserRegister } from "../types/user";

/**
 * Custom hook for getting current user data
 * @returns User object with current user data
 */
export const useMe = () => {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: () => ApiClient.me(),
  });

  return query.data?.data.data as User;
};

/**
 * Function for getting users data
 * @param number - optional parameter for limiting the number of users returned
 * @returns query object with users data
 */
export const useGetUsers = (number?: number) => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => ApiClient.getUsers(number),
  });
  console.log(query.status);
  return query;
};

export const useGetUser = (id: number) => {
  const query = useQuery({
    queryKey: ["user", id],
    queryFn: () => ApiClient.getUser(id),
  });
  console.log(query.data?.data);
  return query;
};

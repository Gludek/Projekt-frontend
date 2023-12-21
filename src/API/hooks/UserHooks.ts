import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiClient } from "../apiClient";
import { User, UserLogin, UserRegister } from "../types/user";
import { AxiosError } from "axios";

/**
 * Custom hook for getting current user data
 * @returns User object with current user data
 */
export const useMe = () => {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: () => ApiClient.me(),
    retry: (fC, error: AxiosError) => {
      return error?.response?.status === 401 ? false : true;
    },
  });
  return query;
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
    queryKey: ["users", id],
    queryFn: () => ApiClient.getUser(id),
  });
  console.log(query.data?.data);
  return query;
};

export const useUpdateUser = () => {
  const mutation = useMutation({
    mutationKey: ["users"],
    mutationFn: (user: FormData) => ApiClient.updateUser(user),
  });
  return mutation;
};

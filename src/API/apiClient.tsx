import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User, UserLogin, UserRegister } from "./types/user";
import { createContext } from "react";

export const queryClient = new QueryClient();
export const userContext = createContext<{
  currentUser: User | null;
  login: (res: any) => void;
}>({ currentUser: null, login: () => {} });
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

export class ApiClient {
  private static getToken() {
    return localStorage.getItem("token");
  }
  static async getTest() {
    return axiosInstance.get("/test", {}).then((res) => console.log(res));
  }
  static async getTestAuth() {
    return axiosInstance
      .get("/test_auth", {
        headers: {
          Authorization: this.getToken(),
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      });
  }
  static async login(user: UserLogin) {
    queryClient.invalidateQueries({ queryKey: ["token_validity"] });
    queryClient.invalidateQueries({ queryKey: ["me"] });
    const query = queryClient.fetchQuery({
      queryKey: ["token_validity"],
      queryFn: async () => {
        const { data, headers } = await axiosInstance.post("/login", {
          user,
        });
        localStorage.setItem("token", headers.authorization);
        return data;
      },
    });
    return query;
  }

  static async register(user: UserRegister) {
    return axiosInstance
      .post("/signup", { user })
      .then((res) => res)
      .catch((err) => err.response);
  }

  static async me() {
    return axiosInstance
      .get("/me", {
        headers: {
          Authorization: this.getToken(),
        },
      })
      .then((res) => res)
      .catch((err) => err.response);
  }

  static async logout() {
    const query = queryClient.fetchQuery({
      queryKey: ["token_validity"],
      queryFn: async () => {
        const { data } = await axiosInstance.delete("/logout", {
          headers: {
            Authorization: this.getToken(),
          },
        });
        return data;
      },
    });
    return query;
  }

  static async getUsers(number?: number) {
    return axiosInstance
      .get<User[]>(`/users${number ? `?number=${number}` : ""}`, {
        headers: {
          Authorization: this.getToken(),
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      });
  }
  static async getUser(id: number) {
    return axiosInstance
      .get(`/users/${id}`, {
        headers: {
          Authorization: this.getToken(),
        },
      })
      .then((res) => res)
      .catch((err) => err.response);
  }
  static async updateUser(id: number, user: UserRegister) {
    return axiosInstance.put(
      `/users/${id}`,
      { user },
      {
        headers: {
          Authorization: this.getToken(),
        },
      }
    );
  }

  static async deleteUser(id: number) {
    return axiosInstance.delete(`/users/${id}`, {
      headers: {
        Authorization: this.getToken(),
      },
    });
  }

  static async getPermissions() {
    return axiosInstance.get(`/permissions`, {
      headers: {
        Authorization: this.getToken(),
      },
    });
  }
  static async getServices() {
    return axiosInstance.get(`/services`, {
      headers: {
        Authorization: this.getToken(),
      },
    });
  }
}

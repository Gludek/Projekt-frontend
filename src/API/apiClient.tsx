import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User, UserLogin, UserRegister } from "./types/user";
import { createContext } from "react";

export const queryClient = new QueryClient();
export const userContextProvider = createContext<User | undefined>(undefined);

export class ApiClient {
  private static getToken() {
    return localStorage.getItem("token");
  }
  static async getTest() {
    return axios
      .get("http://localhost:3001/test", {})
      .then((res) => console.log(res));
  }
  static async getTestAuth() {
    return axios
      .get("http://localhost:3001/test_auth", {
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
    return axios
      .post("http://localhost:3001/login", { user })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.headers.authorization);
        }
        return res;
      })
      .catch((err) => err.response);
  }

  static async register(user: UserRegister) {
    return axios
      .post("http://localhost:3001/signup", { user })
      .then((res) => res)
      .catch((err) => err.response);
  }

  static async me() {
    return axios
      .get("http://localhost:3001/me", {
        headers: {
          Authorization: this.getToken(),
        },
      })
      .then((res) => res)
      .catch((err) => err.response);
  }

  static async logout() {
    queryClient.invalidateQueries({ queryKey: ["token_validity"] });
    queryClient.invalidateQueries({ queryKey: ["me"] });
    localStorage.removeItem("token");
    return axios
      .delete("http://localhost:3001/logout")
      .then((res) => res)
      .catch((err) => err.response);
  }

  static async getUsers(number?: number) {
    return axios
      .get(`http://localhost:3001/users${number ? `?number=${number}` : ""}`, {
        headers: {
          Authorization: this.getToken(),
        },
      })
      .then((res) => res)
      .catch((err) => err.response);
  }
  static async getUser(id: number) {
    return axios
      .get(`http://localhost:3001/users/${id}`, {
        headers: {
          Authorization: this.getToken(),
        },
      })
      .then((res) => res)
      .catch((err) => err.response);
  }
  static async updateUser(id: number, user: UserRegister) {
    return axios.put(
      `http://localhost:3001/users/${id}`,
      { user },
      {
        headers: {
          Authorization: this.getToken(),
        },
      }
    );
  }

  static async deleteUser(id: number) {
    return axios.delete(`http://localhost:3001/users/${id}`, {
      headers: {
        Authorization: this.getToken(),
      },
    });
  }

  static async getPermissions() {
    return axios.get(`http://localhost:3001/permissions`, {
      headers: {
        Authorization: this.getToken(),
      },
    });
  }
}

import { User, Role } from "@/types/user";

export const UserService = {
  async getUsers(): Promise<User[]> {
    const response = await fetch("/api/users");
    if (!response.ok) throw new Error("FETCH_USERS_ERROR");
    return response.json();
  },

  async addUser(userData: Omit<User, "id">): Promise<User> {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("ADD_USER_ERROR");
    return response.json();
  },

  async updateUser(id: string, updates: { role: Role; permissions: string[] }): Promise<User> {
    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("UPDATE_USER_ERROR");
    return response.json();
  },

  async deleteUser(id: string): Promise<string> {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("DELETE_USER_ERROR");
    const data = await response.json();
    return data.id;
  },
};

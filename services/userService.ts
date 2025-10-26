import { User, UserListResponse, UserQuery } from "@/types/user.type";
import apiService from "./apiService";

class UserService {
  private endpoint = "/users";

  async getAll(query?: UserQuery): Promise<UserListResponse> {
    try {
      const res = await apiService.get<UserListResponse>(this.endpoint, {
        params: query,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string | number): Promise<User> {
    try {
      const res = await apiService.get<User>(`${this.endpoint}/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async create(
    userData: Omit<User, "id">
  ): Promise<User> {
    try {
      const response = await apiService.post<User>(
        this.endpoint,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async update(
    id: string | number,
    userData: Partial<User>
  ): Promise<User> {
    try {
      const response = await apiService.patch<User>(
        `${this.endpoint}/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string | number): Promise<{ message: string }> {
    try {
      const response = await apiService.delete<{ message: string }>(
        `${this.endpoint}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }

  async search(keyword: string): Promise<User[]> {
    try {
      const response = await apiService.get<User[]>(
        `${this.endpoint}/search`,
        {
          params: { q: keyword },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  }
}

const userService = new UserService();
export default userService;

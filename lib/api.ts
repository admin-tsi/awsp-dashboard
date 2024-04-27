import axios from "axios";
import { User } from "@/lib/types";

export async function fetchAllUsers(
  token: string | undefined,
): Promise<User[]> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";

  try {
    const response = await axios.get<User[]>(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while fetching users",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function deleteUser(
  userId: string,
  token: string | undefined,
): Promise<void> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";

  try {
    await axios.delete(`${baseUrl}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An error occurred while deleting user",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

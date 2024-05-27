import axios from "axios";
import { Microcredential, User } from "@/lib/types";

export async function getAllUsers(token: string | undefined): Promise<User[]> {
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

export async function getUserById(
  userId: string,
  token: string | undefined,
): Promise<User> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";

  try {
    const response = await axios.get<User>(`${baseUrl}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while fetching user by ID",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function getAllMicrocredentials(
  token: string | undefined,
): Promise<Microcredential[]> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    const response = await axios.get<Microcredential[]>(
      `${baseUrl}/microcredentials`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while fetching microcredentials",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function getMicrocredentialById(
  id: string,
  token: string | undefined,
): Promise<Microcredential> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    const response = await axios.get<Microcredential>(
      `${baseUrl}/microcredentials/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while fetching microcredential by ID",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function updateMicrocredential(
  id: string,
  data: any,
  token: string | undefined,
): Promise<void> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    await axios.put(`${baseUrl}/microcredentials/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while updating microcredential",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function updateMicrocredentialThumbnail(
  id: string,
  file: File,
  token: string | undefined,
): Promise<void> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  const formData = new FormData();
  formData.append("thumbnail", file);
  try {
    await axios.put(`${baseUrl}/microcredentials/thumbnail/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while updating microcredential thumbnail",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function updateModule(
  id: string,
  data: any,
  token: string | undefined,
): Promise<void> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    await axios.patch(`${baseUrl}/modules/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while updating modules",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function createModule(
  id: string,
  data: any,
  token: string | undefined,
): Promise<void> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    await axios.post(`${baseUrl}/modules/microcredential/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while creating modules",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function deleteModule(
  id: string,
  token: string | undefined,
): Promise<void> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    await axios.delete(`${baseUrl}/modules/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while deleting module",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function updateCourseById(
  id: string,
  data: any,
  token: string | undefined,
): Promise<void> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    await axios.patch(`${baseUrl}/courses/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while updating module by ID",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function updateQuizById(
  id: string,
  data: any,
  token: string | undefined,
): Promise<void> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    await axios.patch(`${baseUrl}/quizzes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while updating quiz by ID",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

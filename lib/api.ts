import axios from "axios";
import {
  Course,
  Microcredential,
  ModuleDetails,
  Quizz,
  User,
} from "@/lib/types";

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
    await axios.patch(`${baseUrl}/microcredentials/${id}`, data, {
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
  microcredentialId: string,
  data: any,
  token: string | undefined,
): Promise<ModuleDetails> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    const response = await axios.post<ModuleDetails>(
      `${baseUrl}/modules/microcredential/${microcredentialId}`,
      data,
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
          "An error occurred while creating the module",
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

export async function getCourseById(
  id: string,
  token: string | undefined,
): Promise<any> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    const response = await axios.get(`${baseUrl}/courses/${id}`, {
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
          "An error occurred while fetching course by ID",
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

export async function updateCourseFiles(
  id: string,
  files: File[],
  token: string | undefined,
): Promise<void> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("course_files", file);
  });

  try {
    await axios.patch(`${baseUrl}/courses/courses_files/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while updating course files",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function deleteQuestionInQuiz(
  quizId: string,
  questionId: string,
  token: string | undefined,
): Promise<void> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    await axios.delete(`${baseUrl}/quizzes/${quizId}/questions/${questionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while deleting question",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function deleteFileInCourse(
  courseId: string,
  file: string,
  token: string | undefined,
): Promise<void> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    await axios.delete(`${baseUrl}/courses/${courseId}/file`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { file },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An error occurred while deleting file",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function createCourseInModule(
  id: string,
  data: Partial<Course>,
  token: string | undefined,
): Promise<Course> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    const response = await axios.post<Course>(
      `${baseUrl}/courses/module/${id}`,
      data,
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
          "An error occurred while creating course in module",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function createQuizInModule(
  id: string,
  data: Partial<Quizz>,
  token: string | undefined,
): Promise<Quizz> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    const response = await axios.post<Quizz>(
      `${baseUrl}/quizzes/module/${id}`,
      data,
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
          "An error occurred while creating quiz in module",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function getQuizByAdmin(
  id: string,
  token: string | undefined,
): Promise<Quizz> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    const response = await axios.get<Quizz>(`${baseUrl}/quizzes/${id}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An error occurred while fetching quiz",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function addQuestionInQuiz(
  quizId: string,
  data: any,
  token: string | undefined,
): Promise<void> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    await axios.post(`${baseUrl}/quizzes/${quizId}/questions`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while adding question",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function updateQuestionAnswer(
  quizId: string,
  questionId: string,
  data: any,
  token: string | undefined,
): Promise<void> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    await axios.patch(
      `${baseUrl}/quizzes/${quizId}/questions/${questionId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while updating question answer",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function deleteQuestionInQuizz(
  quizId: string,
  questionId: string,
  token: string | undefined,
): Promise<void> {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    await axios.delete(`${baseUrl}/quizzes/${quizId}/questions/${questionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while deleting question in quiz",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

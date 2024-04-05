import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function createUser(userData) {
  const response = await fetch(`https://localhost:8000/user/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while creating the user");
    error.code = response.status;
    error.info = await response.json();

    throw error;
  }

  return await response.json();
}

export async function logIn(userData) {
  const response = await fetch(`https://localhost:8000/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while log in");
    error.code = response.status;
    error.info = await response.json();

    throw error;
  }

  return await response.json();
}

export async function logOut() {
  const response = await fetch(`https://localhost:8000/user/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while log in");
    error.code = response.status;
    error.info = await response.json();

    throw error;
  }

  return await response.json();
}

export async function fetchPosts({ signal, id, pageParam, limit }) {
  const params = [];
  if (id !== undefined && id !== null) params.push(`id=${id}`);
  if (pageParam !== undefined && pageParam !== null)
    params.push(`pageParam=${pageParam}`);
  if (limit !== undefined && limit !== null) params.push(`limit=${limit}`);

  const url = "https://localhost:8000/post?" + params.join("&");

  const response = await fetch(url, { signal: signal, credentials: "include" });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the posts");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}

export async function createPost(postData) {
  const response = await fetch(`https://localhost:8000/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while creating the post");
    error.code = response.status;
    error.info = await response.json();

    throw error;
  }

  return await response.json();
}

export async function deletePost({ id }) {
  const response = await fetch(`https://localhost:8000/post/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting the post");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

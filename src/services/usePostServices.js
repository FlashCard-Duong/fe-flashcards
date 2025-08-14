export const createPost = async (formData, sendRequest) => {
  try {
    const response = await sendRequest("/posts", "post", formData, {
      headers: { "Content-Type": "application/json" },
    });
    // if (response?.status !== 201) throw new Error(response?.data?.message);

    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const getHomePosts = async (page = 1, limit = 10, sendRequest) => {
  try {
    const response = await sendRequest(`/posts?page=${page}?limit=${limit}`);

    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const getSavedPosts = async (
  page = 1,
  limit = 15,
  sendRequest
) => {
  try {
    const response = await sendRequest(
      `/posts/saved?page=${page}?limit=${limit}`
    );

    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const savePost = async (postId, isSave, sendRequest) => {
  try {
    const response = await sendRequest(
      `/posts/${postId}`,
      "post",
      { save: isSave },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const deletePost = async (postId, sendRequest) => {
  try {
    const response = await sendRequest(`/posts/${postId}`, "delete", {
      headers: { "Content-Type": "application/json" },
    });

    return response?.data;
  } catch (err) {
    throw err;
  }
};
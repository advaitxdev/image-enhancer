import axios from "axios";

const API_KEY = "wxzg5qbnkyjcagdcd";

const BASE_URL = "https://techhk.aoscdn.com";

export const enhanceImageAPI = async (file) => {
  //calling the api and getting enhanced image

  try {
    const taskId = await uploadImage(file);

    const enhancedImageData = await PollForEnhancedImage(taskId);

    return enhancedImageData;
  } catch (error) {
    console.error("Error enhancing image:", error.message);
  }
};

const uploadImage = async (file) => {
  //uploading image to api
  // /api/tasks/visual/scale
  const formData = new FormData();
  formData.append("image_file", file);

  const { data } = await axios.post(
    `${BASE_URL}/api/tasks/visual/scale`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-Key": API_KEY,
      },
    }
  );
  if (!data?.data?.task_id) {
    throw new Error("Failed to upload image! Task id not receieved.");
  }
  return data.data.task_id;
};

const fetchEnhancedImage = async (taskId) => {
  //fetching enhanced image from api
  //
  const { data } = await axios.get(
    `${BASE_URL}/api/tasks/visual/scale/${taskId}`,

    {
      headers: {
        "X-API-Key": API_KEY,
      },
    }
  );
  if (!data?.data) {
    throw new Error("Failed to fetch enhanced image! Image not recieved.");
  }
  return data.data;
};

const PollForEnhancedImage = async (taskId, retries = 0) => {
  const result = await fetchEnhancedImage(taskId);

  if (result.state === 4) {
    console.log("Processing...");

    if (retries >= 20) {
      throw new Error("Max retries reached. Enhanced image not available.");
    }

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying

    return PollForEnhancedImage(taskId, retries + 1);
  }
  console.log(result);
  return result;
};

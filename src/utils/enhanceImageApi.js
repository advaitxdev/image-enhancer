const API_KEY = "wxzg5qbnkyjcagdcd";

const BASE_URL = "https://techhk.aoscdn.com/"

export const enhanceImageAPI = async (file) => { 
    //calling the api and getting enhanced image

    try {
        const taskId = await uploadImage(file);

        const enhancedImageData = await fetchEnhancedImage(taskId);
    } catch (error) {
        console.error("Error enhancing image:", error.message);
        
        
    }
}

const uploadImage = async (file) => {
    //uploading image to api
    // /api/tasks/visual/scale
    const formData = new FormData();
    formData.append("file", file);

    await axios
    return taskId
}

const fetchEnhancedImage = async (taskId) => {
    //fetching enhanced image from api
    // /api/tasks/visual/scale/{task_id}
}
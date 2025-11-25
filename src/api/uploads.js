import API from "./client";

export const uploadFileToApi = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  return API.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onProgress) onProgress(Math.round((e.loaded * 100) / e.total));
    },
  });
};

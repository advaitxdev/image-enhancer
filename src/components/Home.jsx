import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";

const Home = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const UploadImageHandler = async (file) => {
    setUploadImage(URL.createObjectURL(file));
    setLoading(true);

    try {
      const enhancedURL = await enhanceImageAPI(file);
      setEnhancedImage(enhancedURL);
      setLoading(false)
    } catch (error) {
      
    }
  }

  return (
    <>
      <ImageUpload UploadImageHandler={UploadImageHandler } />
      <ImagePreview
        loading={loading}
        uploaded={uploadImage}
        enhanced={enhancedImage}
      />
    </>
  );
};

export default Home;

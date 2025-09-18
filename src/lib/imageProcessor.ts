import { removeBackground } from "@imgly/background-removal";

export interface ProcessingResult {
  processedImageUrl: string;
  error?: string;
}

export const processImage = async (file: File): Promise<ProcessingResult> => {
  try {
    // Remove background using @imgly/background-removal
    const blob = await removeBackground(file);

    // Convert blob to data URL
    const processedImageUrl = URL.createObjectURL(blob);

    return { processedImageUrl };
  } catch (error) {
    console.error("Error processing image:", error);
    return {
      processedImageUrl: "",
      error:
        "Failed to process image. Please try again with a different image.",
    };
  }
};

export const validateImageFile = (file: File): string | null => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    return "Please upload a valid image file (JPG, PNG, or WEBP).";
  }

  if (file.size > maxSize) {
    return "Image size must be less than 10MB.";
  }

  return null;
};

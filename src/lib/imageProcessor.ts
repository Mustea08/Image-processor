import { removeBackground } from "@imgly/background-removal";

export interface ProcessingResult {
  processedImageUrl: string;
  error?: string;
}

export const processImage = async (
  file: File,
  options?: { removeBackground?: boolean }
): Promise<ProcessingResult> => {
  try {
    const shouldRemoveBg = options?.removeBackground ?? true;

    const inputBlob = shouldRemoveBg ? await removeBackground(file) : file;

    const webpBlob = await convertToWebP(inputBlob);

    // Create object URL for the processed image
    const processedImageUrl = URL.createObjectURL(webpBlob);

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

const convertToWebP = async (blob: Blob): Promise<Blob> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx?.drawImage(img, 0, 0);
      }

      canvas.toBlob(
        (webpBlob) => {
          resolve(webpBlob!);
        },
        "image/webp",
        0.95
      );
    };
    img.src = URL.createObjectURL(blob);
  });
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

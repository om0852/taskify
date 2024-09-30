"use client";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

interface UnsplashImage {
  id: string;
  urls: {
    thumb: string;
    full: string;
  };
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (result && result.response) {
          const newImages = result.response as UnsplashImage[];
          setImages(newImages);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        toast.error("Check your internet connection.");
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImage();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
          >
            <Image
              src={image.urls.thumb}
              fill
              alt={`Unsplash image ${image.id}`}
              className="object-cover rounded-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

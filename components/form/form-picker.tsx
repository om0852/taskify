"use client";
import { defaultImages } from "@/constants/images";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { FormErrors } from "./FormError";
import { Random } from "unsplash-js/dist/methods/photos/types";

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
  const [images, setImages] = useState<Random[]>(defaultImages);
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
          const newImages = result.response as Random[];
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
            <input type="radio" id={id} name={id} className="hidden" checked={selectedImageId==image.id} disabled={pending} value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}/>
            <Image
              src={image.urls.thumb}
              fill
              alt={`Unsplash image ${image.id}`}
              className="object-cover rounded-sm"
              />
              {selectedImageId===image.id &&(
                <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white"/>
                </div>
              )}
            <Link
              href={image.urls.full}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/10"
            >{image.user.name}</Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" error={errors}/>
    </div>
  );
};

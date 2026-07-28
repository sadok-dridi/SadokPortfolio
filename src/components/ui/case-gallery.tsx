'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export function CaseGallery({ photos, color = "#06b6d4" }: { photos: GalleryPhoto[]; color?: string }) {
  const [index, setIndex] = useState(-1);
  const close = () => {
    setIndex(-1);
    requestAnimationFrame(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  };

  if (photos.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="rounded-xl cursor-pointer transition-shadow duration-500 hover:ring-2 focus:ring-0 focus-visible:ring-0"
            style={{ outline: 'none', '--tw-ring-color': color } as React.CSSProperties}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-auto w-full rounded-xl"
              draggable={false}
            />
          </button>
        ))}
      </div>
      <style>{`
        .yarl__root,
        .yarl__container,
        .yarl__portal,
        .yarl__carousel,
        .yarl__slide,
        .yarl__slide > * {
          cursor: default !important;
        }
        .yarl__button,
        .yarl__button * {
          cursor: pointer !important;
        }
      `}</style>
      <Lightbox
        open={index >= 0}
        index={index}
        close={close}
        slides={photos}
        carousel={{ padding: 80 }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.9)" },
          slide: { borderRadius: "12px" },
        }}
      />
    </>
  );
}

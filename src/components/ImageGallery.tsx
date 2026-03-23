"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFullscreenIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFullscreenIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Removed overflow-hidden from the container so 3D shadows don't get clipped */}
      <div className="relative group rounded-xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-[0_0_50px_-15px_rgba(6,182,212,0.2)] flex justify-center py-12 px-4 mb-10">
        
        {/* The 3D Cube Swiper */}
        <div className="w-full max-w-[500px] aspect-[16/10] relative perspective-[1000px]">
          <Swiper
            effect={"cube"}
            grabCursor={true}
            speed={800}
            loop={true} // Infinite spinning!
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 30,
              shadowScale: 0.9,
            }}
            pagination={{ clickable: true }}
            autoplay={{ 
              delay: 4000,
              disableOnInteraction: true 
            }}
            modules={[EffectCube, Pagination, Autoplay]}
            className="w-full h-full rounded-lg"
            onSlideChange={(swiper) => setFullscreenIndex(swiper.realIndex)}
            // Swiper's native onClick perfectly distinguishes between a drag and a deliberate click!
            onClick={() => setIsFullscreen(true)} 
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx} className="rounded-lg overflow-hidden border border-zinc-700/50 group/slide bg-zinc-900/50">
                <Image
                  src={img}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  // Removed pointer-events-none so it registers touch/click, but added draggable={false} to stop browser ghost-dragging
                  className="object-cover select-none" 
                  draggable={false}
                  unoptimized
                />
                
                {/* Clean Expand Icon (No pointer events so it never blocks dragging) */}
                <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 opacity-0 transition-all duration-300 group-hover/slide:opacity-100 group-hover/slide:scale-110 pointer-events-none">
                  <Maximize2 size={18} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={() => setIsFullscreen(false)}
          >
            <button 
              className="absolute top-6 right-6 p-3 rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 transition-colors z-50"
              onClick={() => setIsFullscreen(false)}
            >
              <X size={24} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-[90vw] h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[fullscreenIndex]}
                alt={`Fullscreen image`}
                fill
                className="object-contain select-none"
                draggable={false}
                unoptimized
              />

              {images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrev}
                    className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 p-4 text-zinc-500 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={40} />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 p-4 text-zinc-500 hover:text-white transition-colors"
                  >
                    <ChevronRight size={40} />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
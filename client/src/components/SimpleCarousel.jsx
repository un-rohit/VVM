import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SimpleCarousel({ children, className = "" }) {
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const items = Children.toArray(children);

  const updateButtons = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    requestAnimationFrame(() => {
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      setCanScrollLeft(scroller.scrollLeft > 5);
      setCanScrollRight(scroller.scrollLeft < maxScrollLeft - 5);
    });
  }, []);

  useEffect(() => {
    updateButtons();

    const scroller = scrollerRef.current;
    if (!scroller) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateButtons();
          ticking = false;
        });
        ticking = true;
      }
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateButtons, { passive: true });

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons]);

  const scroll = useCallback((direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const firstItem = scroller.querySelector("[data-carousel-item]");
    const gap = 24;

    const scrollAmount = firstItem
      ? firstItem.offsetWidth + gap
      : scroller.clientWidth;

    scroller.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  }, []);

  if (!items.length) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={scrollerRef}
        className={`
          flex gap-6 overflow-x-auto scroll-smooth pb-5
          snap-x snap-mandatory overscroll-x-contain
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          ${className}
        `}
      >
        {items.map((child, index) => (
          <div
            key={index}
            data-carousel-item
            className="
              min-w-[85%] snap-start
              sm:min-w-[48%]
              lg:min-w-[48%]
            "
          >
            {child}
          </div>
        ))}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => scroll(-1)}
          className="
            absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2
            place-items-center rounded-full bg-white text-primary shadow-card
            transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white
            active:scale-95
          "
        >
          <ChevronLeft />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => scroll(1)}
          className="
            absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2
            place-items-center rounded-full bg-white text-primary shadow-card
            transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white
            active:scale-95
          "
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
}

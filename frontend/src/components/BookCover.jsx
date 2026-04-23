export default function BookCover({ size = "lg", className = "", variant = "3d" }) {
  const sizes = {
    sm: "w-40 sm:w-48 md:w-56",
    md: "w-56 sm:w-64 md:w-72",
    lg: "w-64 sm:w-80 md:w-[340px]",
    xl: "w-[260px] sm:w-[320px] md:w-[400px] lg:w-[460px]",
  };

  const src =
    variant === "flat"
      ? "/assets/images/book-flat.jpg"
      : "/assets/images/book-3d.jpg";

  return (
    <div
      className={`relative ${sizes[size]} ${className}`}
      data-testid="book-cover-mockup"
    >
      <img
        src={src}
        alt="Who Are My Clients? — book cover by Antoine B. Carrière"
        className="w-full h-auto object-contain select-none"
        draggable={false}
        loading="eager"
      />
    </div>
  );
}

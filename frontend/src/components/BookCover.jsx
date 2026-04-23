export default function BookCover({ size = "lg", className = "", variant = "3d" }) {
  const sizes = {
    sm: "w-48 md:w-56",
    md: "w-64 md:w-72",
    lg: "w-80 md:w-[360px]",
    xl: "w-[320px] md:w-[460px]",
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
        className="w-full h-auto object-contain book-shadow select-none"
        draggable={false}
        loading="eager"
      />
    </div>
  );
}

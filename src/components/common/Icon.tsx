interface IconProps {
  src: string;
  onClick?: () => void;
  className?: string;
}

export default function Icon({ src, onClick, className }: IconProps) {
  return (
    <img
      draggable={false}
      src={src}
      alt={src}
      className={className}
      onClick={onClick}
    />
  );
}

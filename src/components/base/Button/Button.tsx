import { Button } from "@chakra-ui/react";
interface Iprops {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: "button" | "submit" | "reset";
  className: string;
  size: "sm" | "xl" | "lg";
}
export default function ButtonBase({
  text,
  onClick,
  type,
  className,
  size,
}: Iprops) {
  return (
    <div>
      <Button onClick={onClick} type={type} className={className} size={size}>
        {text}
      </Button>
    </div>
  );
}

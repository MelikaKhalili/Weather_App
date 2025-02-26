import { Input } from "@chakra-ui/react";
interface Iprops {
  type:
    | " datetime-local"
    | "week"
    | "month"
    | "search"
    | "checkbox"
    | "radio"
    | "file"
    | "range"
    | "color"
    | "hidden"
    | "submit"
    | "reset"
    | "button"
    | "imag"
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "date"
    | "time";
  name: string;
  placeholder: string;
  value: string;
  className?: string;
}
export default function InputBase({
  type,
  value,
  name,
  placeholder,
  className,
}: Iprops) {
  return (
    <div>
      <Input
        className={className}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}

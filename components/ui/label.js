import { cx } from "@/utils/all";

export default function Label(props) {
  const margin = props.nomargin;

  return (
    <span
      className={cx(
        "inline-block px-2 py-2 text-[12px] font-semibold leading-normal rounded-lg", // Typography styles
        !margin && "mt-2",
        "text-[#4B4B4B] bg-[#F6F6F6]" // Custom green text and light gray background
      )}
    >
      {props.children}
    </span>
  );
}

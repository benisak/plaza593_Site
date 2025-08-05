import { cx } from "@/utils/all";

export default function ContainerF(props) {
  return (
    <div
      className={cx(
        "container px-4 mx-auto xl:px-5", //mobile left-right padding 4
        props.large ? " max-w-screen-xl" : " max-w-screen-lg",
        !props.alt && "py-5 lg:py-8",
        props.className
      )}>
      {props.children}
    </div>
  );
}

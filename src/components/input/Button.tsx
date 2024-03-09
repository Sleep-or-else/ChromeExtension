import {ComponentProps, splitProps} from "solid-js";


export interface ButtonProps extends ComponentProps<"button"> {
  class?: string,
  onClick?: (event: MouseEvent) => void
}

export function OutlinedButton(props: ButtonProps) {
  const [local, bProps] = splitProps(props, ["class", "onClick"]);
  return <button
    class={`
        bg-stone-300 dark:bg-stone-800
        mt-0 p-4 m-4 px-6
        w-fit overflow-hidden
        rounded-full
        text-stone-950 dark:text-stone-200
        hover:brightness-90 font-medium
        ${local.class || ""}`}
    onClick={event => {
      rippleEffect(event)
      local.onClick?.(event)
    }}
    {...bProps}/>;
}

export default function Button(props: ButtonProps) {
  const [local, bProps] = splitProps(props, ["class", "onClick"]);
  return <button
    onClick={event => {
      rippleEffect(event)
      local.onClick?.(event)
    }}
    class={`
        m-4 
        mt-0 w-fit overflow-hidden rounded-full bg-yellow-800
        p-4
        px-6
        font-medium
        text-stone-100 hover:brightness-90 
        dark:bg-yellow-300 dark:text-stone-800
        ${local.class || ""}`} {...bProps}/>;
}

function rippleEffect(event: MouseEvent & { currentTarget: HTMLButtonElement }) {
  // const btn = event.currentTarget;
  //
  // const circle = document.createElement("span");
  // const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  // const radius = diameter / 2;
  //
  // circle.style.width = circle.style.height = `${diameter}px`;
  // circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
  // circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
  // circle.classList.add("ripple");
  //
  // const prevRipple = btn.getElementsByClassName("ripple")[0];
  //
  // if (prevRipple) {
  //   prevRipple.remove();
  // }
  //
  // btn.appendChild(circle);
}
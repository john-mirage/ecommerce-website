export function getFadeInAnimation(toLeft) {
  return [
    {
      opacity: 0,
      transform: toLeft ? "translateX(4rem)" : "translateX(-4rem)",
      offset: 0
    },
    {
      opacity: 1,
      transform: "translateX(0)",
      offset: 1
    }
  ];
}

export function getFadeOutAnimation(toLeft) {
  return [
    {
      opacity: 1,
      transform: "translateX(0)",
      offset: 0
    },
    {
      opacity: 0,
      transform: toLeft ? "translateX(-4rem)" : "translateX(4rem)",
      offset: 1
    }
  ];
}

export const fadeInAnimationTiming = {
  duration: 300,
  fill: "forwards",
  easing: "ease-in-out",
}

export const fadeOutAnimationTiming = {
  duration: 300,
  easing: "ease-in-out",
}
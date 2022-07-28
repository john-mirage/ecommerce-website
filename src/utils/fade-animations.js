export const fadeInAnimation = [
  {
    opacity: 0,
    offset: 0
  },
  {
    opacity: 1,
    offset: 1
  }
];

export const fadeOutAnimation = [
  {
    opacity: 1,
    offset: 0
  },
  {
    opacity: 0,
    offset: 1
  }
];

export function getFadeInAndTranslateAnimation(toLeft) {
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

export function getFadeOutAndTranslateAnimation(toLeft) {
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
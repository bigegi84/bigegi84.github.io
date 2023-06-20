const bigegi84theme = {
  class: {
    basic: "black-gold",
    button: "black-gold-button",
    circle: "circle-a black-gold-circle",
    h: "black-gold-h",
    input: "black-gold black-gold-input",
    inputText: "black-gold-input-text",
  },
  style: {
    background: bigegi84store.theme[bigegi84store.theme.value].backgroundColor,
    color: bigegi84store.theme[bigegi84store.theme.value].textColor,
  },
  styleCircle: {
    boxShadow:
      "inset 0 0 0 1px " +
      bigegi84store.theme[bigegi84store.theme.value].textColor,
  },
};

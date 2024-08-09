define(() => {
  return (label = null, className = "black-gold bigegi84-text") => {
    return e("div", { className }, label ?? label);
  };
});

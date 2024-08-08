define(() => {
  return (label, className = "black-gold bigegi84-text") => {
    return () => {
      const component = document.createElement("p");
      if (typeof label !== "undefined") component.innerHTML = label;
      if (className) component.setAttribute("class", className);
      return component;
    };
  };
});

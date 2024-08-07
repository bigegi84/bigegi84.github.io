define(() => {
  return (label, onClick = null, className = "black-gold-button") => {
    return () => {
      const component = document.createElement("button");
      if (typeof label !== "undefined") component.innerHTML = label;
      if (typeof className !== "undefined") component.className = className;
      // component.setAttribute("class", className);
      component.onclick = () => {
        if (onClick) onClick();
      };
      return component;
    };
  };
});

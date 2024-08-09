define(() => {
  return (label, onClick = null, className = "pakuan-button") => {
    return () => {
      const component = document.createElement("button");
      if (typeof label !== "undefined") component.innerHTML = label;
      if (typeof className !== "undefined") component.className = className;
      // component.setAttribute("class", className);
      component.style.padding = "0 1.5em";
      component.onclick = () => {
        if (onClick) onClick();
      };
      return component;
    };
  };
});

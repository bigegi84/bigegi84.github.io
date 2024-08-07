define(() => {
  return (label, onClick, className) => {
    return (parent) => {
      const component = document.createElement("button");
      if (typeof label !== "undefined") component.innerHTML = label;
      if (typeof className !== "undefined")
        element.setAttribute("class", className);
      component.onclick = () => {
        if (onClick) onClick();
      };
      parent.appendChild(component);
    };
  };
});

define(() => {
  return (label, className = null) => {
    return (parent) => {
      const component = document.createElement("h1");
      if (typeof label !== "undefined") component.innerHTML = label;
      if (className) component.setAttribute("class", className);
      parent.appendChild(component);
    };
  };
});

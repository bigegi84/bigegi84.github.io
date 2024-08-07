define(() => {
  return (label, className = null) => {
    return () => {
      const component = document.createElement("p");
      if (typeof label !== "undefined") component.innerHTML = label;
      if (className) component.setAttribute("class", className);
      return component;
    };
  };
});

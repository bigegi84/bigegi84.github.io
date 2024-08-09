define(() => {
  return (children = null, className = null) => {
    return () => {
      const component = document.createElement("div");
      if (className) component.setAttribute("class", className);
      // component.setAttribute("class", "circle-a");
      // component.style.color = "white";
      // component.style.boxShadow = "inset 0 0 0 1px white";
      if (children) children.forEach((it) => component.appendChild(it()));
      return component;
    };
  };
});

define(() => {
  return (children = null, className = null) => {
    return (parent) => {
      const component = document.createElement("div");
      if (className) component.setAttribute("class", className);
      parent.appendChild(component);
      if (children) children.forEach((it) => it(component));
    };
  };
});

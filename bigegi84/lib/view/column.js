define(() => {
  return (children, className = null) => {
    return (parent) => {
      const component = document.createElement("div");
      if (className) component.setAttribute("class", className);
      parent.appendChild(component);
      children.forEach((it) => it(component));
    };
  };
});

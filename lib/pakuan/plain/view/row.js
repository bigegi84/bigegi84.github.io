define(() => {
  return (children, className = "pakuan-row") => {
    return () => {
      const component = document.createElement("div");
      component.setAttribute("class", className);
      children.forEach((it) => component.appendChild(it()));
      return component;
    };
  };
});

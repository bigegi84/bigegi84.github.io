define(() => {
  return (children, className = "pakuan-column") => {
    return () => {
      const component = document.createElement("div");
      component.setAttribute("class", className);
      children.forEach((it) => component.appendChild(it()));
      return component;
    };
  };
});

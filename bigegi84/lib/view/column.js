define(() => {
  return (children, className = null) => {
    return () => {
      const component = document.createElement("div");
      if (className) component.setAttribute("class", className);
      children.forEach((it) => component.appendChild(it()));
      return component;
    };
  };
});

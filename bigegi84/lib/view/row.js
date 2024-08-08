define(() => {
  return (children, className = "bigegi84-row") => {
    return () => {
      const component = document.createElement("div");
      if (className) component.setAttribute("class", className);
      children.forEach((it) => component.appendChild(it()));
      return component;
    };
  };
});

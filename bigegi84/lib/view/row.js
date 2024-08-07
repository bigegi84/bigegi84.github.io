define(() => {
  return (children, className = "bigegi84-row") => {
    return () => {
      const component = document.createElement("div");
      if (className) component.setAttribute("class", className);
      component.style.gap = "10px";
      children.forEach((it) => component.appendChild(it()));
      return component;
    };
  };
});

define(() => {
  return (children) => {
    return () => {
      const component = document.createElement("div");
      component.setAttribute("class", "bigegi84-column bigegi84-card");
      component.style.gap = "10px";
      children.forEach((it) => component.appendChild(it()));
      return component;
    };
  };
});

define(() => {
  return (label = null, className = "bigegi84-highlight") => {
    return () => {
      const component = document.createElement("h2");
      if (label) component.innerHTML = label;
      component.setAttribute("class", className);
      return component;
    };
  };
});

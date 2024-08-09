define(() => {
  return (label = null, className = "pakuan-highlight") => {
    return () => {
      const component = document.createElement("h2");
      if (label) component.innerHTML = label;
      component.setAttribute("class", className);
      return component;
    };
  };
});

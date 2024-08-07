define(() => {
  return (label = null, className = null) => {
    return () => {
      const component = document.createElement("strong");
      if (label) component.innerHTML = label;
      if (className) component.setAttribute("class", className);
      return component;
    };
  };
});

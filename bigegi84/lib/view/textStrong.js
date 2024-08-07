define(() => {
  return (label = null, className = null) => {
    return (parent) => {
      const component = document.createElement("strong");
      if (label) component.innerHTML = label;
      if (className) component.setAttribute("class", className);
      parent.appendChild(component);
    };
  };
});

define(() => {
  return (className = null) => {
    return (parent) => {
      const component = document.createElement("i");
      if (className) component.setAttribute("class", className);
      parent.appendChild(component);
    };
  };
});

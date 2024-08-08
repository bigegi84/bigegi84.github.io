define(() => {
  return (label = null, className = "black-gold bigegi84-text") => {
    return () => {
      const component = document.createElement("strong");
      if (label) component.innerHTML = label;
      component.setAttribute("class", className);
      return component;
    };
  };
});

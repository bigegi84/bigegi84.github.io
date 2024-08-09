define(() => {
  return (label = null, className = "pakuan-textStrong") => {
    return () => {
      const component = document.createElement("strong");
      if (label) component.innerHTML = label;
      component.setAttribute("class", className);
      return component;
    };
  };
});

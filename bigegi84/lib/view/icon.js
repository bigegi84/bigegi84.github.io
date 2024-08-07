define(() => {
  return (className = null) => {
    return () => {
      const component = document.createElement("i");
      if (className) component.setAttribute("class", className);
      return component;
    };
  };
});

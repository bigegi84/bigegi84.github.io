define(() => {
  return (label = null, labelCls = "pakuan-label") => {
    return () => {
      const component = document.createElement("label");
      if (label) component.innerHTML = label;
      component.setAttribute("class", labelCls);
      return component;
    };
  };
});

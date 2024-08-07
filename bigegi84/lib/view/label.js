define(() => {
  return (label = null, labelCls = null) => {
    return (parent) => {
      const component = document.createElement("label");
      if (label) component.innerHTML = label;
      if (labelCls) component.setAttribute("class", labelCls);
      parent.appendChild(component);
    };
  };
});

define(() => {
  return (
    label = null,
    state = null,
    inputCls = null,
    styleColor = "white"
  ) => {
    return (parent) => {
      var [value, setState] = state;
      const component = document.createElement("input");
      component.type = "text";
      component.name = label;
      component.style.color = styleColor;
      if (inputCls) component.setAttribute("class", inputCls);
      if (value) component.value = value;
      component.onchange = (e) => {
        if (setState) setState(e);
      };

      parent.appendChild(component);
    };
  };
});
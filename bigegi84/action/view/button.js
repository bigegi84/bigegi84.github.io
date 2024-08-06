define(() => {
  return (label, onClick) => {
    return (parent) => {
      const component = document.createElement("button");
      if (typeof label !== "undefined") component.innerHTML = label;
      component.onclick = () => {
        if (onClick) onClick();
      };
      parent.appendChild(component);
    };
  };
});

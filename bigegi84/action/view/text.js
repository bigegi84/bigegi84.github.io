define(() => {
  return (label) => {
    return (parent) => {
      const component = document.createElement("p");
      if (typeof label !== "undefined") component.innerHTML = label;
      parent.appendChild(component);
    };
  };
});

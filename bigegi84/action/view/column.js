define(() => {
  return (children) => {
    return (parent) => {
      const component = document.createElement("div");
      parent.appendChild(component);
      children.forEach((it) => it(component));
    };
  };
});

define(() => {
  return (parent, children) => {
    parent.innerHTML = "";
    children().forEach((it) => parent.appendChild(it()));
  };
});

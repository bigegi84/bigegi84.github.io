define((require) => {
  return (children, parent = document.getElementById("root")) => {
    parent.innerHTML = "";
    children().forEach((it) => parent.appendChild(it()));
  };
});

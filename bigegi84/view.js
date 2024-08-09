define((require) => {
  var { pakuan } = require("../lib/index");
  document.title = "bigegi84";
  return () =>
    pakuan({
      textHighlight: "Gilang Pratama Wiguna",
      panelProfil: {
        textA: "Gilang Pratama Wiguna",
      },
    });
});

$(document).ready(() => {
  var prefix = ".bigegi84-";
  document.title = state.fullName + ", " + state.degree["id"];
  $(prefix + "icon").attr("href", "gold.ico");
  $(prefix + "fullName").text(state.fullName + ", " + state.degree["id"]);
  $(prefix + "subtitle").html(
    state.phone +
      "<br>" +
      state.email +
      "<br>" +
      "Full Stack Developer. Berpengalaman lebih dari 6 Tahun. " +
      "<br>" +
      state.address["id"]
  );
  $(prefix + "contactMe")
    .attr("href", state.waLink)
    .text("Kontak Saya");

  $(prefix + "educationTitle").text("Pendidikan");
  $(prefix + "educationSubtitle").html(
    "Sarjana " +
      state.education.bachelor.major +
      " - " +
      state.education.bachelor.university +
      "<br> Penjurusan  " +
      state.education.bachelor.direction +
      "<br> IPK " +
      state.education.bachelor.gpa +
      "<br>" +
      " Tahun " +
      state.education.bachelor.yearFrom +
      " sampai " +
      state.education.bachelor.yearTo
  );
  $(prefix + "copyright").html(
    "&copy; " +
      state.fullName +
      ", " +
      state.degree["id"] +
      " " +
      new Date().getFullYear()
  );
});

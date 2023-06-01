$(document).ready(() => {
  helper.socialLink();
  var prefix = ".bigegi84-";
  document.title = state.fullName + ", " + state.degree["id"];
  $(prefix + "icon").attr("href", "gold.ico");
  $(prefix + "fullName").text(state.fullName + ", " + state.degree["id"]);
  $(prefix + "subtitle").html(
    state.phone +
      "<br>" +
      state.email +
      "<br>" +
      "<strong>Full Stack Developer. Berpengalaman lebih dari 6 Tahun.</strong>" +
      "<br>" +
      state.address["id"]
  );
  $(prefix + "contactMe")
    .attr("href", state.waLink)
    .attr("target", "_blank")
    .text("Kontak Saya")
    .removeClass("smooth-scroll-middle");

  $(prefix + "educationTitle").text("Pendidikan");
  $(prefix + "educationSubtitle").html(
    "<strong>Sarjana S1</strong><br>" +
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
  $(prefix + "educationMore").hide();

  $(prefix + "experienceTitle").text("Pengalaman");
  var experienceContentHtml = "";
  state.experience.forEach((d) => {
    experienceContentHtml +=
      // '<span class="image right"><img style="height:100px;" src="' +
      // d.image +
      // '" alt=""></span>' +
      d.as +
      " di " +
      d.company +
      "<br> Tahun " +
      d.from +
      " sampai " +
      d.to +
      "<br>";
  });
  $(prefix + "experienceContent").html(experienceContentHtml);
  $(prefix + "experienceMore").text("Selengkapnya");

  $(prefix + "portofolioTitle").text("Portofolio");
  $(prefix + "portofolioContent").html("Segera Hadir");
  $(prefix + "portofolioMore").hide();

  $(prefix + "creativityTitle").text("Kreativitas");
  var creativityContentHtml = "";
  state.creativity.forEach((d) => {
    creativityContentHtml +=
      '<a href="' +
      d.link +
      '"><strong>' +
      d.name +
      "</strong></a><br>" +
      d.description +
      "<br>";
  });
  $(prefix + "creativityContent").html(creativityContentHtml);
  $(prefix + "creativityMore")
    .text("Selengkapnya")
    .hide();

  $(prefix + "skillTitle").text("Kemampuan");
  var skillContentHtml = "";
  state.skill.forEach((d) => {
    skillContentHtml +=
      "<strong>" + d.category + "</strong><br>" + d.list.join(", ") + "<br>";
  });
  $(prefix + "skillContent").html(skillContentHtml);
  $(prefix + "skillMore").text("Selengkapnya");

  $(prefix + "gallery").hide();
  $(prefix + "detail").hide();
  $(prefix + "getInTouch").hide();

  $(prefix + "copyright").html(
    "&copy; " +
      state.fullName +
      ", " +
      state.degree["id"] +
      " " +
      new Date().getFullYear()
  );
});

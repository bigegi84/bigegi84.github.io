var helper = {
  socialLink: () => {
    $(".bigegi84-twitter")
      .attr("href", state.link["twitter"])
      .attr("target", "_blank");
    $(".bigegi84-facebook")
      .attr("href", state.link["facebook"])
      .attr("target", "_blank");
    $(".bigegi84-instagram")
      .attr("href", state.link["instagram"])
      .attr("target", "_blank");
    $(".bigegi84-linkedin")
      .attr("href", state.link["linkedin"])
      .attr("target", "_blank");
    $(".bigegi84-paypal")
      .attr("href", state.link["paypal"])
      .attr("target", "_blank")
      .text("paypal");
    $(".bigegi84-saweria")
      .attr("href", state.link["saweria"])
      .attr("target", "_blank")
      .text("saweria");
  },
};

const bigegi84title = {
  view: () => {
    return (
      <section className="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
        <div className="content">
          <h2
            className="text-gold-a"
            style={{
              letterSpacing: "0px",
              // background:
              //   bigegi84store.theme[bigegi84store.theme.value].backgroundColor,
              // color: bigegi84store.theme[bigegi84store.theme.value].textColor,
              // fontWeight: "bolder",
            }}
          >
            {bigegi84state.fullName}, {bigegi84state.degree["id"]}
          </h2>
          <p className="major">
            <strong
              style={{
                background:
                  bigegi84store.theme[bigegi84store.theme.value]
                    .backgroundColor,
                color: bigegi84store.theme[bigegi84store.theme.value].textColor,
              }}
            >
              {bigegi84state.phone}
            </strong>
            <br />
            <strong
              style={{
                background:
                  bigegi84store.theme[bigegi84store.theme.value]
                    .backgroundColor,
                color: bigegi84store.theme[bigegi84store.theme.value].textColor,
              }}
            >
              {bigegi84state.email}
            </strong>
            <br />
            <strong
              style={{
                background:
                  bigegi84store.theme[bigegi84store.theme.value]
                    .backgroundColor,
                color: bigegi84store.theme[bigegi84store.theme.value].textColor,
              }}
            >
              Full Stack Developer. Berpengalaman lebih dari 6 tahun.
            </strong>
            <br />
            {bigegi84state.address["id"]}
          </p>
        </div>
        <div className="image">
          <img src="template/story/images/banner.jpg" alt="" />
        </div>
      </section>
    );
  },
};

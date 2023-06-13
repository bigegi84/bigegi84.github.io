const bigegi84experience = {
  view: () => {
    return (
      <section
        className="spotlight style1 orient-left content-align-left image-position-center onscroll-image-fade-in"
        style={{
          boxShadow:
            "inset 0 1px 0 0 " +
            bigegi84store.theme[bigegi84store.theme.value].textColor,
        }}
      >
        <div className="content">
          <h2
            style={{
              background:
                bigegi84store.theme[bigegi84store.theme.value].backgroundColor,
              color: bigegi84store.theme[bigegi84store.theme.value].textColor,
            }}
          >
            Pengalaman
          </h2>
          {bigegi84state.experience.map(
            ({ company, image, as, from, to }, i) => (
              <p key={i}>
                <strong
                  style={{
                    background:
                      bigegi84store.theme[bigegi84store.theme.value]
                        .backgroundColor,
                    color:
                      bigegi84store.theme[bigegi84store.theme.value].textColor,
                  }}
                >
                  {as}, {company}
                </strong>
                <br />
                {from} sampai {to}
              </p>
            )
          )}
        </div>
        <div className="image">
          <img src="template/story/images/spotlight02.jpg" alt="" />
        </div>
      </section>
    );
  },
};

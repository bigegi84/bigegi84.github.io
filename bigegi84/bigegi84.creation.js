const bigegi84creation = {
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
            Kreasi
          </h2>
          {bigegi84state.creation.map(({ name, link, description }, i) => (
            <p key={i}>
              <a href={link}>
                <strong
                  style={{
                    background:
                      bigegi84store.theme[bigegi84store.theme.value]
                        .backgroundColor,
                    color:
                      bigegi84store.theme[bigegi84store.theme.value].textColor,
                  }}
                >
                  {name}
                </strong>
              </a>
              <br />
              {description}
            </p>
          ))}
        </div>
        <div className="image">
          <img src="template/story/images/spotlight02.jpg" alt="" />
        </div>
      </section>
    );
  },
};

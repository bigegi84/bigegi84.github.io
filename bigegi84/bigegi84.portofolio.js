const bigegi84portofolio = {
  view: () => {
    return (
      <section
        className="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in"
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
            Portofolio
          </h2>
          <p>Segera Hadir</p>
        </div>
        <div className="image">
          <img src="template/story/images/spotlight03.jpg" alt="" />
        </div>
      </section>
    );
  },
};

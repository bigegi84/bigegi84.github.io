const bigegi84education = {
  view: () => {
    return (
      <section
        className="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in"
        id="first"
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
            Pendidikan
          </h2>
          {bigegi84state.education.map(
            ({ type, university, major, direction, yearFrom, yearTo }, i) => (
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
                  {type}
                </strong>
                <br />
                <strong
                  style={{
                    background:
                      bigegi84store.theme[bigegi84store.theme.value]
                        .backgroundColor,
                    color:
                      bigegi84store.theme[bigegi84store.theme.value].textColor,
                  }}
                >
                  {major} - {university}
                </strong>
                <br />
                Penjurusan {direction}
                <br />
                Tahun {yearFrom} sampai {yearTo}
              </p>
            )
          )}
          <ul className="actions stacked">
            <li>
              <a href="#" className="button bigegi84-educationMore">
                Learn More
              </a>
            </li>
          </ul>
        </div>
        <div className="image">
          <img src="template/story/images/spotlight01.jpg" alt="" />
        </div>
      </section>
    );
  },
};

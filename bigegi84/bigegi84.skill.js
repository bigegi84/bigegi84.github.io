const bigegi84skill = {
  view: () => {
    return (
      <section
        className="wrapper style1 align-justify"
        style={{
          boxShadow:
            "inset 0 1px 0 0 " +
            bigegi84store.theme[bigegi84store.theme.value].textColor,
        }}
      >
        <div className="inner">
          <h2
            style={{
              background:
                bigegi84store.theme[bigegi84store.theme.value].backgroundColor,
              color: bigegi84store.theme[bigegi84store.theme.value].textColor,
            }}
          >
            Kemampuan
          </h2>
          {bigegi84state.skill.map(({ category, list }, i) => (
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
                {category}
              </strong>
              <br />
              {list.join(", ")}
            </p>
          ))}
        </div>
      </section>
    );
  },
};

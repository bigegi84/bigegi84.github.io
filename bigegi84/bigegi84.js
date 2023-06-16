const bigegi84 = {
  view: () => {
    return (
      <div
        // style={{
        //   background:
        //     bigegi84store.theme[bigegi84store.theme.value].backgroundColor,
        //   color: bigegi84store.theme[bigegi84store.theme.value].textColor,
        // }}
        className={bigegi84theme.class.basic}
      >
        <bigegi84title.view />
        <bigegi84education.view />
        <bigegi84experience.view />
        <bigegi84portofolio.view />
        <bigegi84creation.view />
        <bigegi84skill.view />
        <bigegi84footer.view />
      </div>
    );
  },
};

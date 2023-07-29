const cloneDetail = {
  view: () => (
    <bigegi84View.letsRock
      sectionDetail={{
        content: {
          sectionKata: {
            content: {
              row: {
                observer: () =>
                  cloneStore.brain.data[cloneStore.brain.i].atom.map((e, i) => (
                    <div key={i}>{e}</div>
                  )),
              },
            },
          },
        },
      }}
    />
  ),
};

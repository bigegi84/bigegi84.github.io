const computer = {
  view: () => {
    React.useEffect(() => {
      // computerAction.ask.definition();
    });
    return (
      <bigegi84View.letsRock
        container={{
          viewA: (
            <h1 className={bigegi84theme.class.basic}>bigegi84 - Clone</h1>
          ),
          viewAB: <computerConfig.view />,
          viewB: (
            <bigegi84View.letsRock
              sectionTerminal={{
                content: {
                  column: {
                    cardAnswer: {
                      column: {
                        textStrong: "Jawaban",
                        observer: () =>
                          computerStore.text.map((e, i) => (
                            <bigegi84View.letsRock key={i} textStrong={e} />
                          )),
                      },
                    },
                    card: {
                      column: {
                        textStrong: "Pertanyaan",
                        observer: () => {
                          return (
                            <bigegi84View.letsRock
                              column={{
                                inputTextarea: [
                                  computerStore.input.text,
                                  (e) => (computerStore.input.text = e),
                                ],
                                row: {
                                  buttonSmallKirim: () => {
                                    const text = computerStore.input.text;
                                    computerStore.text.push(
                                      `${computerStore.hostname}: ${text}`
                                    );
                                    const cmd = text.split(" ")[0];
                                    if (computerAction[cmd])
                                      computerAction[cmd](text);
                                  },
                                },
                              }}
                            />
                          );
                        },
                      },
                    },
                  },
                },
              }}
            />
          ),
          // viewC: <computerDetail.view />,
          // viewD: <computerNoAnswer.view />,
        }}
      />
    );
  },
};

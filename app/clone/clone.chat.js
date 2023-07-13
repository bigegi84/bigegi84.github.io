const cloneChat = {
  view: () => {
    const chat = React.useState("");
    return (
      <bigegi84View.letsRock
        sectionNgobrol={{
          content: {
            row: {
              card: {
                column: {
                  textStrong: "Pertanyaan",
                  observer: () => {
                    return (
                      <bigegi84View.letsRock
                        column={{
                          inputTextarea: [
                            cloneStore.input.text,
                            (e) => (cloneStore.input.text = e),
                          ],
                          row: {
                            buttonSmallKirim: () => {
                              cloneAction.send();
                            },
                          },
                        }}
                      />
                    );
                  },
                },
              },
              cardAnswer: {
                column: {
                  textStrong: "Jawaban",
                  observer: () => {
                    let column = {
                      textStrong: cloneStore.text.answer,
                    };
                    if (cloneStore.text.answer == "Gatau Jawabannya")
                      column = {
                        ...column,
                        ...{
                          inputTextareaJawaban: [
                            cloneStore.teach,
                            (e) => (cloneStore.teach = e),
                          ],
                          buttonSimpan: () => {
                            const path = cloneStore.lastText
                              .split(" ")
                              .join(".");
                            cloneStore.brain.bigegi84 = _.set(
                              cloneStore.brain.bigegi84,
                              `${path}.$answer`,
                              [cloneStore.teach.split(" ")]
                            );
                            cloneStore.text.answer = "";
                          },
                        },
                      };
                    return <bigegi84View.letsRock column={column} />;
                  },
                },
              },
            },
          },
        }}
      />
    );
  },
};

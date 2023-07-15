const cloneStore = mobx.observable({
  ask: {
    definition: [],
  },
  brain: {
    i: 0,
    data: [
      {
        answer: [],
        atom: [],
        node: [],
      },
    ],
  },
  input: {
    text: "",
    noAnswerText: [],
  },
  lastText: "",
  noAnswer: [],
  teach: "",
  text: {
    answer: "",
  },
});

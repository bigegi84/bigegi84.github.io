const cloneStore = mobx.observable({
  ask: {
    definition: [],
  },
  brain: {
    selected: "bigegi84",
    bigegi84: brainBigegi84,
  },
  input: {
    text: "",
    noAnswerText: [],
  },
  noAnswer: [],
  text: {
    answer: "",
  },
});

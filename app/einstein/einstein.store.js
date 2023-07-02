const einsteinStore = mobx.observable({
  physic: {
    formula: [
      {
        name: "Gaya",
        formula: ["F=m*a"],
        unit: {
          name: "Newton",
          symbol: "F",
          base: "kg*m*s*s",
        },
      },
      {
        name: "Percepatan",
        formula: ["a=v/s"],
        unit: {
          name: "Percepatan",
          symbol: "a",
          base: "m/(s*s)",
        },
      },
      {
        name: "Kecepatan",
        formula: ["v=m/s"],
        unit: {
          name: "Kecepatan",
          symbol: "v",
          base: "m/s",
        },
      },
      {
        name: "Massa Jenis",
        formula: ["p=m/v"],
        unit: {
          name: "Kecepatan",
          symbol: "p",
          base: "kg/(m*m*m)",
        },
      },
      {
        name: "Kuat Arus Listrik",
        formula: ["I=Q/t", "I=sqrt(P/R)", "I=P/V", "I=V/R"],
        unit: {
          name: "Ampere",
          symbol: "A",
          base: "?",
        },
      },
      {
        name: "Hambatan",
        formula: ["R=V/I", "R=P/(I*I)", "R=(V*V)/P"],
        unit: {
          name: "Ohm",
          symbol: "R",
          base: "?",
        },
      },
    ],
  },
});

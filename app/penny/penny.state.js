const pennyState = {
  empty: {
    account: [],
    asset: [],
    claim: [],
    config: {
      payday: 28,
    },
    debt: [],
    form: {
      account: { mode: null, i: null, name: "", owner: "", balance: 0 },
      asset: {
        mode: null,
        i: null,
        name: "",
        owner: "",
        buyPrice: 0,
        sellPrice: 0,
      },
      stuff: [false, false, "", 0.0, 0.0, ""],
    },
    info: { name: "" },
    show: { balance: false },
    stuff: [],
  },
  example: {
    account: [["Contoh", "bigegi84", 0.0]],
    asset: [["Contoh", "bigegi84", 0.0, 0.0]],
    claim: [["Contoh", "bigegi84", 0.0, 0.0]],
    config: {
      payday: 28,
    },
    debt: [["Contoh Utang", "bigegi84", 100.0, 7, 2]],
    form: {
      account: [, , , , false],
      stuff: [false, false, "", 0.0, 0.0, ""],
    },
    info: { name: "" },
    show: { balance: false },
    stuff: [["Contoh Barang", ["2023-06-21T16:55:41+07:00", 10000]]],
  },
  stuff: {
    unit: [],
  },
};

const pennyStore = mobx.observable({
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
    asset: {
      mode: null,
      i: null,
      name: "",
      owner: "",
      buyPrice: 0,
      sellPrice: 0,
    },
    debt: {
      mode: null,
      i: null,
      name: "",
      owner: "",
      installment: 0,
      dueDate: "-",
      installmentLeft: 0,
    },
    stuff: {
      mode: null,
      i: null,
      name: "",
      shopId: "",
      amount: 0,
      price: 0,
      unit: "",
    },
    stuffPrice: {
      mode: null,
      stuffI: null,
      i: null,
      stuffId: "",
      shopId: "",
      amount: 0,
      price: 0,
    },
    shop: {
      mode: null,
      i: null,
      name: "",
      owner: "",
      location: "",
      link: "",
    },
  },
  info: { name: "" },
  show: { balance: false },
  shop: [],
  stuff: [],
  stuffPrice: [],
});

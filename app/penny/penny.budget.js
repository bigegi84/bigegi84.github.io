const pennyBudget = {
  action: {
    add: () => {
      const [name, setName] = stateName;
      const [amount, setAmount] = stateAmount;
      bigegi84Orm.obj.createOne(pennyStore.budget, {
        name,
        amount: parseFloat(amount),
        createdAt: moment().format(),
        updatedAt: moment().format(),
      });
      setName("");
      setAmount(0);
    },
    list: () => (
      <bigegi84View.listCard
        arr={pennyStore.budget}
        onMap={({ name, amount }, i) => (
          <bigegi84View.observer
            onChange={() => {
              const isEdit = (pennyStore.form.budget.mode =
                "edit" && pennyStore.form.budget.i == i);
              return (
                <bigegi84View.column>
                  {isEdit ? (
                    <bigegi84View.letsRock
                      column={{
                        inputTextNama: [
                          pennyStore.form.budget.name,
                          (v) => (pennyStore.form.budget.name = v),
                        ],
                        inputTextJumlah: [
                          pennyStore.form.budget.amount,
                          (v) => (pennyStore.form.budget.amount = v),
                        ],
                      }}
                    />
                  ) : (
                    <bigegi84View.column>
                      <bigegi84View.textStrong
                        label={`${name}`}
                        color={"#A7ECEE"}
                      />
                      <bigegi84View.text
                        label={`${pennyAction.formatNumber(amount)}`}
                      />
                    </bigegi84View.column>
                  )}

                  <bigegi84View.circle
                    iClassName={
                      isEdit ? "fa-solid fa-check" : "fa-solid fa-pen"
                    }
                    onClick={() => {
                      if (isEdit) {
                        pennyStore.budget[pennyStore.form.budget.i].name =
                          pennyStore.form.budget.name;
                        pennyStore.budget[pennyStore.form.budget.i].amount =
                          parseFloat(pennyStore.form.budget.amount);
                        pennyStore.form.budget = {
                          mode: null,
                          i: null,
                          name: "",
                          amount: 0,
                        };
                      } else {
                        pennyStore.form.budget = {
                          mode: "edit",
                          i,
                          name,
                          amount,
                        };
                      }
                    }}
                  />
                </bigegi84View.column>
              );
            }}
          />
        )}
      />
    ),
  },
  view: () => {
    const stateName = React.useState("");
    const stateAmount = React.useState(0);
    return (
      <bigegi84View.letsRock
        column={{
          sectionAnggaran: {
            add: {
              inputTextNama: stateName,
              inputTextJumlah: stateAmount,
              buttonSimpan: () => {
                const [name, setName] = stateName;
                const [amount, setAmount] = stateAmount;
                bigegi84Orm.obj.createOne(pennyStore.budget, {
                  name,
                  amount: parseFloat(amount),
                  createdAt: moment().format(),
                  updatedAt: moment().format(),
                });
                setName("");
                setAmount(0);
              },
            },
            content: <pennyBudget.action.list />,
          },
        }}
      />
    );
  },
};

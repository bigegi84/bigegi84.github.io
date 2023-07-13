const bahasaLearn = {
  action: {
    ask: () => {
      var randomProperty = function (obj) {
        var keys = Object.keys(obj);
        console.log(keys);
        return obj[keys[(keys.length * Math.random()) << 0]];
      };
      var randomKey = function (obj) {
        var keys = Object.keys(obj);
        console.log(keys);
        return keys[(keys.length * Math.random()) << 0];
      };
      bahasaStore.learn.key = randomKey(mobx.toJS(bahasaStore.bahasa));
      return (
        <bigegi84View.letsRock
          card={{
            observer: () => {
              const key = bahasaStore.learn.key;
              return (
                <bigegi84View.letsRock
                  column={{
                    textStrong: key,
                    buttonSmallSelanjutnya: () => {
                      bahasaStore.learn.key = randomKey(
                        mobx.toJS(bahasaStore.bahasa)
                      );
                    },
                    card: {
                      textArab:
                        "Arab: " +
                        (bahasaStore.bahasa[key].arab
                          ? bahasaStore.bahasa[key].arab
                          : ""),
                      textArabLatin:
                        "ArabLatin: " + bahasaStore.bahasa[key].arabLatin,
                      textInggris:
                        "Inggris: " + bahasaStore.bahasa[key].inggris,
                      textKorea: "Korea: " + bahasaStore.bahasa[key].korea,
                      textKoreaLatin:
                        "KoreaLatin: " + bahasaStore.bahasa[key].koreaLatin,
                    },
                  }}
                />
              );
            },
          }}
        />
      );
    },
  },
  view: () => {
    return (
      <bigegi84View.letsRock
        column={{
          sectionBelajar: {
            content: <bahasaLearn.action.ask />,
          },
        }}
      />
    );
  },
};

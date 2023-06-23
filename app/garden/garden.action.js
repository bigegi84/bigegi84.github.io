const gardenAction = {
  formatNumber: (number) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IDR",

      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    return formatter.format(number);
  },
  stock: {
    purchase: ({ i, scale, source, stock, amount }) => {
      const { scaleId: stockScaleId } = stock;
      const { ratio: ratioStock } = bigegi84Orm.obj.readOneById(
        scale,
        stockScaleId
      );
      const { scaleId: sourceScaleId } = source;
      const { ratio: ratioSource } = bigegi84Orm.obj.readOneById(
        scale,
        sourceScaleId
      );
      gardenStore.supply[i].stock.amount += parseFloat(
        (ratioStock / ratioSource) * amount
      );
    },
    sale: ({ supplyI, saleI }) => {
      const { amount } = gardenStore.form.sale;
      const { sale, scale, stock } = gardenStore.supply[supplyI];
      const { scaleId: stockScaleId } = stock;
      const { ratio: ratioStock } = bigegi84Orm.obj.readOneById(
        scale,
        stockScaleId
      );
      const { scaleId: scaleIdSale } = sale[saleI];
      const { ratio: ratioSale } = bigegi84Orm.obj.readOneById(
        scale,
        scaleIdSale
      );
      gardenStore.supply[supplyI].stock.amount -= parseFloat(
        (ratioStock / ratioSale) * amount
      );
    },
  },
};

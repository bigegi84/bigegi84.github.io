const bigegi84Orm = {
  uuid: () => {
    var temp_url = URL.createObjectURL(new Blob());
    var uuid = temp_url.toString();
    URL.revokeObjectURL(temp_url);
    return uuid.substr(uuid.lastIndexOf("/") + 1);
  },
  arr: {
    createOne: (array, item) => {
      let newUuid = null;
      let find = 0;
      while (find != -1) {
        newUuid = bigegi84Orm.uuid();
        find = array.findIndex(([uuid]) => uuid == newUuid);
      }
      return array.push([...[newUuid], ...item]);
    },
    migrate: (array) => {
      return array.map((it) => [...[bigegi84Orm.uuid()], ...it]);
    },
  },
  obj: {
    createOne: (array, item) => {
      let newUuid = null;
      let find = 0;
      while (find != -1) {
        newUuid = bigegi84Orm.uuid();
        find = array.findIndex(({ id }) => id == newUuid);
      }
      array.push({ ...{ id: newUuid }, ...item });
      return array;
    },
    createOneAtBegining: (array, item) => {
      let newUuid = null;
      let find = 0;
      while (find != -1) {
        newUuid = bigegi84Orm.uuid();
        find = array.findIndex(({ id }) => id == newUuid);
      }
      return array.unshift({ ...{ id: newUuid }, ...item });
    },
    readOneById: (array, id) => {
      let result = null;
      const find = array.findIndex(({ id: iid }) => id == iid);
      if (find != -1) result = array[find];
      return result;
    },
    migrate: (array) => {
      return array.map((it) => [...[bigegi84Orm.uuid()], ...it]);
    },
  },
};

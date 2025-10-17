const db = require('../../db/connection');

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.formatData = (dataList) => {
  return dataList.map((data) => {
    return Object.values(data);
  });
};

exports.getIdAndCompareValue = (dataList, id, compare) => {
  const keyValueList = dataList.map((data) => {
    return [data[compare], data[id]];
  });
  return keyValueList;
};
exports.feedIdFromCompareValue = (insertCompare, dataList, id, foreignIdName) => {
  const updatedList = dataList.map((data) => {
    for (let compare of insertCompare) {
      if (data[id] === compare[0]) {
        delete data.article_title;
        return { ...data, [foreignIdName]: compare[1] };
      }
    }
  });
  return updatedList;
};

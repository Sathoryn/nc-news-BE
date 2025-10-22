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
exports.feedIdFromCompareValue = (title_ids, dataList, id, foreignIdName) => {
  const updatedList = dataList.map((data) => {
    for (let title_id of title_ids) {
      if (data[id] === title_id[0]) {
        delete data.article_title;
        data.article_id = title_id[1];
      }
    }
    return data;
  });

  return updatedList;
};

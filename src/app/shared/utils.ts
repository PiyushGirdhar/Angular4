export class Utils {

    sortList(list, sortKey, sortInDecending): Array<any> {
        list.sort((a, b) => {
            return sortInDecending ? (b[sortKey] - a[sortKey]) : (a[sortKey] -b[sortKey]);
        });
        return list;
    }

    sortSelectList(obj) {
        const selectList = [];
        for (const selectObj of obj) {
            const optionObj = {
              id : selectObj.id,
              text: selectObj.name
            };
            selectList.push(optionObj);
        }
        return selectList;
    }

}
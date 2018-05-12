export class Utils {

    sortList(list, sortKey, sortInDecending): Array<any> {
        list.sort((a, b) => {
            return sortInDecending ? (b[sortKey] - a[sortKey]) : (a[sortKey] -b[sortKey]);
        });
        return list;
    }

    sortSelectList(obj) {
        const ownerSelectList = [];
        for (const ownerObj of obj) {
            const optionObj = {
              id : ownerObj.id,
              text: ownerObj.name
            };
            ownerSelectList.push(optionObj);
        }
        return ownerSelectList;
    }

}
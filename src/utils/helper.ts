import * as moment from 'moment';
export class Helper{
    static getFirstNumberOccurenceFromString(str){
        return str.match(/\d+/g)[0]
    }

    /**
     * Transorms an array of objects to a Set
     * @param array list of objects
     * @param key the unique key
     */
    static toSet(array: Array<any>, key: string){
        return array.map(item => {
            return {
                key: item[key],
                value: item
            };
        }).reduce((set, currentValue) => {
            const { key, value } = currentValue;
            if(set[key])
               throw new Error('Set must contain unique values');
            set[key] = value;
            return set;
        }, <any>{});
    }

    /**
     * 
     * @param sortBy The mettric or attritube to sort by
     * @param opts Options 
     */

    static sorter(sortBy, opts){
        const asc = opts.asc != undefined ? opts.asc : true;
        const type = opts.type ? opts.type : 'string';
        const typeFormat = opts.typeFormat;
        return function(a, b){
            let firstElement = Helper.castType(a[sortBy], type, typeFormat);
            let secondElement = Helper.castType(b[sortBy], type, typeFormat);

            if(firstElement == secondElement)
                return 0;
            if(asc)
                return firstElement > secondElement ? 1 : -1;
            else
                return secondElement > firstElement ? 1 : -1;
        }
    }

    /**
     * 
     * @param property 
     * @param type 
     * @param typeFormat
     */

    static castType(property, type, typeFormat){
        switch(type){
            case 'string':
                return property;
            case 'number':
                return parseInt(''+property);
            case 'decimal':
                return parseFloat(''+property);
            case 'date':
                return moment(property, typeFormat).toDate().getTime();
        }
    }

}
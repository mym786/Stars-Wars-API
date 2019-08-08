import * as moment from 'moment';
export class Helper{
    /**
     * Given a string /characters/1 it will extract the first occurence of digit
     * Ex: /characters/1 will return 1
     * @param str 
     */
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
     * The function cast the types of a property
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
    /**
     * The function apply a fn on list of objects in a recuresive manner
     * Exanple: transform all string values to upper case 
     * use it as apply(CustomerObj, toUpperCase);
     */
    static apply(obj, fn){
        function iter(o, f) {
            Object.keys(o).forEach(function (k) {
                if (o[k] !== null && typeof o[k] === 'object') {
                    iter(o[k], f);
                    return;
                }
                if (typeof o[k] === 'string') {
                    o[k] = f(o[k]);
                }
            });
        }
        // copy object 
        const objClone = {...obj};
        iter(obj, fn)
        return objClone;
    }

    /**
     * 
     * @param centimeter 
     */

    static toFeetAndInches(centimeter){
        const totalInFeet = parseFloat(centimeter) * 0.0328084;

        const feet = parseInt(''+totalInFeet);

        const inches = parseFloat(((totalInFeet - feet) * 12).toFixed(2));

        return {
            feet,
            inches
        }
        

    }

}
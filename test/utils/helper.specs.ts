import { Helper } from './../../src/utils/helper';
import { stringLiteral } from '@babel/types';

describe('Helper (spec)', () => {
    it('should convert cm to feet and inches', () => {
        const {feet, inches } = Helper.toFeetAndInches(170);
        expect(feet).toBe(5);
        expect(inches).toBe(6.93);
    });

    it('should sort an array of objects ascending order by date', () => {
        const unsorted = [{
            "id": "45",
            "name": "Bib Fortuna",
            "gender": "male",
            "height": "180",
            "created": "2015-12-20T09:47:02.512000Z",
        },
        {
            "id": "1",
            "name": "Luke Skywalker",
            "gender": "male",
            "height": "172",
            "created": "2014-12-09T13:50:51.644000Z",
        },
        {
            "id": "5",
            "name": "Leia Organa",
            "gender": "female",
            "height": "150",
            "created": "2013-12-10T15:20:09.791000Z",
        }
        ];

        const test = unsorted.sort(Helper.sorter('created', {
            type: 'string',
            asc: 'asc'
        }));

        const sorted = [
            {
            "id": "5",
            "name": "Leia Organa",
            "gender": "female",
            "height": "150",
            "created": "2013-12-10T15:20:09.791000Z",
            },
            {
                "id": "1",
                "name": "Luke Skywalker",
                "gender": "male",
                "height": "172",
                "created": "2014-12-09T13:50:51.644000Z",
            },
            {
                "id": "45",
                "name": "Bib Fortuna",
                "gender": "male",
                "height": "180",
                "created": "2015-12-20T09:47:02.512000Z",
            }
        ];

        expect(test).toMatchObject(sorted);

    });

    it('should extract the first number occurence from a string', () => {
        const testString = '/characters/1';
        const expected = '1';

        expect(Helper.getFirstNumberOccurenceFromString(testString)).toBe(expected);
    });
});
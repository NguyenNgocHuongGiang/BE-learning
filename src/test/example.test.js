import { expect } from "chai"
import { it } from "mocha";

describe('Math operations', () => {
    //chua testcase cua bo test
    it('should add two integer', () => {
        const result = 10 +10
        //su dung chai de mock ket qua tra ve tu func
        expect(result).to.equal(20)
    });

    it('testing with array', () => {
        const arr = [1,2,3]
        expect(arr).to.include(2)
    })
})
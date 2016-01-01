/// <references path ="typings/jasmine/jasmine.d.ts" />
describe('dummy test', () => {
	var num = 100;

	it('exists', () => {
		expect(num).toBeDefined();
	});
    it('dummy', () => {
    	expect(num).toBe(100);
    });
});
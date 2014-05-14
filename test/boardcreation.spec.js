jasmine.getFixtures().fixturesPath = 'test/fixtures';
describe('board creation', function(){
	beforeEach(function() {
		loadFixtures('../index.html');
		$table = $('.connect4table');
	});

	it('Should create a board that is 10 wide', function(){
		new Board($table,10);
		expect($table.find(".connect4table>div:nth-child(11) a").attr('data-c4x')).toBe(0);
		expect($table.find(".connect4table>div:nth-child(11) a").attr('data-c4y')).toBe(1);
	});
});
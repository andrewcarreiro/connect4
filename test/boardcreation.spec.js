jasmine.getFixtures().fixturesPath = './';
describe('Board creation', function(){
	beforeEach(function() {
		loadFixtures('index.html');
		$table = $('.connect4');
		var board = new Board($table,10,10);
	});

	it('Generate the board space', function(){
		expect($table.find(".connect4table>div").length).toBe(100);
	});

	it('Be 10 blocks wide', function(){
		expect($table.find(".connect4table>div:nth-child(11) a").attr('data-c4y')).toBe('1');
	});

	it('Be 10 blocks tall', function(){
		expect($table.find(".connect4table>div:nth-child(11) a").attr('data-c4x')).toBe('0');
	});
});
jasmine.getFixtures().fixturesPath = './';
describe('Placing first chip', function(){
	beforeEach(function() {
		loadFixtures('index.html');
		$table = $('.connect4');
		$c4 = $table.connect4();
		$table.find('.connect4rows.xrows').val(5);
		$table.find('.connect4rows.yrows').val(5);
		$table.find('.connect4start').click();
		b = $c4[0];
		$table.find('.connect4table>div:first-child a').click();
	});

	it('Board Property should be saved', function(){
		expect(b.chips[4][0]).toBe(0);
	});

	it('Graphical chip should be added', function(){
		var $chip = $table.find('i');
		expect($chip.length).toBe(1);
	});
});
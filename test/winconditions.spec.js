describe('Win conditions', function(){
	beforeEach(function() {
		loadFixtures('index.html');
		$table = $('.connect4');
		board = new Board($table,4,4);
		/*
			board design
			--------------
			x x - -
			o x o x
			o o x x
			o o o x
			
		*/
		
		board.chips[3][0] = 0;
		board.chips[3][0] = 0;
	});

	it('Horizontal win', function(){
		board.chips[3][0] = 0;
		board.chips[3][1] = 0;
		board.chips[3][2] = 0;
		board.chips[3][3] = 0;
		expect(board.evaluateWin(3,3)).toBe(2);
	});

	it('Vertical win', function(){
		board.chips[0][0] = 0;
		board.chips[1][0] = 0;
		board.chips[2][0] = 0;
		board.chips[3][0] = 0;
		expect(board.evaluateWin(0,0)).toBe(1);
	});

	it('Diagonal 1 win', function(){
		board.chips[0][0] = 0;
		board.chips[1][1] = 0;
		board.chips[2][2] = 0;
		board.chips[3][3] = 0;
		expect(board.evaluateWin(0,0)).toBe(4);
	});

	it('Diagonal 2 win', function(){
		board.chips[3][0] = 0;
		board.chips[2][1] = 0;
		board.chips[1][2] = 0;
		board.chips[0][3] = 0;
		expect(board.evaluateWin(3,0)).toBe(3);
	});

});
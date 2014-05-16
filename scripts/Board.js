//The general board class. Each game will have a board which will record games, pieces (chips), and win conditions
var Board = Class.extend({
	//public vars
	chips : [],//An array of all chips placed into play, with the format chips[y][x]
	boardWidth : 0,
	boardHeight : 0,
	currentTeam : 0,
	MAXTEAM : 1,

	init : function($element,width,height){
		this.boardWidth = Number(width);
		this.boardHeight = Number(height);

		//init two dimensional array based on width and height for chips
		for(var i=0; i<height; i++){
			this.chips[i] = new Array(Number(width));
		}

		var totalCells = width * height;
		var eachWidth = 100 / width;
		
		//generate the board HTML
		$element.html(_.template($('#connect4_table').html(),{
			"totalCells" : totalCells, 
			"widthPercentage" : eachWidth, 
			"numberPerRow" : width
		}));

		//force height on the element
		$element.css('padding-bottom',String(height/width*100)+'%');
	},
	
	//Add a chip at a specific x position
	addChipAt : function(x,y){
		//is this an available space?
		if(typeof(this.chips[y][x]) != "undefined"){
			return "Chip already exists in this location";
		}

		//find out where this chip should drop to, if there is anywhere to go
		for(i=y; i<this.boardHeight; i++){
			//console.log("i: "+i+" x: "+x);
			if(typeof(this.chips[i][x]) == "undefined"){
				y = i;
			}
		}

		this.chips[y][x] = this.currentTeam;


		var returner = {
			"x" : x * (100 / this.boardWidth), 
			"y" : y * (100 / this.boardHeight),
			"team" : this.currentTeam,
			"ypos" : y
		}

		this.evaluateWin(x,y);

		this.nextTurn();

		return returner; //ui will be placed 
	},

	//switch turns
	nextTurn : function(){
		this.currentTeam++;
		if(this.currentTeam > this.MAXTEAM){
			this.currentTeam = 0;
		}
	},

	//Evaulate the win condition based on the latest piece added to the board.
	evaluateWin : function(lastPieceX, lastPieceY){
		/* 
			winning can be achieved through 8 vectors across 4 axes
				Vertical
					North
					South
				Horizontal
					East
					West
				Diagonal 1
					NE
					SW
				Diagonal 2
					SE
					NW
			A combined 3 points on any of the 4 axes would mean a win, as the current chip counts as 1.
			
			chips[y][x]
			   x0 x1 x2 x3 x4
			y0 O  O  O  O  O
			y1 O  O  O  O  O
			y2 O  O  O  O  O
		*/

		//clean vars for addition later
		lastPieceX = Number(lastPieceX);
		lastPieceY = Number(lastPieceY);

		//eval vertical
		//console.log("PLAYER "+this.currentTeam+"---------------");
		var verticalWinCondition = this.evaluateVector(0,1,lastPieceX,lastPieceY)+this.evaluateVector(0,-1,lastPieceX,lastPieceY);
		//console.log("verticalWinCondition: "+verticalWinCondition);
		var horizontalWinCondition = this.evaluateVector(1,0,lastPieceX,lastPieceY)+this.evaluateVector(-1,0,lastPieceX,lastPieceY);
		//console.log("horizontalWinCondition: "+horizontalWinCondition);
		var diagonal1WinCondition = this.evaluateVector(1,-1,lastPieceX,lastPieceY)+this.evaluateVector(-1,1,lastPieceX,lastPieceY);
		//console.log("diagonal1WinCondition: "+diagonal1WinCondition);
		var diagonal2WinCondition = this.evaluateVector(1,1,lastPieceX,lastPieceY)+this.evaluateVector(-1,-1,lastPieceX,lastPieceY);
		//console.log("diagonal2WinCondition: "+diagonal2WinCondition);
		if(verticalWinCondition >= 3){
			alert('Vertical line win for player '+this.currentTeam);
			return 1;
		}else if(horizontalWinCondition >= 3){
			alert('Horizontal line win for player '+this.currentTeam);
			return 2;
		}else if(diagonal1WinCondition >= 3){
			alert('NE/SW line win for player '+this.currentTeam);
			return 3;
		}else if(diagonal2WinCondition >= 3){
			alert('NW/SE line win for player '+this.currentTeam);
			return 4;
		}else{
			return false;
		}
	},

	//used as a method of evaulating specific success vectors in evaluateWin
	evaluateVector : function(xincrement,yincrement,originx,originy){
		var curX = originx += xincrement;
		var curY = originy += yincrement;
		var points = 0;

		while(curX >= 0 && curY >= 0 && curY < this.chips.length && curX < this.chips[curY].length && (typeof(this.chips[curY][curX]) != 'undefined') && (this.chips[curY][curX] === this.currentTeam)){
			points++;
			curX += xincrement;
			curY += yincrement;
		}

		return points;
	}
});
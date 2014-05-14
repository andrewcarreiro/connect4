//jQuery-based UI manipulation for board
$(document).ready(function(){
	$('.connect4').connect4();
});

$.fn.connect4 = function(){
	return $(this).each(function(i,ele){
		$(ele).html($("#connect4_template").html());
		$(ele).find('.connect4start').on('click', function(e){
			e.preventDefault();
			var xrows = Number($(ele).find('.connect4rows.xrows').val());
			var yrows = Number($(ele).find('.connect4rows.yrows').val());
			var scopedboard = new Board(
				$(ele),
				xrows,
				yrows
			);

			//Board clicking
			$(ele).find('a').each(function(j,link){
				$(link).on('click', function(e){
					var chipPlacementReturn = scopedboard.addChipAt($(link).attr('data-c4x'),$(link).attr('data-c4y'));
					if(typeof(chipPlacementReturn) == "string"){
						alert(chipPlacementReturn);
					}else{
						//console.log('added chip at '+$(link).attr('data-c4x')+" "+$(link).attr('data-c4y'));
						addChipToBoardGraphic(chipPlacementReturn.x,chipPlacementReturn.y,chipPlacementReturn.team,chipPlacementReturn.ypos,100/xrows);
					}
				});
			})
		});

		function addChipToBoardGraphic(x,y,team,ypos,width){
			ypos = Number(ypos);
			var $c4table = $(ele).children(".connect4table");
			$c4table.append(_.template($('#connect4_chip').html(),{
				"x" : x,
				"y" : y,
				"ypos" : ypos,
				"team" : team,
				"width" : width
			}));
			var $chipInQuestion = $c4table.find('i').last();
			setTimeout(function(){
				$chipInQuestion.css({
					'-webkit-transform' : 'translateY(0%)',
					'transform' : 'translateY(0%)'
				});
			},100);
		}
	});


}
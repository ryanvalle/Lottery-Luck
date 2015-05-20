var lottery_luck = {}

lottery_luck = {
	init: function() {
		var numbers = { 'winning': 75, 'mega': 15, 'scale': 2000 } 
		var url = 'http://www.calottery.com/sitecore/content/Miscellaneous/download-numbers/?GameName=mega-millions'
		var regular_winners = []
		var mega_winners = []
		var that = this
		for (var i=1; i <= numbers.winning; i++) {
			var body = '<div class="row">'
			body +=	'<div class="col-xs-1">'+i+'</div>'
			body += '<div class="col-xs-11" id="regular-numbers-'+i+'"><div style="width: 0%; height: 18px; background: #F00"></div></div>'
			body += '</div>'
			
			$('#regular-numbers .panel-body').append(body)
		}
		for (var i=1; i <= numbers.mega; i++) {
			var body = '<div class="row">'
			body +=	'<div class="col-xs-1">'+i+'</div>'
			body += '<div class="col-xs-11" id="mega-numbers-'+i+'"><div style="width: 0%; height: 18px; background: #F00"></div></div>'
			body += '</div>'
			
			$('#mega-numbers .panel-body').append(body)
		}

		$.get(url, function (data) {
			var lines = data.split('\n')
			$(lines).each(function(index, line){
				if (index > 4) {
					var line_array = line.split('          ')
					if (line_array != "") {
						regular_winners.push(line_array[1])
						regular_winners.push(line_array[2])
						regular_winners.push(line_array[3])
						regular_winners.push(line_array[4])
						regular_winners.push(line_array[5])
						mega_winners.push(line_array[6].trim())
					}

				}
			})
			var mega_length = mega_winners.length
			var regular_length = regular_winners.length

			var mega_split = that.array_count(mega_winners)
			var regular_split = that.array_count(regular_winners)

			$(mega_split[0]).each(function(index,number) {
				var total = mega_split[1][index]
				var percentage = (total / mega_length) * numbers.scale
				$('#mega-numbers-'+number+' div').width(percentage+'%')
			})

			$(regular_split[0]).each(function(index,number) {
				var total = regular_split[1][index]
				var percentage = (total / regular_length) * numbers.scale
				console.log(number)
				$('#regular-numbers-'+number+' div').width(percentage+'%')
			})
		})

	},

	array_count: function (arr) {
		// Thank you Stack Overflow
		// http://stackoverflow.com/questions/5667888/counting-occurences-of-javascript-array-elements
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a, b];
	}

}	
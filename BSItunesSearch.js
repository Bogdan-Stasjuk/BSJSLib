 BSItunesSearch = {
 	/**
 	 * Makes request to Itunes with designated search term and calls completion function on success. Will recursively calls itself on zero result and cut search term to the first "+" delimeter from the end.
 	 * @param  {String} term The URL-encoded text string you want to search for. For example: jack+johnson. Note: URL encoding replaces spaces with the plus (+) character and all characters except the following are encoded: letters, numbers, periods (.), dashes (-), underscores (_), and asterisks (*).
 	 * @param  {function(Dictionary)} completion Function with dictionary { artwork: , artist: , collection: , track: } as input parameter. It's called on success.
 	 * @return {void}
 	 */
 	makeRequest: function(term, completion) {
 		var searchUrl = "https://itunes.apple.com/search?limit=1&term=" + term;
 		console.bslogx("search url: " + searchUrl);

 		function successCallback(responseData) {
 			var result = responseData.results[0];
 			console.bslogx("result: ", result);

 			if (result) {
 				var artworkUrl = result.artworkUrl100.replace("100x100bb", "10000x10000");

 				console.bslogx("artwork:", artworkUrl, ", artist:", result.artistName, ", track:", result.trackName, ", album:", result.collectionName);

 				result = {
 					itunesArtwork: artworkUrl,
 					itunesArtist: result.artistName,
 					itunesTrack: result.trackName,
 					itunesAlbum: result.collectionName,
 				};
 				completion(result);
 			} else if (term.indexOf("+") != -1) {
 				BSItunesSearch.makeRequest(term.substr(0, term.lastIndexOf("+")), completion);
 			}
 		}

 		var xmlhttp = new XMLHttpRequest();
 		xmlhttp.onreadystatechange = function() {
 			if (xmlhttp.readyState == 4) {
 				if (xmlhttp.status == 200) {
 					var responseText = JSON.parse(xmlhttp.responseText);
 					successCallback(responseText);
 				} else {
 					console.bslog("xmlhttp.statusText: ", xmlhttp.statusText);
 				}
 			}
 		};
 		xmlhttp.open("GET", searchUrl, true);
 		xmlhttp.send();
 	}
 }
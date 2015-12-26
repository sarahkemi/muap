var get_song = function(user){
	//this is the main function that grabs a random recently played song from a specified
	var lastfm = new XMLHttpRequest();
	lastfm.open("GET", "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="+user+"&limit=1&page="+Math.floor((Math.random()*200)+1)+"&api_key=INSERT_API_KEY_HERE&format=json", false);
	lastfm.send();
	var lastfm_response = JSON.parse(lastfm.response);
	var artist = lastfm_response['recenttracks'].track.artist['#text'];
	var title = lastfm_response['recenttracks'].track.name;
	var album = lastfm_response['recenttracks'].track.image[3]['#text'];
	var song = title+" by "+artist;
	var html = "<div class='row'><div class='col-md-4'><img src='"+album+"' class='img-responsive' alt='Responsive image' align='center'></div><div class='col-md-8'><h3>"+song+"</h3><h4>Find on:</h4><a type='button' class='btn btn-success' href=\"http://open.spotify.com/search/"+title+"\">Spotify</a><a type='button' class='btn btn-danger' href=\"http://www.youtube.com/results?q="+song+"\">Youtube</a><br /><br /><a href='#' onClick=\"$('.jumbotron').empty(); $('.jumbotron').html(get_song('"+user+"'));\">Get a new song</a> or <a href=\"./index.htm\">Try a different user</a>?</div></div>"
	return html
};

//jquery effect for displaying fetched song on page
$(document).ready(function(){
    $('#button').click( function(){
        var lastfm_user = $('input[name=lastfm_user]').val();
		$('.jumbotron').empty();
		$('.jumbotron').html(get_song(lastfm_user));
    });
    
    
});

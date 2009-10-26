PGHOST = 'http://localhost:8080/';

// SongDepot : object for song services
function SongDepot(d,s,e) {
    // url is regex for site
    this.url = d;
    // scrape is function to return songs [[artist, song],...]
    this.scrape = s;
    // error is user message if no songs foudn
    this.error = e;
    // songs get loaded with scrape function
    this.songs = [];
    // TODO playlist title
}

// array of supported depots
depots = [];

// load jquery from google
// http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// TODO load easyXDM
function load_jquery() {
    if (typeof(jQuery) == 'undefined') {
        var host = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/';
        var jquery_script = document.createElement('SCRIPT');
        jquery_script.type = 'text/javascript';
        jquery_script.src = host+'jquery.min.js';
        document.getElementsByTagName('head')[0].appendChild(jquery_script);
        // find a better place to set up the terminal iframe

        setTimeout("after_load()",50);
    } else {
        // document set up, start doing stuff
        after_load();
    }

}

function load_terminal() {
    // load terminal.html iframe for listening
    var host = PGHOST+'iframe/';
    var tdiv = document.createElement('div');
    tdiv.innerHTML = '<iframe style="border: 0px; width: 0px; height: 0px;" id="playgrubterminal" src="'+host+'terminal.html"></iframe>';
    document.getElementsByTagName('body')[0].appendChild(tdiv);
    // global terminal
    terminal = document.getElementById('playgrubterminal');

    /*
    if(document.getElementById('playgrubterminal')) {
        alert('playgrubterminal: '+document.getElementById('playgrubterminal'));
    } else {
        alert("broken");
    }
    */
}


// we need this because dynamically loading jquery is not-instant
function after_load() {
    if (typeof(jQuery) == 'undefined') {
        // try again
        setTimeout("after_load()",50);
    } else {

        // load terminal iframe to talk to playgrub.com
        load_terminal();

        // create depots...

        // ----- Grooveshark ----- //

        var groove_url = 'http://widgets.grooveshark.com/add_songs';
        var groove_scrape = function() {
            var depot_songs = [];
            $("h4").each(function () {
                var song_result = $(this).html().split(" - ");
                depot_songs.push([song_result[1], song_result[0]]);
            });
            this.songs = depot_songs;
        }
        var groove_error = "You have to go to the widget building page to run this";
        var groove_depot = new SongDepot(groove_url, groove_scrape, groove_error);
        depots.push(groove_depot);


        // cycle through depots and return songs
        songs = get_songs();

        if(songs && songs.length > 0) {
            // alert('song length: '+songs.length);
            // how long should we wait?
            broadcast_interval = setInterval("broadcast_songs()",50);
            // alert("master songs-> "+songs);
        }
    }
}

function broadcast_songs() {

    // alert('song.length: '+songs.length);
    if(songs.length == 0) {
        clearInterval(broadcast_interval);
        return true;
    }

    var data = PGHOST+'iframe/terminal.html?artist='+songs[0][0]+'&track='+songs[0][1];

    if(data != terminal.src) {
        if(terminal.src && terminal.src != '')
            songs.shift();
        terminal.src = data;
    }
}

function get_songs() {
    var master_songs = [];
    // check all depots
    for(var i = 0; i < depots.length; i++) {
        // check to see if this depot's url matches the current url
        if(depots[i].url) {
            // run depot's scraping function
            depots[i].scrape();
            if(depots[i].songs.length > 0) {
                // add to songs from other depots
                master_songs = master_songs.concat(depots[i].songs);
            } else {
                alert(depots[i].error);
            }
        }
    }
    return master_songs;
}

load_jquery();
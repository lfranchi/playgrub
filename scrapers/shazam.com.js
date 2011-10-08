
/**
 * Simfy.de Tomahawklet Scraper
 * Created by: Jason Herskowitz <jherskowitz AT globallistic DOT com>
 * Version: 0.1
 *
 * Notes:
 *
 * This scraper will work on Shazam Music pages.
 */
Playgrub.source.url = 'http://.*\.shazam.com/music/web.*';
Playgrub.source.error = 'Sorry, no tracks were found.'
Playgrub.source.scrape = function() {

       $(".column-right").each(function() {
        var artist = $(this).find('h2').text();
        var song = $(this).find('h3.title').text();

	

       Playgrub.playlist.add_track(artist, song);
    });
}

Playgrub.source.start();

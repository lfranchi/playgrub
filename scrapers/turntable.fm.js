/**
 * This is My Jam Tomahawklet Scraper
 * Created by: J Herskowitz <jherskowitz AT globallistic DOT com>
 * Version: 0.1
 *
 * Notes:
 *
 * This scraper will work on Rhapsody.com playlist pages.
 */
Playgrub.source.url = 'http://.*\.thisismyjam.com.*';
Playgrub.source.error = 'Check your This is My Jam page - only playlist pages are supported.'
Playgrub.source.scrape = function() {

$("div.songinfo").each(function() {
        var song = $.trim($(this).find('div.title').text());
        var artist = $(this).find('div.details div').text();
var a = artist.toString().split(" - ");
var artist = $.trim(a[0]);

       Playgrub.playlist.add_track(artist, song);
    });
}

Playgrub.source.start();

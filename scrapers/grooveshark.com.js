/**
 * Grooveshark Playgrub.source
 * Created by: jherskowitz <jherskowitz AT globallistic DOT com>
 * Version: 0.1
 *
 * Notes:
 *
 * This scraper will work on any Grooveshark playlist.
 */

Playgrub.source.url = 'http://grooveshark\.com/\#/playlist/\.*';
Playgrub.source.error = "Check your Grooveshark page, Tomahawklet only works on playlists.";
Playgrub.source.scrape = function() {
 $("div.slick-cell").each(function() {
        var song = $.trim($(this).find('a.songLink').text());
        var artist = $.trim($(this).find('a.field').text());
        Playgrub.playlist.add_track(song_result[1], song_result[0]);
    });
}

Playgrub.source.start();

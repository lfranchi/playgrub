/**
 * Deezer playlist Tomahawklet Scraper
 * Created by: Nicolas Froment <lasconic AT gmail DOT com>
 * Version: 0.1
 *
 * Notes:
 *
 * This scraper will work on Deezer playlist pages.
 */
Playgrub.source.url = 'http://www\.deezer\.com/.*/music/playlist.*';
Playgrub.source.error = 'Sorry, no tracks were found.'
Playgrub.source.scrape = function() {

    $("dl.nb_dg_line").each(function() {
        var song = $(this).find('.sng_title').text();
        var artist = $(this).find('.art_title').text();
        Playgrub.playlist.add_track(artist, song);
    });
}

Playgrub.source.start();
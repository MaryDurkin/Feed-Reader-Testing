/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS feeds definitions,
    *  the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {

            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);

        });

        /* This test loops through each feed in the
         * allFeeds object and ensures it has a URL
         * defined and that the URL is not empty.
         */
        it('all urls are defined and not empty', function(){

            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* This test loops through each feed in the
         * allFeeds object and ensures it has a name
         * defined and that the name is not empty.
         */
        it('all names are defined and not empty', function(){

            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /* This suite tests the menu */
    describe('The menu', function(){
        var position = $('.slide-menu').position();

        /*
         * This tests that the menu is initially hidden
         */
        it('menu link is hidden by default', function() {

            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* This test endures that the menu changes visibility
         * when the menu icon is clicked. First it clicks to reveal the menuThis test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

         it('menu changes visibility when the menu icon clicked', function(){

            var menuIcon = $('.icon-list');
            /* menu is initially hidden, so simulate a click,
             * then test for visibility
             */
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            /*
             * click again, then test again
             */
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);

          });
    });

    /* This tests that there is at least one feed present after loadFeed has completes */
    describe('Initial Entries', function(){

        beforeEach(function(done){
            loadFeed(0, function(){
            done();
            });
        });

        it('There is at least one .entry element',function(done){
            expect($('.entry h2')[0]).toBeDefined();
            done();
        });

    });

    /* This test checks that when a new feed is loaded, the contant changes */
    describe('New Feed Selection', function(){

        var newFeedIndex = allFeeds.length - 1;
        /* beforeEach loads the last feed in the allFeeds array */
        beforeEach(function(done) {

            loadFeed(newFeedIndex, function(){
            done();
            });
        });
        /* if there is more than one feed in the array, test that a new one has loaded */
        if (newFeedIndex >= 1) {
            it('Content changes when new feed is loaded', function(done){

                expect($('.header .header-title').html()).not.toBe(allFeeds[0].name);
                done();
            });
        }
        /* if there is only one feed, we can't test for new content - so say so */
        else {

            it('Only one feed, cannot test content changes', function(done){
                expect($('.header .header-title').html()).toBe(allFeeds[0].name);
                done();
            });
        }
    });
}());

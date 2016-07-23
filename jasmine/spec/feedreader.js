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
    /* Thanks to my previous reviewer for helping me select the correct DOM element */
    describe('Initial Entries', function(){

        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('There is at least one .entry element',function(){

            expect($('.feed .entry').length).toBeGreaterThan(0);

        });

    });

    /* This test checks that when a new feed is loaded, the content changes */
    /* Thanks to my previous reviewer and also to the following forum post for  */
    /* helping me understand and implement this correctly
    /* https://discussions.udacity.com/t/last-test-suit-new-feed-selection-not-working/26375/5 */
    describe('New Feed Selection', function(){

      var firstFeed,
          newFeed;
      /* load initial feed */
      beforeEach(function(done) {

        loadFeed(0, function(){

          firstFeed = $('.feed').find('h2').text();
          done();

        });

      });

      it('Content changes when new feed is loaded', function(done){

        loadFeed(1, function(){

          newFeed = $('.feed').find('h2').text();
          expect(firstFeed).not.toEqual(newFeed);
          done();

        });

      });

    });

}());

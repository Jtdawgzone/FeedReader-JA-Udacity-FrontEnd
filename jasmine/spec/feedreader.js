/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    // Test suite describing RSS Feed array tests
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not empty. 
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls are defined', () => {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            })
        });
    });

    // Test suite describing menu tests
    describe('The menu', () => {

        /* A test that ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', () => {
            expect(document.querySelector('.menu-hidden')).toBeDefined();
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('changes visibility when menu icon is clicked', () => {
             var menuIcon = document.querySelector('.menu-icon-link');
             menuIcon.click();

             expect(document.querySelector('.menu-hidden')).toBeNull();

             menuIcon.click();

             expect(document.querySelector('.menu-hidden')).toBeDefined();
         });
    }); 

    // Test suite describing async feed loading
    describe('Initial Entries', function () {
        
        // If browser doesn't support ES6 Promises return
        if(!browserSupportsPromises()) {
            return;
        }

        beforeEach(()=> {
            // Choose third feed in allFeeds to load async
            // Return means we await the Promise to resolve
            return loadFeedAsync(2);
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('loads and completes its work', () =>
        {
             // Check if there is at least one entry in the loaded feed
             let feedEntries = document.querySelectorAll('.feed .entry');
             expect(feedEntries.length).toBeGreaterThan(0);
        }); 
    });

    // Test suite describing async feed loading and that feeds switch
    describe('New Feed Selection', () => {

       // If browser doesn't support ES6 Promises return
       if(!browserSupportsPromises())
       {
           return;
       }
        
        beforeEach(() => {
            // Choose fourth feed in allFeeds to load async
            // Return means we await the Promise to resolve
            return loadFeedAsync(3);         
        });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('replaces current feed with new feed\'s entries', () => {

             // Store the first entry for comparison after feed refresh
             // Chceck that the string has content
             let firstEntry = document.querySelector('.feed .entry');
             expect(firstEntry).toBeDefined();
             expect(firstEntry.innerText.length).toBeGreaterThan(0);

             // Refresh the feed container with a new feed async
             // in this case the first feed in allFeeds
             // Return means we await the Promise to resolve
             return loadFeedAsync(0).then(() => {

                // Store new first entry and check the string has content
                let newFirstEntry = document.querySelector('.feed .entry');
                expect(newFirstEntry).toBeDefined();
                expect(newFirstEntry.innerText.length).toBeGreaterThan(0);

                // Check that the old first entry does not match the new one
                expect(firstEntry.innerText).not.toMatch(newFirstEntry.innerText);
             });
        });
    });

    // Loads a feed async given a feed id to load from allFeeds
    function loadFeedAsync(feedId) {
        return new Promise((resolve, reject) => {
            loadFeed(feedId, resolve);
          });
    };

    // Checks to see if Browser supports ES6 Promises
    // from: https://jasmine.github.io/tutorials/async
    function browserSupportsPromises() {
        return typeof(Promise) !== "undefined";
    }
}());

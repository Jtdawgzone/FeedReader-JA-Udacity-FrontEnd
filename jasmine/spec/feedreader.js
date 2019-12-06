/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    // Test suite describing RSS Feed array tests
    describe("RSS Feeds", () => {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not empty.
       */
      it("are defined", () => {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).toBeGreaterThan(0);
      });

      /* This is a test that loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */
      it("urls are defined", () => {
        allFeeds.forEach(feed => {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).toBeGreaterThan(0);
        });
      });

      /* This is a test that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */
      it("names are defined", () => {
        allFeeds.forEach(feed => {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).toBeGreaterThan(0);
        });
      });
    });

    // Test suite describing menu tests
    describe("The menu", () => {
      /* A test that ensures the menu element is
       * hidden by default.
       */
      it("is hidden by default", () => {
        expect(document.querySelector(".menu-hidden")).toBeDefined();
      });

      /* A test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
      it("changes visibility when menu icon is clicked", () => {
        var menuIcon = document.querySelector(".menu-icon-link");
        menuIcon.click();

        expect(document.querySelector(".menu-hidden")).toBeNull();

        menuIcon.click();

        expect(document.querySelector(".menu-hidden")).toBeDefined();
      });
    });

    // Test suite describing async feed loading
    describe("Initial Entries", function() {
      let feedEntries;
      let supportsPromises = browserSupportsPromises();

      beforeEach(done => {
        // Choose third feed in allFeeds to load async
        if (supportsPromises) {
          // Return means we await the Promise to resolve
          // Store feed entries after load
          return loadFeedAsync(2).then(() => {
            feedEntries = getFeedEntries();

            // if we were only using promises this wouldn't be necessary
            // but since done() is required for the non-promise way it needs
            // to be called here or beforeEach() will timeout.
            done();
          });
        } else {
          // Store feed entries after load
          return loadFeed(2, () => {
            feedEntries = getFeedEntries();
            // So Jasmine knows async task is done
            done();
          });
        }
      });

      /* A test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      it("loads and completes its work", () => {
        // Check if there is at least one entry in the loaded feed
        expect(feedEntries.length).toBeGreaterThan(0);
      });

      // Grabs all entries from the current feed
      function getFeedEntries() {
        // This could be done with JQuery but given JQuery is considered an extra curriculur module
        // I left it as a DOM access call for this project.
        return document.querySelectorAll(".feed .entry");
      }
    });

    // Test suite describing async feed loading and that feeds switch
    describe("New Feed Selection", () => {
      let firstLoadFirstEntry;
      let secondLoadFirstEntry;
      let supportsPromises = browserSupportsPromises();

      // I wanted to practice using a Promise for this project
      // but I didn't want to edit "loadFeed" to support it since that was code given to us.
      // Therefore, I created "loadFeedAsync" below that encapsulatees "loadFeed".
      // It's an extra unneeded layer, but again, I was practicing using ES6 Promises.
      // I've included both ways below in case browsers do not support Promises.
      // You can also set "supportsPromises" to "false" to see it run without the extra layer.
      beforeEach(done => {
        // Choose fourth feed in allFeeds to load async

        if (supportsPromises) {
          // Return means we await the Promise to resolve
          return loadFeedAsync(3).then(() => {
            // Store first entry for test use
            firstLoadFirstEntry = getFirstFeedEntry();

            // Refresh the feed container with a new feed async
            // in this case the first feed in allFeeds
            // Return means we await the Promise to resolve
            return loadFeedAsync(0).then(() => {
              // Store new first entry for test use
              secondLoadFirstEntry = getFirstFeedEntry();

              // if we were only using promises this wouldn't be necessary
              // but since done() is required for the non-promise way it needs
              // to be called here or beforeEach() will timeout.
              done();
            });
          });
        } else {
          return loadFeed(3, () => {
            // Store first entry for test use
            firstLoadFirstEntry = getFirstFeedEntry();

            // Refresh the feed container with a new feed async
            // in this case the first feed in allFeeds
            return loadFeed(0, () => {
              // Store new first entry for test use
              secondLoadFirstEntry = getFirstFeedEntry();
              // So Jasmine knows async task is done
              done();
            });
          });
        }
      });

      /* A test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      it("replaces current feed with new feed's entries", () => {
        // Chceck that the string has content
        expect(firstLoadFirstEntry).toBeDefined();
        expect(firstLoadFirstEntry.innerText.length).toBeGreaterThan(0);

        expect(secondLoadFirstEntry).toBeDefined();
        expect(secondLoadFirstEntry.innerText.length).toBeGreaterThan(0);

        // Check that the old first entry does not match the new one
        expect(firstLoadFirstEntry.innerText).not.toMatch(
          secondLoadFirstEntry.innerText
        );
      });

      // Grabs the first entry from the current feed
      function getFirstFeedEntry() {
        // This could be done with JQuery but given JQuery is considered an extra curriculur module
        // I left it as a DOM access call for this project.
        return document.querySelector(".feed .entry");
      }
    });

    // Loads a feed async given a feed id to load from allFeeds
    function loadFeedAsync(feedId) {
      return new Promise((resolve, reject) => {
        // Passing resolve as the cb to "loadFeed" since it executes
        // when "loadFeed" is finished.
        // loadFeed doesn't ever reject
        loadFeed(feedId, resolve);
      });
    }

    // Checks to see if Browser supports ES6 Promises
    // from: https://jasmine.github.io/tutorials/async
    function browserSupportsPromises() {
      return typeof Promise !== "undefined";
    }
  })()
);

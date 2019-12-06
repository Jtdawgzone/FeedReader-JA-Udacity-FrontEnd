# Feed Reader Project

My version of Udacity's Front-End Web Development Project 4 utilizing JavaScript's ES6 Promises and Arrow Functions, IIFE's, and the Jasmine testing API to practice Unit testing.

## How To Play

1. Download my project off of GitHub (Either manually or via forking)
2. Open the "index.html" in your browser of choice
3. Jasmine will run the test cases automatically
4. The top half of the browser is the "app.js" code and the bottom half is the Jasmine API UI running my tests
5. Click on an individual test to run it, and feel free to interact with the actual website code above!
6. To view my testing code open "jasmine/spec/feedreader.js"
7. For the async tests I implemented the callback way via done() AND the ES6 Promise way. It will manually switch to the normal callback code path if a browser does not support Promises. You can manually force it by going to the async tests in code and setting "supportsPromises = false;"

## Post Mortem

This project was pretty straightfoward other than the final two async tests. I've dealt with async before in C#, but I really appreciate how Promises and IIFE's make you think about what the async code is doing in a functional way. I understand browsers are adding async/await support which hide Promise code underneath, but much like I chose to learn prototypal inheritance before the ES6 class-based looking way, I see the benefit of learning the older callback-way and ES6 Promisess so implemented my project using both ways.

### Jacob Anderson
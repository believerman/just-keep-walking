# A simple walk tracking app.

My fiancée tries to keep track of how much time we spend walking our dog - we have a husky, so it's a *lot* of walking - but the apps available never quite fit what she wants. They're usually too complex and often require geolocation, whereas she just wants to be able to track the amount of time without worrying about data usage or anything else. Another option would be a stopwatch app, but they're usually too simple.

This project will (hopefully) be a progressive web app which fits her needs!

Key Tech:

* [Dexie](http://dexie.org/)
* [Moment.js](https://momentjs.com/)
* [React](https://facebook.github.io/react/)
* [react-router](https://github.com/ReactTraining/react-router)
* [Babel](https://babeljs.io/)
* [webpack](https://webpack.js.org/)
* [Scss](http://sass-lang.com/)
* [Offline Plugin](https://github.com/NekR/offline-plugin)

Helpful Articles:

* [Handling Client Side App Updates (with Service Workers)](https://zach.codes/handling-client-side-app-updates-with-service-workers/) by [Zach Silveira](https://github.com/zackify).

Features so far:

* Tap homepage to start/stop walking.
* Stopwatch-style counter on homepage.
* Log page with breakdown of previous walks.
* PWA stuff.
* Make log items deletable.

To do:

* Test Service Workers again.
* Make log items editable.
* Stats section.
* Transitions.

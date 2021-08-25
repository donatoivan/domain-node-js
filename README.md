# Domain Group Node.js Technical Test

This is my submission to the Domain Node coding challenge

## Installation requirements

npde v14.15.0
I've been devving on node v14.15.0 which would be the most ideal version to use for this.

Use nvm to switch node version swiftly and easily. Below are a couple of resources to install nvm on your computer<br> [For mac](https://tecadmin.net/install-nvm-macos-with-homebrew/)
<br>[For windows](https://dev.to/skaytech/how-to-install-node-version-manager-nvm-for-windows-10-4nbi)

## App installation

---

### Clone the repository and change directory && cd domain-node-js

```bash
$ git clone git@github.com:donatoivan/domain-node-js.git && cd domain-node-js
```

### Install dependencies

```
$ npm install
```

### Run and build app

```
$ npm start
```

The App will be available at [http://localhost:5000](http://localhost5000)

## Dev Mode

---

### Run app in developement mode

```
$ npm run dev
```

### Run test suite

```
$ npm test
```

### Run test suite in watch mode

```
$ npm run test:watch
```

## Approach

Below are some of the resources that I used as a reference when implementing my solution.

[React Server Side Rendering with Express](https://danlegion.medium.com/react-server-side-rendering-with-express-b6faf56ce22)  </br>
[Express Cookies](https://alligator.io/nodejs/express-cookies/) </br>
[LokiJS](https://github.com/techfort/LokiJS)

My initial gut reaction was to create the simplest and most lightweight server possible using `http.createServer` for example, but I quickly realised that this would make the development process much more compicated than it had to be and the codebase much more heinous. Considering that I probably needed to work with cookies, multiple routes, CommonJS and ES6 modules etc, I ended up going with Express. I used webpack to bundle both my server code and my React code which also allowed me to use ES6 modules throughout the whole project for code uniformity. A webpack thing to improve would be to bundle the dev process in memeory rather than output a file in the 'static' directory.

To solve the problem of keeping track of the user from the server side, I've set a cookie with a user id which I can then query the db with to fetch the necessary data. There's also a fetch request on the browser side to '/data' in order to pass the data in as props when App.js renders. Props are also passed through the component on the server side to account for non-JS clients  The db I've used is lokiJS, a lightweight document based db. It's configured to be persistent to simulate a more "real-life" situation rather than just be an in memory db.

Jest, React Testing Library and Supertest have been used to write unit tests and semi-inmtegration tests.


---
## Technical Test README

Here at Domain, we're expanding our User Account actions.
Our excellent frontend engineering team have put together a hCard Builder SPA,
written in React.js,
which allows users to enter their details
then see a live preview of what it'll look like on their account.

The SPA has been tested and works as expected in the browser.
Now we need server rendering to support the
(rare, but significant)
case when
[JS may not execute](http://kryogenix.org/code/browser/everyonehasjs.html).

We also need to store the user's entered data in a session

## The task

This set of tasks is designed to let you show of your node.js skills.

We have provided the hCard Builder SPA.
You can see how it executes by loading up the `index.html` file in your browser.

### Requirements

Build a node server which;

- Serves up the SPA
- Server renders the SPA to support non-JS clients
- Saves user inputed data to the server as they switch between form fields
- Saves completed form data on user submission
- On page reload, populates the form fields with the values previous saved
- Is stateless, to support auto-scaling

User data should be saved into a store or database
that could in the future be accessed by any number of running servers.
Ie; we want this app to support auto-scaling with minimal changes.
For the purposes of this test,
it is ok to keep the store within the same codebase,
but it _must not_ be called directly from within the node server code.

For example;
Create a function `save()` which encapsulates the database writes.
This function should support easy refactoring for future auto-scaling.

User data will come in via 2 routes:

**POST `/submit`**:
Triggered when the user clicks "Submit" on the form.

Data will come in with a `application/x-www-form-urlencoded` content type:

```
givenName=Sam&surname=Fairfax&email=sam.fairfax%40fairfaxmedia.com.au&phone=0292822833&houseNumber=100&street=Harris+Street&suburb=Pyrmont&state=NSW&postcode=2009&country=Australia
```

**POST `/update`**:
Triggered when a user removes focus from a field in the form.

Data will come in with a `application/x-www-form-urlencoded` content type:

```
suburb=Pyrmont
```

#### Notes

- Using the latest "current" version of node is fine.
- The SPA will automatically trigger the POSTs as the user interacts with the
  form,
  you do not have to add these yourself.
- To render our React component on the server, you will need to set `React` on
  the `global` variable before requiring the component bundle:
  ```javascript
  var React = require("react");
  // Our bundle expects React to be a global
  global.React = React;
  var hCardComponent = require("./dist/main.js").default;
  ```

console.log(rendered);

### Guidelines

- We are interested in your coding style and how you solve problems.
  To this end,
  please include your source code and any build steps / explanations we may
  need to test the submission
- Please make sure your code is executable,
  and all dependencies are included
- Please structure the code for reusability
- Feel free to use any frameworks, preprocessors, or tools you are familiar with

### Submission

Please submit a _complete_ copy of the source code you wrote for this test.

Upon submission, please also give us a guide to how long you spent on the test
(There is no wrong answer! We iterate on this test based on the average time
taken so we can provide an accurate time-frame for future candidates).

Submission can be in any format where we have access to the required files
(`.zip`, GitHub, carrier pigeon, etc - your call!)

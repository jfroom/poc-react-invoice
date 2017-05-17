# POC-React-Invoice [![Build Status](https://travis-ci.org/jfroom/poc-react-invoice.svg?branch=master)](https://travis-ci.org/jfroom/poc-react-invoice)

Simple invoice proof-of-concept loosely based on [Seed Frontend Homework](https://github.com/seedco/frontend-homework).

Demo: https://jfroom.github.io/poc-angular-invoice

![Demo animated gif](https://cloud.githubusercontent.com/assets/943108/24680649/9a204558-1946-11e7-8210-f8b8e4636114.gif)

## Technologies
- [React](https://facebook.github.io/react)
- [Redux](http://redux.js.org/) & [React Router](https://reacttraining.com/react-router/)
- [Flow](https://flow.org/) static type checking
- [Docker](https://docs.docker.com/) with [Compose](https://docs.docker.com/compose/)
- Scaffolded with [Create React App](https://github.com/facebookincubator/create-react-app) which leverages [Babel](https://babeljs.io/) and [webpack](https://webpack.js.org)
- [ESLint](http://eslint.org/) with [watch](https://github.com/rizowski/eslint-watch)
- Testing with [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/)
- [Yarn](https://yarnpkg.com)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- TravisCI integration with auto-deploy to GitHub Pages
- [Nuclide](https://nuclide.io/) 

# Getting Started

## Required

1. Install [Docker](https://www.docker.com/) 17.03.0-ce+. This should also install Docker Compose 1.11.2+.
2. Verify versions: `docker -v; docker-compose -v;`

## First run
`docker-compose build` Builds images.

# Usage
## Development
`docker-compose up` Starts web server.

`open http://localhost:3000/` Loads default page into local browser.

`docker-compose exec web yarn lint` Run linter, stays open with watch.

`docker-compose exec web yarn flow` Run Flow type checker, stays open with watch. Flow much easier to work with inside of an IDE like Atom with Nuclide, or WebStorm.

## Test
`docker-compose exec web yarn test` Run test suite, stays open with watch.

![Jest test results](https://cloud.githubusercontent.com/assets/943108/24680654/9c5de0e6-1946-11e7-98c3-632afd5bdff5.png)


## Build
`docker-compose exec web yarn build` Create production build of static files.

`docker-compose exec web yarn serve-build` Serve the build locally.

# Additional References
- [Flow type cheat sheet](http://www.saltycrane.com/blog/2016/06/flow-type-cheat-sheet/)
- [Three Rules For Structuring (Redux) Applications](https://jaysoo.ca/2016/02/28/organizing-redux-application/) by Jack Hsu
- [TodoMVC example using Redux, React, and Typescript](https://github.com/jaysoo/todomvc-redux-react-typescript) by Jack Hsu
- [Testing Redux Applications](http://randycoulman.com/blog/2016/03/15/testing-redux-applications/) by Randy Coulman
- [Testing React components with Jest and Enzyme](https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f) by Artem Sapegin  


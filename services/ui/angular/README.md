# Codeveros UI

Codeveros UI Angular application.

## Installing dependencies:

Run `npm install` to download the dependencies specified in the `package.json` file. This will update or create the `package-lock.json` file.

Run `npm ci` to install the dependencies specified in the `package-lock.json` file. This will fail if `package-lock.json` does not exist. This command is mainly used as part of
the CI pipeline and building the docker image, to ensure the same dependencies used locally by the committer are the ones used by Jenkins.


## Building the application:

Run `ng build` to build the application. When building different configurations -- such as production -- you can specify the
configuration as build argument `ng build -c production`.

The built artifacts will be stored in the `dist/` directory.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

This will automatically run `ng build`.

To specify a proxy file allowing you configure the endpoints in which to route API requests, use the `--proxy-config [path/to/proxy.file]` when starting the dev server.
An example of this file is `proxy.default.json` located in the top-level directory. (e.g `ng serve --proxy-config proxy.json`). This allows you to locally run the various services, and
configure the ports as needs dictate. By default, the API requests are sent to the same host and port that is serving the UI files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).

## Running code style checks

Run `ng lint` to execute the code style checks.

## Building the Docker image

To build the docker image, execute the script `docker-build.sh`in the top level directory. By default the created image is tagged as latest. This script accepts the version tag
as an argument. For example, `./docker-build.sh 1.0.0` will create the docker image `codeveros\ui:1.0.0` This file performs all node and npm commands as part of the Docker build,
and does not require any setup or building of files (nor does it require node to be installed) prior to executing this script.

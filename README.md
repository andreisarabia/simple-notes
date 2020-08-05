# A simple notes application

This is a small notes app written in ~~Rust~~ **React and Node.js**.

# How to run

## tl;dr

- You should have Node running and access to a MySQL database
- Make a `config.json` file in the style of `example.config.json` in the root directory (with non-empty values)
- Run `npm run bootstrap:packages && npm run bootstrap:db && npm run bp` in the root directory

## not tl;dr

This app expects the following (in order) to run after downloading the repository:

### Have Node.js installed locally

In case you fail to satisfy this requirement, here is the link to install: [https://nodejs.org/en/download](https://nodejs.org/en/download). The app uses some new features of JavaScript (e.g. [public static class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields)), so the minimum Node version is 12.0.0. If this is a burden, please consider using [`nvm`](https://github.com/nvm-sh/nvm), as you can have multiple versions of Node installed therewith.

### Install the correct packages

Now that you have Node running, you can install the packages needed to run the app. You should run `npm run bootstrap:packages` in your CLI to install all packages. This will first run `npm i` in the root directory, then `npm i` in the `client` folder.

### Have a configured MySQL Database

The machine running this app should have access to a (running) MySQL database. Please create a file called `config.json` in the root directory, as that is where the app expects the configuration to be. The bare minimum the file expects is a `host`, `user`, `password`, and the name of the `database` to connect to. Please refer to `example.config.json` in the root directory. For more possible options, please consult the MySQL Node.js docs here: [https://github.com/mysqljs/mysql#connection-options](https://github.com/mysqljs/mysql#connection-options).

The **very** first time you run this app, you should run `npm run bootstrap:db`. This will run the script (found [here](https://github.com/andreisarabia/simple-notes/blob/master/server/database/bootstrap.js)) to create the tables in the database specified in the aforementioned `config.json`.

### And finally... run the app

Now that everything is prepped, you should run `npm run bp`. This is a convenience command for `npm run build` (which optimizes React for production) and `npm run production` (which runs the server in production mode). The app should now be running on `http://localhost:3001`.

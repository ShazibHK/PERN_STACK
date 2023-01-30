# Sequelize Mock
[![npm](https://img.shields.io/npm/v/sequelize-mock-v5.svg)](https://www.npmjs.com/package/sequelize-mock-v5) [![MIT License](https://img.shields.io/github/license/Foyer-Inc/sequelize-mock.svg)](https://github.com/Foyer-Inc/sequelize-mock)

A mocking interface designed for testing code that uses [Sequelize](http://sequelizejs.com).

## Install

```
npm i sequelize-mock-v5 --save-dev
```

## Getting Started

The Mock Models created with this library function as drop in replacements for your unit testing.

Start by importing the library

```javascript
var SequelizeMock = require('sequelize-mock-v5');
```

Initialize the library as you would Sequelize

```javascript
var DBConnectionMock = new SequelizeMock();
```

Define your models

```javascript
var UserMock = DBConnectionMock.define('users', {
		'email': 'email@example.com',
		'username': 'foyer',
		'picture': 'user-picture.jpg',
	}, {
		instanceMethods: {
			myTestFunc: function () {
				return 'Test User';
			},
		},
	});
```

Once Mock models have been defined, you can use them as drop-in replacements for your Sequelize model objects. Data is not retrieved from a database and instead is returned based on the setup of the mock objects, the query being made, and other applied or included information.

For example, your code might look something like this

```javascript
UserMock.findOne({
	where: {
		username: 'my-user',
	},
}).then(function (user) {
	// `user` is a Sequelize Model-like object
	user.get('id');         // Auto-Incrementing ID available on all Models
	user.get('email');      // 'email@example.com'; Pulled from default values
	user.get('username');   // 'my-user'; Pulled from the `where` in the query

	user.myTestFunc();      // Will return 'Test User' as defined above
});
```

## Contributing

This library is under active development, so you should feel free to submit issues, questions, or pull requests.

## License

Created by Blink UX and licensed under the MIT license. Check the LICENSE file for more information.

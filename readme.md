# Write Effect

It tracks changes, and deep changes on an object. Runs a callback whenever something changes.

## Usage

```js
import writeEffect from '@titodp/write-effect'

let state = writeEffect({}, (target, prop, value) => {
	console.log(
		'Effect found!, changed prop "' + prop + '" with value "',
		value,
		'" on the object:',
		target,
	)
})

state.size = 20

setTimeout(() => {
	state.size = 49
	setTimeout(() => {
		state.bla = {
			something: {
				well: 'test',
			},
		}
		setTimeout(() => {
			state.bla.something.well = 'yeah'
		}, 2000)
	}, 2000)
}, 2000)
```

## Install

`npm install @titodp/write-effect`

## How it works?

It uses a recursive `set` proxy trap. Keeps track of parent objects and iterates them to run the callbacks.

## Author

- https://github.com/titoBouzout

## URL

- https://github.com/titoBouzout/write-effect
- https://www.npmjs.com/package/@titodp/write-effect

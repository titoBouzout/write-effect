const parentSymbol = Symbol('Parent')
const trackSymbol = Symbol('Track')

export default function (obj, cb) {
	let ret = Track(obj)
	cb && ret.writeEffect(cb)
	return ret
}

// add the function to the set of functions to run
// whenever anything bellow this object changes
function writeEffect(cb) {
	this[trackSymbol] = this[trackSymbol] || new Set()
	this[trackSymbol].add(cb)
}

function set(target, prop, value, receiver) {
	// should skip self stuff, solid probably does something similar
	if (prop === trackSymbol || prop === parentSymbol) {
		target[prop] = value
		return true
	}

	// set the value, and parent
	if (typeof value === 'object') {
		target[prop] = Track(value)
		target[prop][parentSymbol] = target
	} else {
		target[prop] = value
	}

	// look for parent functions to run
	let parent = target
	while (parent) {
		parent[trackSymbol] && parent[trackSymbol].forEach(cb => cb(target, prop, value))
		parent = parent[parentSymbol]
	}
	return true
}
function Track(obj) {
	for (let k in obj) {
		if (typeof obj[k] === 'object') {
			obj[k] = Track(obj[k])
			obj[k][parentSymbol] = obj
		}
	}

	obj.writeEffect = writeEffect

	return new Proxy(obj, {
		set,
	})
}

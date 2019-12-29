const renameObj = (schema, obj) => Object.keys(obj).reduce((result, item) => ({
	...result,
	...{[schema[item] || item]: obj[item]}
}), {})

const renameKeys = (schema = {}, data = {} || []) =>
	(Array.isArray(data)) ? data.map(item => renameObj(schema, item)) : renameObj(schema, data)

module.exports = renameKeys

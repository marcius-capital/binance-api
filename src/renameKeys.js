// Rename Object
const renameObj = (schema, obj) => Object.keys(obj).reduce((result, item) => {
	// Rename nested Array of Objects or Array of Arrays 
	if (typeof schema[item] == "object" || typeof schema[item] == "array") {
		result[item] = obj[item]
		result[item] = rename(schema[item], obj[item])
	}
	// Rename deep Object or Array
	else if (typeof obj[item] == "object" || typeof obj[item] == "array") {
		result[schema[item] || item] = obj[item];
		result[schema[item]] = rename(schema[schema[item]], obj[item]);
	} else {
		result[schema[item] || item] = obj[item]; // rename key
	}
	return result
}, {})

// Check Object or Array
const rename = (schema = {}, data = {} || []) => {
	return Array.isArray(data) ? data.map((item) => renameObj(schema, item)) : renameObj(schema, data)
}

module.exports = rename

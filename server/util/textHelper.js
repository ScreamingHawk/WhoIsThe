module.exports = {
	toTitleCase: (str) => {
		if (str == null || str == ''){
			return str
		}
		return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
	},
}

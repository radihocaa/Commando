const ArgumentType = require('./base');

class BooleanArgumentType extends ArgumentType {
	constructor(client) {
		super(client, 'boolean');
		this.truthy = new Set(['true', 't', 'yes', 'y', 'on', 'enable', 'enabled', '1', '+', 'evet', 'tamam', 'e']);
		this.falsy = new Set(['false', 'f', 'no', 'n', 'off', 'disable', 'disabled', '0', '-', 'hayır', 'olmaz', 'hayir', 'h']);
	}

	validate(value) {
		const lc = value.toLowerCase();
		return this.truthy.has(lc) || this.falsy.has(lc);
	}

	parse(value) {
		const lc = value.toLowerCase();
		if(this.truthy.has(lc)) return true;
		if(this.falsy.has(lc)) return false;
		throw new RangeError('bilinmeyen evet hayır değeri.');
	}
}

module.exports = BooleanArgumentType;

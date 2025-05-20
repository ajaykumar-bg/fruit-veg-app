export default class UnitEnum {
	static KILOGRAM = new UnitEnum('kilogram', 'kg', 'Kilogram');

	static PIECE = new UnitEnum('piece', 'piece', 'Piece');

	static BUNCH = new UnitEnum('bunch', 'bunch', 'Bunch');

	static DOZEN = new UnitEnum('dozen', 'dozen', 'Dozen');

	constructor(name, value, label) {
		this.name = name;
		this.value = value;
		this.label = label;
		Object.freeze(this);
	}
}

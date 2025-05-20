export default class ProductCategoryEnum {
	static FRUIT = new ProductCategoryEnum('fruit', 'Fruit');

	static VEGETABLE = new ProductCategoryEnum('vegetable', 'Vegetable');

	constructor(name, desc) {
		this.name = name;
		this.desc = desc;
		Object.freeze(this);
	}
}

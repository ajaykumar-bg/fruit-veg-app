import { ProductCategoryEnum, UnitEnum } from '../enums';

const PLACEHOLDER_IMAGE_URL = 'https://placehold.co/300x200/orange/white';

export const PRODUCT_CATEGORIES = [
	{
		value: ProductCategoryEnum.FRUIT.name,
		text: ProductCategoryEnum.FRUIT.desc,
	},
	{
		value: ProductCategoryEnum.VEGETABLE.name,
		text: ProductCategoryEnum.VEGETABLE.desc,
	},
];

export const UNITS = [
	{ value: UnitEnum.KILOGRAM.name, text: UnitEnum.KILOGRAM.label },
	{ value: UnitEnum.PIECE.name, text: UnitEnum.PIECE.label },
	{ value: UnitEnum.BUNCH.name, text: UnitEnum.BUNCH.label },
	{ value: UnitEnum.DOZEN.name, text: UnitEnum.DOZEN.label },
];

export const MOCK_PRODUCTS = [
	{
		id: '1',
		name: 'Apple',
		category: ProductCategoryEnum.FRUIT.name,
		price: 2.5,
		unit: UnitEnum.KILOGRAM.name,
		stock: 100,
		image:
			'https://img.freepik.com/free-photo/delicious-red-a…b341b5acbbdd5bf830516b3cc51f96dcf98a42ad04&w=2000https://img.freepik.com/free-psd/fresh-glistening-red-apple-with-leaf-transparent-background_84443-27689.jpg?t=st=1747759758~exp=1747763358~hmac=a61ed22f97d346cf163fd24d22ddb82ea939662f331296958d77061419dd95fa&w=2000',
	},
	{
		id: '2',
		name: 'Tomato',
		category: ProductCategoryEnum.VEGETABLE.name,
		price: 3.2,
		unit: UnitEnum.KILOGRAM.name,
		stock: 80,
		image:
			'https://img.freepik.com/free-psd/tomato-fruit-isolated-transparent-background_191095-15476.jpg?semt=ais_hybrid&w=740',
	},
	{
		id: '3',
		name: 'Banana',
		category: ProductCategoryEnum.FRUIT.name,
		price: 1.8,
		unit: UnitEnum.BUNCH.name,
		stock: 50,
		image:
			'https://img.freepik.com/free-vector/vector-ripe-yellow-banana-bunch-isolated-white-background_1284-45456.jpg?semt=ais_hybrid&w=740',
	},
	{
		id: '4',
		name: 'Carrot',
		category: ProductCategoryEnum.VEGETABLE.name,
		price: 1.5,
		unit: UnitEnum.KILOGRAM.name,
		stock: 120,
		image:
			'https://img.freepik.com/free-psd/bunch-fresh-vibrant-orange-carrots-with-lush-green-tops-ready-be-enjoyed_191095-86001.jpg?semt=ais_hybrid&w=740',
	},
	{
		id: '5',
		name: 'Lettuce',
		category: ProductCategoryEnum.VEGETABLE.name,
		price: 2.0,
		unit: UnitEnum.PIECE.name,
		stock: 45,
		image:
			'https://img.freepik.com/free-photo/white-vegetable-healthy-fresh-natural_1203-5946.jpg?t=st=1747759544~exp=1747763144~hmac=be88b4648e3bb3b4e9c60e484fe8456c2ee8a2ba80df627de3a4fa8d01cf718b&w=2000',
	},
	{
		id: '6',
		name: 'Rasakadali Banana',
		category: ProductCategoryEnum.FRUIT.name,
		price: 60,
		unit: UnitEnum.KILOGRAM.name,
		stock: 50,
		image:
			'https://img.freepik.com/free-photo/top-view-bunch-bananas-isolated-black-wood_141793-7454.jpg?t=st=1747760045~exp=1747763645~hmac=9fd0f740bccb33137b1ae9703a73a81594890f18abd788dffd27f74731affc34&w=2000',
	},
	{
		id: '7',
		name: 'Pumpkin',
		category: ProductCategoryEnum.VEGETABLE.name,
		price: 40,
		unit: UnitEnum.KILOGRAM.name,
		stock: 3,
		image:
			'https://img.freepik.com/premium-photo/pumpkin-white-wall_29402-1120.jpg?w=2000',
	},
	{
		id: '8',
		name: 'Bread Fruit(Sheema Chakka)',
		category: ProductCategoryEnum.VEGETABLE.name,
		price: 60,
		unit: UnitEnum.PIECE.name,
		stock: 5,
		image:
			'https://img.freepik.com/premium-photo/maclura-pomifera-fruit-isolated-white-background_361360-2708.jpg?w=2000',
	},
	{
		id: '9',
		name: 'Jack fruit Cleaned(with seed)',
		category: ProductCategoryEnum.FRUIT.name,
		price: 100,
		unit: UnitEnum.KILOGRAM.name,
		stock: 5,
		image:
			'https://img.freepik.com/free-photo/yellow-jackfruit_74190-4803.jpg?t=st=1747763935~exp=1747767535~hmac=04b327dff6bb3ed8aa2aa29babb541933e30666387dd393794538d237161c4df&w=2000',
	},
	{
		id: '10',
		name: 'Curry Leaves',
		category: ProductCategoryEnum.VEGETABLE.name,
		price: 10,
		unit: UnitEnum.BUNCH.name,
		stock: 5,
		image:
			'https://img.freepik.com/premium-photo/fresh-curry-leaves-wood_100801-408.jpg?w=2000',
	},
	{
		id: '11',
		name: 'Pineapple',
		category: ProductCategoryEnum.FRUIT.name,
		price: 60,
		unit: UnitEnum.PIECE.name,
		stock: 5,
		image:
			'https://img.freepik.com/free-photo/raw-fresh-texture-vitamin-fruit_1172-220.jpg?t=st=1747764142~exp=1747767742~hmac=3614aad89193e883e2cadb5a8e5fcaf49af76550d797bf31cc206e54d3d42171&w=2000',
	},
	{
		id: '12',
		name: 'Rambuttan - 500gm',
		category: ProductCategoryEnum.FRUIT.name,
		price: 175,
		unit: UnitEnum.GRAMS.name,
		stock: 5,
		image:
			'https://img.freepik.com/premium-photo/full-frame-shot-rambutans_1048944-26942325.jpg?w=2000',
	},
	{
		id: '13',
		name: 'Unda Mulaku(Round Chillies)- 50gms',
		category: ProductCategoryEnum.VEGETABLE.name,
		price: 50,
		unit: UnitEnum.GRAMS.name,
		stock: 5,
		image:
			'https://www.minislifestyle.com/cdn/shop/products/undamulaku2.jpg?v=1622805089',
	},
	{
		id: '14',
		name: 'Nadan Kanthari Chillies - 50gms',
		category: ProductCategoryEnum.VEGETABLE.name,
		price: 50,
		unit: UnitEnum.GRAMS.name,
		stock: 5,
		image:
			'https://img.freepik.com/premium-photo/high-angle-view-chili-peppers-white-background_1048944-11225421.jpg?w=2000',
	},
	{
		id: '15',
		name: 'Kottukonam ripe mangoes',
		category: ProductCategoryEnum.FRUIT.name,
		price: 180,
		unit: UnitEnum.KILOGRAM.name,
		stock: 5,
		image:
			'https://veliyathgarden.com/cdn/shop/products/Kottukonam1_1445x.jpg?v=1662964674',
	},
];

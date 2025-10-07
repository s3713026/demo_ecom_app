export const COLOURS = {
    white: '#ffffff',
    black: '#000000',
    green: '#00AC76',
    red: '#C04345',
    blue: '#0043F9',
    backgroudLight: '#F0F0F3',
    backgroudMedium: '#B9B9B9',
    backgroudDark: '#777777'
};

export const Items = [
    {
        id:1,
        category: 'product',
        productName:'Product 1',
        productPrice: 100,
        description: 'This is a product description',
        isOff: true,
        offPercentage: 10,
        productImage: require('../database/images/products/Mi1.png'),
        isAvailable: true,
        productImageList:[
            require('../database/images/products/Mi1.png'),
            require('../database/images/products/Mi2.png'),
            require('../database/images/products/Mi3.png')
        ]
    },
    {
        id:2,
        category: 'product',
        productName:'Product 2',
        productPrice: 200,
        description: 'This is a product description',
        isOff: false,
        // offPercentage: 0,
        productImage: require('../database/images/products/boat1.png'),
        isAvailable: false,
        productImageList:[
            require('../database/images/products/boat1.png'),
            require('../database/images/products/boat2.png'),
            require('../database/images/products/boat3.png')
        ]
    },
    {
        id:3,
        category: 'accessory',
        productName:'Accessory 1',
        productPrice: 50,
        description: 'This is a accessory description',
        isOff: false,
        productImage: require('../database/images/accessories/boatairpods1.png'),
        isAvailable: true,
        productImageList:[
            require('../database/images/accessories/boatairpods1.png'),
            require('../database/images/accessories/boatairpods2.png'),
            require('../database/images/accessories/boatairpods3.png')
        ]
    },
    {
        id:4,
        category: 'accessory',
        productName:'Accessory 2',
        productPrice: 70,
        description: 'This is a accessory description',
        isOff: true,
        offPercentage: 10,
        productImage: require('../database/images/accessories/boatbassheads1.png'),
        isAvailable: true,
        productImageList:[
            require('../database/images/accessories/boatbassheads1.png'),
            require('../database/images/accessories/boatbassheads2.png'),
            require('../database/images/accessories/boatbassheads3.png')
        ]
    },
    {
        id:5,
        category: 'accessory',
        productName:'Accessory 3',
        productPrice: 300,
        description: 'This is a Accessory description',
        isOff: true,
        offPercentage: 15,
        productImage: require('../database/images/accessories/boatrockerz1.png'),
        isAvailable: false,
        productImageList:[
            require('../database/images/accessories/boatrockerz1.png'),
            require('../database/images/accessories/boatrockerz2.png'),
            require('../database/images/accessories/boatrockerz3.png')
        ]
    },
    {
        id:6,
        category: 'accessory',
        productName:'Accessory 4',
        productPrice: 400,
        description: 'This is a Accessory description',
        isOff: false,
        productImage: require('../database/images/accessories/boultairbass1.png'),
        isAvailable: false,
        productImageList:[
            require('../database/images/accessories/boultairbass1.png'),
            require('../database/images/accessories/boultairbass2.png'),
            require('../database/images/accessories/boultairbass3.png')
        ]
    }

]
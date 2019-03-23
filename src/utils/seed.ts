export const seed = {
    chefs: [
        { 
            name: 'Yossi Shitrit', 
            about: 
            "Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including  "+
            "running the kitchen in his first restaurant, the fondly-remembered  Violet, located in Moshav Udim.  "+
            "Shitrit's creativity and culinary acumen  born of long experience are expressed in the every detail of "+
            "each and every dish.",
            _id : '5c779750855adf072c463e29',
            restaurants : [ 
                "5c779b447a27120770299905", 
                "5c779b447a27120770299906", 
                "5c779b447a27120770299907"
            ],        
        }
    ],

    dishTags: [
        { _id: '5c798bb2443ae61016c066c2', name: 'spicy' }, 
        { _id: '5c798bb2443ae61016c066c3', name: 'vegan' }, 
        { _id: '5c798bb2443ae61016c066c4', name: 'vegetarian' }
    ],

    dishes: [
        {
            _id: '5c77a37ba1969c07aa8968a3',
            name:           'Ta Ma-La-Ko',
            price: 88,
            tags: ['5c798bb2443ae61016c066c2'],
            ingredients:    ['Green Papaya', 'Mango', 'Chukka'],
            restaurant:     '5c779b447a27120770299905' 
        },
        {
            _id: '5c77a37ba1969c07aa8968a4',
            name:           'Red Farm',
            price: 98,
            tags: ['5c798bb2443ae61016c066c3'],
            // description:    'Tofu, Spekkoek Peanuts, Spicy Manis',
            ingredients:    ['Tofu', 'Spekkoek Peanuts', 'Spicy Manis'],
            restaurant:     '5c779b447a27120770299905' 
        },
        {
            _id: '5c77a37ba1969c07aa8968a5',
            name:           '5 AM Tofu Salad',
            price: 98,
            tags: ['5c798bb2443ae61016c066c4', '5c798bb2443ae61016c066c2'],
            // description:    'Sirloin, Arugula, Scallion',
            ingredients:    ['Sirloin', 'Arugula', 'Scallion'],
            restaurant:     '5c779b447a27120770299905' 
        },
        {
            _id: '5c77a37ba1969c07aa8968a6',
            name:           'Bakka Vegitarion',
            price: 98,
            tags: ['5c798bb2443ae61016c066c2'],
            // description:    'Chinese Shallot, Kokki Yakitori',
            ingredients:    ['Chinese Shallot', 'Kokki Yakitori'],
            restaurant:     '5c779b447a27120770299905' 
        }
    ],

    restaurants: [
        { 
            _id: '5c779b447a27120770299905',
            name: 'Onza',
            chef: '5c779750855adf072c463e29',
            cuisine: 'japanese',
            menus: [],
            openingTime: {
                1: { open : 10, close: 21 },
                2: { open : 10, close: 21 },
                3: { open : 10, close: 21 },
                4: { open : 10, close: 21 },
                5: { open : 10, close: 21 },
                6: { open : 9, close: 14 },
                7: { open : 10, close: 23 }
            },
            address:     'Rabbi Hannina St. 3, Flea Market Jaffa',
            about: 'Onza - japanese restaurant'
        },
        {
            _id: '5c779b447a27120770299906',
            name: 'Kitchen Market',
            chef: '5c779750855adf072c463e29',
            cuisine: 'thai',
            menus: [],
            openingTime: {
                1: { open : 9, close: 21 },
                2: { open : 9, close: 21 },
                3: { open : 9, close: 21 },
                4: { open : 9, close: 21 },
                5: { open : 9, close: 21 },
                6: { open : 10, close: 14 },
                7: { open : 11, close: 22 }

            },
            // closingTime: 21,
            address:     'Hangar 12, Tel-Aviv Port, Farmers Market 2nd floor',
            about: 'Kitchen Market - thai restaurant'
        },
        {
            _id: '5c779b447a27120770299907',
            name: 'Mashya',
            chef: '5c779750855adf072c463e29',
            cuisine: 'japanese',
            menus: ['5c78557e3400c10defc71a45'],
            openingTime: {
                1: { open : 10, close: 21 },
                2: { open : 10, close: 21 },
                3: { open : 10, close: 21 },
                4: { open : 10, close: 21 },
                5: { open : 10, close: 21 },
                6: { open : 9, close: 14 },
                7: { open : 10, close: 23 }
            },
            // closingTime: 23,
            address:     '5 Mendeli st. Tel-Aviv (Mendeli St. Hotel)',
            about: 'Mashya - japanese restaurant'
        }
    ],

    menus: [
        {
            _id: "5c78557e3400c10defc71a45",
            restaurant: '5c779b447a27120770299905',
            content: [{  
                title: 'first', 
                dishes: ['5c77a37ba1969c07aa8968a3', '5c77a37ba1969c07aa8968a4'] 
            },{  
                title: 'salads', 
                dishes: ['5c77a37ba1969c07aa8968a5', '5c77a37ba1969c07aa8968a6'] 
            }]
        }
    ],


    users: [
        {
            _id: "5c7c36c62280dd3541a7345d",
            email: "user-new@email.com",
            password: "myPassword",
            personal: {
                firstName: "shoko",
                lastName: "boko"
            },
        }
    ]

}
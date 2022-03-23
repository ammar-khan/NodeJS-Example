const axios = require('axios');
const _ = require('lodash');
const config = require('../../config')

module.exports = {
    controller: () => {
        return new Promise(function(resolve, reject) {
            let orders, payments, prices;

            // Making API calls
            axios.all([
                axios.get(`http://localhost:${config.server.api.port}/api/orders`),
                axios.get(`http://localhost:${config.server.api.port}/api/payments`),
                axios.get(`http://localhost:${config.server.api.port}/api/prices`)
            ])
            .then(axios.spread((response1, response2, response3) => {

                // Getting API responses
                orders = response1.data;
                payments = response2.data;
                prices = response3.data;

                // Calculating total amount user has
                // [{
                //      "user": "bill",
                //      "amount": 56
                // }]
                const totalAmount = _(payments)
                    .orderBy('user', 'asc')
                    .groupBy('user')
                    .map((objects, user) => ({
                        user,
                        'amount': _.sumBy(objects, 'amount') 
                    }))
                    .value();

                // Calculating total orders user has made 
                // Adding users total amount to the data set
                // Adding unit price of the drink
                // [{
                //      "user": "bill",
                //      "amount": 56,
                //      "orders": [{
                //          "drink": "long black",
                //          "size": "medium",
                //          "price": 3.5
                //      }]
                // }]
                const totalOrdersWithAmount = _(orders)
                    .orderBy('user', 'asc')
                    .groupBy('user')
                    .map((objects, user) => ({
                        user,
                        amount: _(totalAmount)
                            .filter((obj) => {
                                return obj.user === user;
                            })
                            .reduce((acc, obj, index) => {
                                return obj.amount;
                            }, 0),
                        orders: _(objects).reduce((acc, object, index) => {
                            acc.push({
                                'drink': object.drink,
                                'size': object.size,
                                'price': _(prices)
                                    .filter((obj) => {
                                        return obj.drink_name === object.drink;
                                    })
                                    .reduce((acc, obj, index) => {
                                        return obj.prices[object.size];
                                    }, 0)
                            })

                            return acc;
                        }, [])
                    }))
                    .value();

                // Calculating total cost of users orders
                // [{
                //      "user": "bill",
                //      "amount": 56,
                //      "cost": 34.5,
                //      "orders": [{
                //          "drink": "long black",
                //          "size": "medium",
                //          "price": 3.5
                //      }]
                // }]
                const totalOrdersWithAmountAndCost = _(totalOrdersWithAmount)
                    .map((objects) => ({
                        'user': objects.user,
                        'amount': objects.amount,
                        'cost': _.sumBy(objects.orders, 'price'),
                        'orders': objects.orders
                    }))
                    .value();

                // Calculating users account balance
                // [{
                //      "user": "bill",
                //      "amount": 56,
                //      "cost": 34.5,
                //      "balance": 21.5
                //      "orders": [{
                //          "drink": "long black",
                //          "size": "medium",
                //          "price": 3.5
                //      }]
                // }]
                const totalOrdersWithAmountAndCostAndBalance = _(totalOrdersWithAmountAndCost)
                    .map((objects) => ({
                        'user': objects.user,
                        'amount': objects.amount,
                        'cost': objects.cost,
                        'balance': _.subtract(objects.amount, objects.cost),
                        'orders': objects.orders
                    }))
                    .value();

                // Return final data set
                resolve(totalOrdersWithAmountAndCostAndBalance);
            })).catch(err => {
                reject(err);
            });
            
        })
    }
}

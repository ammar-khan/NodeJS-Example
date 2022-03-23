# Coffee Orders

This example is it to build an app to fetch and parse some data associated with a coffee shop.

The app keeps track of coffee ordered, what the balance is for each user, what users have paid for already, and what is still owed.

## Data

We've got the following data
- `data/prices.json` - provided by our barista. Has details of what beverages are available, and what their prices are.
- `data/orders.json` - list of beverages ordered by users of the app.
- `data/payments.json` - list of payments made by users paying for items they have purchased.

## Output

  ```
  [
    { "user": "coach",    "order_total": 5.00, "payment_total": 2.50, "balance": 2.50 },
    { "user": "ellis",    "order_total": 6.15, "payment_total": 6.15, "balance": 0.00 },
    { "user": "rochelle", "order_total": 6.90, "payment_total": 4.50, "balance": 2.40 },
    { "user": "zoey",     "order_total": 2.30, "payment_total": 0.00, "balance": 2.30 }
  ]
  ```

## APIs 
Orders API
```
GET http://localhost:5000/api/orders
```

Payments API
```
GET http://localhost:5000/api/payments
```

Prices API
```
GET http://localhost:5000/api/prices
```

## Application
```
http://localhost:8080/
```

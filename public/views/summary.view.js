const _ = require('lodash');

module.exports = {
    view: (data) => {

        // Construct view dataset
        const dataset = _(data).reduce((acc, object, index) => {
            acc.push({
                'user': object.user,
                'amount': object.amount,
                'cost': object.cost,
                'balance': object.balance
            })

            return acc;
        }, []);

        // Create view template
        const template = _.template(
            "<table border='1'>" + 
                "<tr>" + 
                    "<th>User Name</th>" + 
                    "<th>Total Amount</th>" + 
                    "<th>Total Amount Spent</th>" + 
                    "<th>Balance Amount</th>" + 
                "</tr>" +
                "<% _.forEach(dataset, function(item) { %>" +
                "<tr>" + 
                    "<td><%= _.capitalize(item.user) %></td>" + 
                    "<td align='right'>$<%= item.amount.toFixed(2) %></td>" + 
                    "<td align='right'>$<%= item.cost.toFixed(2) %></td>" + 
                    "<td align='right'>$<%= item.balance.toFixed(2) %></td>" + 
                "</tr>" + 
                "<% }); %>" +
            "</table>"
        )({ dataset: dataset });
            
        // Return template
        return template;
    }
}

jQuery.sap.require("sap.ui.core.format.DateFormat");
sap.ui.define([],
    function () {
        "use strict";

        return {

            formatStockState: function (sStock) {

                var nStock = parseInt(sStock);
               
                if (nStock === 0) {
                    return "Error";
                } else if (nStock > 10) {
                    return "Success";
                } else {
                    return "Warning";
                }; 
                
            },

            formatStockText: function(sStock) {

                var nStock = parseInt(sStock);

                if (nStock === 0) {
                        return "Out Of Stock";
                    } else if (nStock > 10) {
                        return "In Stock";
                    } else {
                        return "Little Stock";
                    };
            },

            formatPrice: function(sPrice) {
                var nPrice = (parseFloat(sPrice)).toFixed(2);

                return nPrice;
            }

        };
    }, true);
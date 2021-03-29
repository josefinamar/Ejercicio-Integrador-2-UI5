sap.ui.define([],
    function () {
        "use strict";

        return {
            models: {
                MODEL_PRODUCTS:{
                    name: "modelProducts",
                    services: {
                        entity: "/V3/Northwind/Northwind.svc/Products"
                    }
                },
                MODEL_PRODUCT_SELEC:{
                    name: "productoSeleccionado"
                },
                MODEL_CATEGORY:{
                    name: "modelCategory"
                },
                MODEL_SUPPLIER:{
                    name: "modelSupplier"
                }
            },

            // ids: {
            //     FRAGMENTS: {
            //         dialog: "idDialogo",
            //         table: "idTableProductos",
            //         searchField: "idSearch"
            //     }
            // },
            
            // routes: {
            //     FRAGMENTS:{
            //         table: "EjercicioFragment.EjercicioFragment.fragments.Tabla"
            //     }
            // }
        };
    }, true);
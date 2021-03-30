sap.ui.define([],
    function () {
        "use strict";

        return {
            models: {
                MODEL_PRODUCTS:{
                    name: "modelProducts",
                    services: {
                        entity: "/V3/Northwind/Northwind.svc/Products"
                    },
                    properties: {
                        productN: "ProductName",
                        productPrice: "UnitPrice"
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
                },
                MODEL_CONTADOR:{
                    name: "modelContadorProductos"
                }
            },

            objects: {
                FILTERS: {
                    name: "Filters"
                }
            },

            ids: {
                MASTERVIEW: {
                    list: "idList"     
                },
                FRAGMENTS:{
                    panelHeader: {
                        id: "pHeader",
                        panel: "idPanelDetail"
                    }
                }
            },
            
            routes: {
                FRAGMENTS:{
                    sort: "EjercicioIntegrador2.EjercicioIntegrador2.fragments.SortDialog",
                    edit: "EjercicioIntegrador2.EjercicioIntegrador2.fragments.EditDialog"
                }
            }
        };
    }, true);
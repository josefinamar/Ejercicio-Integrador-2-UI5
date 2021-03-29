sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "EjercicioIntegrador2/EjercicioIntegrador2/utils/Services",
    "EjercicioIntegrador2/EjercicioIntegrador2/utils/Constants",
    "EjercicioIntegrador2/EjercicioIntegrador2/utils/Formatters",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Services, Constants, Formatters, Filter, FilterOperator, Fragment) {
        "use strict";

        return Controller.extend("EjercicioIntegrador2.EjercicioIntegrador2.controller.Master", {
            Formatter: Formatters,
            onInit: function () {

                this.getOwnerComponent().getRouter().getRoute("RouteMaster").attachPatternMatched(this._onRouteMatched, this)
            },

            // loadModel: async function() {
            //     var oModel = await this.getOwnerComponent().getModel("modelProducts");

            //     var oProductoSelec = oModel.getProperty("/value/0");

            //     let oModelProdSelec = new JSONModel(oProductoSelec);
            //     oModelProdSelec.setData(oProductoSelec);

            //     this.getOwnerComponent().setModel(oModelProdSelec, "productoSeleccionado");
            // },

            _onRouteMatched: function (oEvent) {

                // this.loadModel();

                this.getOwnerComponent().getRouter().navTo("RouteDetail");
            },

            loadModelCategory: async function (oProduct) {

                const oResponse = await Services.getCategory(oProduct);

                const oDataCategory = oResponse[0];

                let oModelCategory = new JSONModel();
                oModelCategory.setData(oDataCategory);

                this.getOwnerComponent().setModel(oModelCategory, Constants.models.MODEL_CATEGORY.name);
            },

            loadModelSupplier: async function (oProduct) {

                const oResponse = await Services.getSupplier(oProduct);

                const oDataSupplier = oResponse[0];

                let oModelSupplier = new JSONModel();
                oModelSupplier.setData(oDataSupplier);

                this.getOwnerComponent().setModel(oModelSupplier, Constants.models.MODEL_SUPPLIER.name);
            },

            onListItemPress: function (oEvent) {
                var sProductId = oEvent.getSource().getSelectedItem().getBindingContext(Constants.models.MODEL_PRODUCTS.name).getPath();
                // ----------------Tomar los datos del item seleccionado    
                var oModel = this.getOwnerComponent().getModel(Constants.models.MODEL_PRODUCTS.name);
                var oProductoSelec = oModel.getProperty(sProductId);

                var oModelProdSelec = new JSONModel();
                oModelProdSelec.setData(oProductoSelec);

                this.getOwnerComponent().setModel(oModelProdSelec, Constants.models.MODEL_PRODUCT_SELEC.name);

                // ----------------Guardar su ID para pasarselo a la funcion de Category y Supplier

                var oProductoID = oModel.getProperty(sProductId + "/ProductID");

                this.loadModelCategory(oProductoID);

                this.loadModelSupplier(oProductoID);
            },

            onSearch: function (oEvent) {

            var sQuery = oEvent.getSource().getValue();

            if (sQuery && sQuery.length > 0) {
                var oFilterName = new Filter("ProductName", FilterOperator.Contains, sQuery);

                var oFilterPrice = new Filter("UnitPrice", FilterOperator.Contains, sQuery);

                var oFilters = new Filter([oFilterName, oFilterPrice]);
            }

            var oList = this.byId("idList");

            var oBindingInfo = oList.getBinding("items");
            oBindingInfo.filter(oFilters, "Filters");

            }
        });
    });
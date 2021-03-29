sap.ui.define([
		"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "EjercicioIntegrador2/EjercicioIntegrador2/utils/Services",
    "EjercicioIntegrador2/EjercicioIntegrador2/utils/Constants"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller,  JSONModel, Filter, FilterOperator, Fragment, Services, Constants) {
		"use strict";

		return Controller.extend("EjercicioIntegrador2.EjercicioIntegrador2.controller.App", {
			onInit: function () {
                this.loadModel();
			},

            loadModel: async function () {

                const oResponse = await Services.getProducts();

                const oDataProducts = oResponse[0];

                var oModelProducts = new JSONModel();
                oModelProducts.setData(oDataProducts);

                const oComponent = this.getOwnerComponent();
                oComponent.setModel(oModelProducts, Constants.models.MODEL_PRODUCTS.name);
            }
		});
	});

sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment",
        "EjercicioIntegrador2/EjercicioIntegrador2/utils/Constants",
        "EjercicioIntegrador2/EjercicioIntegrador2/utils/Formatters"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, Fragment, Constants, Formatters) {
		"use strict";

		return Controller.extend("EjercicioIntegrador2.EjercicioIntegrador2.controller.Detail", {
            Formatter: Formatters,
			onInit: function () {
              
            },
            
            onPress: function (oEvent) {

            var oView = this.getView();

            if (!this.pDialog) {
                this.pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "EjercicioIntegrador2.EjercicioIntegrador2.fragments.EditDialog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            };

            this.pDialog.then(function (oDialog) {
                oDialog.open();
            }.bind(this));

            },

            onClose: function (oEvent) {
                oEvent.getSource().getParent().close();
            }
		});
	});
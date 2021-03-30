sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "EjercicioIntegrador2/EjercicioIntegrador2/utils/Constants",
    "EjercicioIntegrador2/EjercicioIntegrador2/utils/Formatters",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, Constants, Formatters, MessageBox, MessageToast, JSONModel) {
        "use strict";

        return Controller.extend("EjercicioIntegrador2.EjercicioIntegrador2.controller.Detail", {
            Formatter: Formatters,
            onInit: function () {
                let oFragment = this.getView().createId(Constants.ids.FRAGMENTS.panelHeader.id);
                sap.ui.core.Fragment.byId(oFragment, Constants.ids.FRAGMENTS.panelHeader.panel).setExpanded(true);
            },
            //--------Función que crea y abre el Edit Dialog para editar la indormación
            onPress: function (oEvent) {

                var oView = this.getView();

                if (!this.pDialog) {
                    this.pDialog = Fragment.load({
                        id: oView.getId(),
                        name: Constants.routes.FRAGMENTS.edit,
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

            //----------Función que cierra el Edit Dialog
            onClose: function (oEvent) {
                oEvent.getSource().getParent().close();
            },

            //----------Función que abre el Message confirm al presionar el boton DELETE
            onPressDelete: function () {
                MessageBox.confirm("Desea borrar los datos?");
            },

            //----------Función que abre el MessageToast al presionar el boton COPY
            onPressCopy: function () {
                var message = "Copiado en el portapapeles";
                MessageToast.show(message);
            }
        });
    });
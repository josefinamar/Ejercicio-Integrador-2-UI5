sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "EjercicioIntegrador2/EjercicioIntegrador2/utils/Services",
    "EjercicioIntegrador2/EjercicioIntegrador2/utils/Constants",
    "EjercicioIntegrador2/EjercicioIntegrador2/utils/Formatters",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/Device",
    "sap/ui/model/Sorter"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Services, Constants, Formatters, Filter, FilterOperator, Fragment, Device, Sorter) {
        "use strict";

        return Controller.extend("EjercicioIntegrador2.EjercicioIntegrador2.controller.Master", {
            Formatter: Formatters,
            onInit: function () {
                this.loadModel();

            },

            //------------Función que trae los Productos 
            loadModel: async function () {

                const oResponse = await Services.getProducts();

                const oDataProducts = oResponse[0];

                var oModelProducts = new JSONModel();
                oModelProducts.setData(oDataProducts);

                const oComponent = this.getOwnerComponent();
                oComponent.setModel(oModelProducts, Constants.models.MODEL_PRODUCTS.name);

                //-------- Seteo el value 0 de la lista de items del modelo modelProducts para que lo guarde en el modelo productoSeleccionado y cargue esos datos en el Detail al iniciar la app
                if (!Device.system.phone) {
                    var oProductoSelec = oModelProducts.getProperty("/value/0");

                    let oModelProdSelec = new JSONModel(oProductoSelec);
                    oModelProdSelec.setData(oProductoSelec);

                    this.getOwnerComponent().setModel(oModelProdSelec, Constants.models.MODEL_PRODUCT_SELEC.name);
                }

                //-----------Guarda la la cantidad de items (del modelProducts) en el modelContadorProductos para poder mostrarla al inicio en el nombre de la lista en el Master.
                var oItems = oModelProducts.getData();
                oItems = oItems.value.length;

                var oModelProductsLength = new JSONModel();
                oModelProductsLength.setData(oItems);

                this.getOwnerComponent().setModel(oModelProductsLength, Constants.models.MODEL_CONTADOR.name);
            },


            //------------Función que navega automaticamente al detail al iniciar la app
            _onRouteMatched: function (oEvent) {
                this.getOwnerComponent().getRouter().navTo("RouteDetail");
            },


            //------------Función que trae la información de Categoria con el id del Producto
            loadModelCategory: async function (oProduct) {

                const oResponse = await Services.getCategory(oProduct);

                const oDataCategory = oResponse[0];

                let oModelCategory = new JSONModel();
                oModelCategory.setData(oDataCategory);

                this.getOwnerComponent().setModel(oModelCategory, Constants.models.MODEL_CATEGORY.name);
            },


            //------------Función que trae la información del Proveedor con el id del Producto
            loadModelSupplier: async function (oProduct) {

                const oResponse = await Services.getSupplier(oProduct);

                const oDataSupplier = oResponse[0];

                let oModelSupplier = new JSONModel();
                oModelSupplier.setData(oDataSupplier);

                this.getOwnerComponent().setModel(oModelSupplier, Constants.models.MODEL_SUPPLIER.name);
            },


            //-----------Función que se ejecuta al seleccionar un item de la lista de productos, actualiza los datos del modelo productoSeleccionado para que se puedan mostrar en el Detail.
            onListItemPress: function (oEvent) {
                var sProductId = oEvent.getSource().getSelectedItem().getBindingContext(Constants.models.MODEL_PRODUCTS.name).getPath();

                // ----------------Toma los datos del item seleccionado    
                var oModel = this.getOwnerComponent().getModel(Constants.models.MODEL_PRODUCTS.name);
                var oProductoSelec = oModel.getProperty(sProductId);

                var oModelProdSelec = new JSONModel();
                oModelProdSelec.setData(oProductoSelec);

                this.getOwnerComponent().setModel(oModelProdSelec, Constants.models.MODEL_PRODUCT_SELEC.name);

                // ----------------Guarda su ID para pasarselo a la funcion de Category y Supplier

                var oProductoID = oModel.getProperty(sProductId + "/ProductID");

                this.loadModelCategory(oProductoID);

                this.loadModelSupplier(oProductoID);
            },


            //-------------Función que ejecuta los filtros por nombre y precio en el searchfield de la lista de productos, actualiza el length de la lista de items y con eso el modelContadorProductos
            onSearch: function (oEvent) {

                var sQuery = oEvent.getSource().getValue();

                if (sQuery && sQuery.length > 0) {
                    var oFilterName = new Filter(Constants.models.MODEL_PRODUCTS.properties.productN, FilterOperator.Contains, sQuery);

                    var oFilterPrice = new Filter(Constants.models.MODEL_PRODUCTS.properties.productPrice, FilterOperator.Contains, sQuery);

                    var oFilters = new Filter([oFilterName, oFilterPrice]);
                }

                var oList = this.byId(Constants.ids.MASTERVIEW.list);

                var oBindingInfo = oList.getBinding("items");
                oBindingInfo.filter(oFilters, Constants.objects.FILTERS.name);

                //------------Actualiza la cantidad de items en el modelContadorProductos.

                var oItems = oList.getItems().length;
                var oContador = new JSONModel();
                oContador.setData(oItems);

                this.getOwnerComponent().setModel(oContador, Constants.models.MODEL_CONTADOR.name);

            },

            
            //------------Funciones que crean y abren el Sort Dialog

            createViewSettingsDialog: function (sDialogFragmentName) {
                var oDialog;
                oDialog = sap.ui.xmlfragment(sDialogFragmentName, this);
                this.getView().addDependent(oDialog);

                if (Device.system.desktop) {
                    oDialog.addStyleClass("sapUiSizeCompact");
                }
                return oDialog;
            },

            onSort: function () {
                this.createViewSettingsDialog(Constants.routes.FRAGMENTS.sort).open();
            },

            //---------Función que pasa los parametros para hacer el sort, se dispara al presionar confirm (OK) en el dialog.
            onSortDialogConfirm: function (oEvent) {
                var oList = this.byId(Constants.ids.MASTERVIEW.list),
                    mParams = oEvent.getParameters(),
                    oBinding = oList.getBinding("items"),
                    sPath,
                    bDescending,
                    aSorters = [];
                sPath = mParams.sortItem.getKey();
                bDescending = mParams.sortDescending;
                aSorters.push(new Sorter(sPath, bDescending));
                oBinding.sort(aSorters);
            }

        });
    });
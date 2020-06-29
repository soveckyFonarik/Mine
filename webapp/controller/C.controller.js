sap.ui.define(["sap/m/Button",
    "sap/m/Dialog",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/m/Text",
    "sap/m/library",
    "sap/ui/core/IconPool",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    "sap/base/Log"
], function (Button, Dialog, List, StandardListItem, Text, mobileLibrary, IconPool, JSONModel, MessageToast, Controller, Log) {
    "use strict";

    return Controller.extend("sap.m.sample.SplitApp.C", {

        onInit: function () {
            this.getSplitAppObj().setHomeIcon({
                'phone': 'phone-icon.png',
                'tablet': 'tablet-icon.png',
                'icon': 'desktop.ico'
            });
        },

        onOrientationChange: function (oEvent) {
            var bLandscapeOrientation = oEvent.getParameter("landscape"),
                sMsg = "Orientation now is: " + (bLandscapeOrientation ? "Landscape" : "Portrait");
            MessageToast.show(sMsg, {duration: 5000});
        },

        onDraggableDialog: function () {
            if (!this.draggableDialog) {
                this.draggableDialog = new Dialog({
                    title: "Draggable Available Products",
                    contentWidth: "550px",
                    contentHeight: "300px",
                    draggable: true,
                    content: new List({
                        items: {
                            path: "/ProductCollection",
                            template: new StandardListItem({
                                title: "{Name}",
                                counter: "{Quantity}"
                            })
                        }
                    }),
                    endButton: new Button({
                        text: "Close",
                        press: function () {
                            this.draggableDialog.close();
                        }.bind(this)
                    })
                });

                //to get access to the global model
                this.getView().addDependent(this.draggableDialog);
            }

            this.draggableDialog.open();
        },



        onListItemPress: function (oEvent) {
            var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

            this.getSplitAppObj().toDetail(this.createId(sToPageId));
        },

        getSplitAppObj: function () {
            var result = this.byId("SplitAppDemo");
            if (!result) {
                Log.info("SplitApp object can't be found");
            }
            return result;
        }

    });
});
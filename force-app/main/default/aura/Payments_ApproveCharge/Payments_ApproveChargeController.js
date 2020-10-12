({
	 handleConfirm : function(component, event, helper) {
        //Find lightning flow from component
        var flow = component.find("CloseCaseFlow");
        //Put input variable values
        var inputVariables = [
            {
                name : "recordId",
                type : "String",
                value : component.get("v.recordId")
            }
        ];
        //Reference flow's Unique Name
        flow.startFlow("Case_Close", inputVariables);
    },
    
    //Flow Status Change
    statusChange : function (component, event, helper) {
        //Check Flow Status
        if (event.getParam('status') === "FINISHED_SCREEN" || event.getParam('status') === "FINISHED") {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: "Success!",
                message: "Processing Charge Updated to 3.5% successfully!",
                type: "success"
            });
            toastEvent.fire();
            
            $A.get('e.force:refreshView').fire();
        } else if (event.getParam('status') === "ERROR") {
            component.set("v.hasError", true);
        }
    }
})
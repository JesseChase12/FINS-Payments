({
    createCase : function(component, event, helper) {
        
        helper.showSpinner(component);
        
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        console.log(userId);
        console.log(component.find('reqType').get('v.value'));
        console.log(component.find('reqCat').get('v.value'));
        console.log(component.find('reason').get('v.value'));
        console.log(component.get("v.transLimit"));
        
        var action = component.get("c.insertCovidCase");
        action.setParams({
            userId : userId,
            type : component.find('reqType').get('v.value'),
            subject : component.find('reqCat').get('v.value'),
            reason : component.find('reason').get('v.value'),
            amt : component.get("v.transLimit")
        }); 
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log("after response- " + state);
            
            if (state === "SUCCESS") { 
                console.log("after success- " + response.getReturnValue());
                var address = '/case/' + response.getReturnValue();
                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url": address,
                    "isredirect": "true"
                });
                urlEvent.fire();
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            helper.hideSpinner(component);
        });
        $A.enqueueAction(action);  
    },
        
    resetForm : function(component,event,helper){
        $A.get('e.force:refreshView').fire();
    }
})
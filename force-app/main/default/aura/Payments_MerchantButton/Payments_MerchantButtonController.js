({
	handleClick : function(component, event, helper) {
		var address = '/merchant-request';
                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url": address,
                    "isredirect": "true"
                });
                urlEvent.fire();
	}
})
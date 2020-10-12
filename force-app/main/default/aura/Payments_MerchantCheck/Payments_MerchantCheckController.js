({
    handleVerify : function(component, event, helper) {
        var firstTarget = component.find('first');
        $A.util.addClass(firstTarget, 'hide');
        $A.util.removeClass(firstTarget, 'show');
        
        
        
        var spinnerTarget = component.find('spinner');
        $A.util.addClass(spinnerTarget, 'show');
        $A.util.removeClass(spinnerTarget, 'hide');
        
        window.setTimeout(
            $A.getCallback(function() {
                var secondTarget = component.find('second');
                $A.util.addClass(secondTarget, 'show');
                $A.util.removeClass(secondTarget, 'hide');
                
                var spinnerTarget = component.find('spinner');
                $A.util.addClass(spinnerTarget, 'hide');
                $A.util.removeClass(spinnerTarget, 'show');
                
            }), 3000
        );   
        
    }
})
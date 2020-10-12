global class Payments_CallTaxValidationFlowList {
        @InvocableMethod(label='JsonTypeCode Input Tax id - Validation status' description='Returns Validation info')
     global static List<String> makeGetCallout(List<String> inputtaxidlist) {
    Http httpProtocol = new Http();
        HttpRequest request = new HttpRequest();
         request.setTimeout(20000);
        String endpoint = 'https://my-json-server.typicode.com/apeksh/demo/taxvalidation';
        request.setEndPoint(endpoint);
        request.setMethod('GET');
        HttpResponse response = httpProtocol.send(request);
        System.debug(response.getBody());
        JSONParser parser = JSON.createParser(response.getBody());
        String statusTemp;
        String taxidTemp;
        String statusNotFound;
        statusTemp = null;
        taxidTemp = null; 
        statusNotFound = 'NotFound'; 
        while (parser.nextToken() != null) {
             if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && 
                (parser.getText() == 'taxid')) {
                parser.nextToken();
                taxidTemp = parser.getText();    
                system.debug('taxidTemp =' + taxidTemp);
                }
            if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && 
                (parser.getText() == 'status')) {
                parser.nextToken();
                statusTemp =  parser.getText();   
                system.debug('statusTemp  =' + statusTemp);
                }
            if (taxidTemp != null && statusTemp != null)
            {
                if (taxidTemp == inputtaxidlist.get(0))
                {
                    return new List<String>{statusTemp};
                }
                else
                {
                    taxidTemp = null;
                    statusTemp = null;
                }
            }
         }
        return new List<String>{statusNotFound};
    }
}
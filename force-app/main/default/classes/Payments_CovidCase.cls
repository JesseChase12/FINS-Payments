public class Payments_CovidCase {
    
    @AuraEnabled
    public static String insertCovidCase(Id userId,String type,String subject, String reason, Double amt){
        String resId;
        String caseRecordType = Schema.Sobjecttype.Case.getRecordTypeInfosByName().get('Simple Banking').getRecordTypeId();    
        User u = [SELECT Id,AccountId,ContactId,IsActive,IsPortalEnabled,
                  Name,ProfileId FROM User WHERE Id = :userId];
        Case covidCase = new Case();
        
        covidCase.Subject = subject;
        covidCase.Type = type;
        covidCase.Reason = reason;
        covidCase.Description= 'Update Monthly Sales Amount to $' + amt.format();
        covidCase.Origin = 'Community';
        covidCase.Priority = 'High';
        covidCase.ContactId = u.ContactId;
        covidCase.AccountId = u.AccountId;
        covidCase.RecordTypeId = caseRecordType;
        
        insert covidCase;
        system.debug('case inserted-'+ covidCase.Id);
        return covidCase.Id;
        
    }

}
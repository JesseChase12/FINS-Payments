sfdx shane:org:create -f config/project-scratch-def.json -d 1 -s --json --userprefix int -o work.shop
sfdx force:source:push
sfdx force:user:permset:assign -n Payments_Business_User
sfdx force:user:permset:assign -n Payments_Partner_Access
sfdx force:apex:execute -f scripts/appllyPermSets.cls
sfdx force:org:open
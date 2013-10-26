var util = require('util');

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

var sshConfigHostTemplate = 'Host %s\nHostname %s\nUser %s';
var userName = 'juboyd';

function sshify(fullHostName) {
    
    function extractAlias(fullHostName) {

        var splitHost = fullHostName.split('-');
        
        var envName = scrubEnvName(splitHost[2]);
        var context = scrubContext(splitHost[3]);
        
        function scrubEnvName(toScrub) { 
            if (toScrub.contains('qa')) 
            { 
                return 'qa'; 
            } else if (toScrub.contains('stg')) 
            { 
                return 'stg'; 
            } 
        }
        function scrubContext(toScrub) {
            if (toScrub.contains('fe')) {
                return 'fe';
            } else if (toScrub.contains('db')) {
                return 'db';
            } else if (toScrub.contains('solr')) {
                return 'solr';
            } else if (toScrub.contains('es')) {
                return 'es';
            } else if (toScrub.contains('mq')){
                return 'mq';
            } else {
                return 'default';
            }
        }
        
        return envName + '-' + splitHost[1] + '-' + context;
    }
    
    var splitHost = fullHostName.split('-');
    var sshConfig = util.format(sshConfigHostTemplate, 
        extractAlias(fullHostName),
        fullHostName,
        userName);
        
    console.log(sshConfig + '\n');
};

[
    'lvs-atlas-qa1-fe3001.qa.paypal.com',
    'lvs-atlas-qa1-mongodb3001.qa.paypal.com',
    'lvs-atlas-stg1-fe3001.qa.paypal.com',
    'lvs-atlas-stg1-mongodb3001.qa.paypal.com',
    'lvs-esapi-qa1-fe3001.qa.paypal.com',
    'lvs-esapi-stg1-fe3001.qa.paypal.com',
    'lvs-geo-qa1-fe3001.qa.paypal.com',
    'lvs-geo-stg1-fe3001.qa.paypal.com',
    'lvs-metro-qa1-fe3001.qa.paypal.com',
    'lvs-metro-qa1-mongodb3001.qa.paypal.com',
    'lvs-metro-stg1-fe3001.qa.paypal.com',
    'lvs-metro-stg1-mongodb3001.qa.paypal.com',
    'lvs-metrofm-qa1-fe3001.qa.paypal.com',
    'lvs-metrofm-stg1-fe3001.qa.paypal.com',
    'lvs-places-qa1-fe3001.qa.paypal.com',
    'lvs-places-stg1-fe3001.qa.paypal.com',
    'lvs-point-qa1-mq3001.qa.paypal.com',
    'lvs-point-stg1-mq3001.qa.paypal.com',
    'lvs-sifter-qa1-fe3001.qa.paypal.com',
    'lvs-sifter-qa1-solr3001.qa.paypal.com',
    'lvs-sifter-stg1-fe3001.qa.paypal.com',
    'lvs-sifter-stg1-solr3001.qa.paypal.com',
    'lvs-trinity-qa1-fe3001.qa.paypal.com',
    'lvs-trinity-stg1-fe3001.qa.paypal.com',
    'lvs-zeto-qa1-fe3001.qa.paypal.com',
    'lvs-zeto-qa1-solr3001.qa.paypal.com',
    'lvs-zeto-stg1-fe3001.qa.paypal.com',
    'lvs-zeto-stg1-solr3001.qa.paypal.com'
].forEach(sshify);



const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//Mailer will inherit features form Mail (which exists in sendgrid)
class Mailer extends helper.Mail {
    constructor({ umfrage, recipients}, content) {
        // es2015 sintax
        super();

        this.sendgridAPI = sendgrid(keys.SEND_GRID_KEY);
        // helper is helping to format those things for sendGrid 
        // define sender 
        this.from_email = new helper.Email('no-reply@nodekurs.com');
        this.subject = umfrage.subject;
        // this comes from our template.. NOT the body of the umfrage  
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    removeDuplicateRecipients (recipients) {
 
        let emailHashMap = {}; 
        let newRecipientsList = []; 
        recipients.forEach( (entry) => {
 
            let email = entry.email;
            if(emailHashMap[email]) {
                return; 
            }
            
            newRecipientsList.push(entry);
            emailHashMap[email] = true; 
 
        } );
 
        return newRecipientsList;
    } 

    formatAddresses(recipients){
         var array = recipients.map(email => {
            console.log('Splitted in Mailer email is '+email);
            return new helper.Email(email);
        });

        recipients = this.removeDuplicateRecipients(array);
        return recipients;  
    }

    // just has to be so.. *.*
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    //iterate over the formatted array 
    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(reciptient => {
            console.log('whats happening  with the recipient?' +JSON.stringify(reciptient));
            personalize.addTo(reciptient);
        });
        this.addPersonalization(personalize);
    }

    //now the function  to send finally !!!
    async send() {
        const request =  this.sendgridAPI.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
        const response = await this.sendgridAPI.API(request);
        return response;
    }
}
module.exports = Mailer;

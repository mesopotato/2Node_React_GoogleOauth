//
const keys = require('../../config/keys');

// here we can specify routes for the diffenet answers .. we have the same links for both answers.. 
module.exports = (umfrage) => {
   return `
      <html>
         <body>
            <div style="text-align: center;">
               <h3> H3 geilo </h3>
               <p>halo questioin in p tag</p>
               <p>${umfrage.body}</p>
               <div>
                  <a href="${keys.REDIRECT_DOMAIN}/umfrage/thanks">YES</a>
               </div>
               <div>
                  <a href="${keys.REDIRECT_DOMAIN}/umfrage/thanks">NO</a>
               </div>
         </body>
      </html>
   `;
};
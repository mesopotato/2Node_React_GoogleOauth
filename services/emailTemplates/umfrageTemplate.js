module.exports = (umfrage) => {
   return `
      <html>
         <body>
            <div style="text-align: center;">
               <h3> H3 geilo </h3>
               <p>halo questioin in p tag</p>
               <p>${umfrage.body}</p>
               <div>
                  <a href="http://localhost:3000">YES</a>
               </div>
               <div>
                  <a href="http://localhost:3000">NO</a>
               </div>
         </body>
      </html>
   `;
};
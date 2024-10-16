const cds = require('@sap/cds');
const { create } = require('xmlbuilder2');
const axios = require('axios');
module.exports = cds.service.impl(async function () {
const {railway}=this.entities
    this.on('convertToXML','railway', async (req) => {
        console.log(req.params);
        const { ID } = req.params[0];  
        const rowData = await SELECT.one.from(railway).where({ ID: ID });

        if (!rowData) {
            return req.error(404, `No data found for ID: ${ID}`);
        }

        console.log("Row data:", rowData);
        const xmlData = create({ version: '1.0', encoding: 'UTF-8' })
            .ele('railway')  // Root element
            .ele('ID').txt(rowData.ID).up()
            .ele('pnr_no').txt(rowData.pnr_no).up()
            .ele('trn').txt(rowData.trn).up()
            .ele('from_add').txt(rowData.from_add).up()
            .ele('to_add').txt(rowData.to_add).up()
            .ele('berth_selected').txt(rowData.berth_selected).up()
            .ele('doj').txt(rowData.doj).up()
            .ele('class').txt(rowData.classs).up()
            .end({ prettyPrint: true });  
        console.log("Generated XML:", xmlData);
        const base64EncodedXML = Buffer.from(xmlData).toString('base64');

        console.log("Base64 Encoded XML:", base64EncodedXML);
        try {
          const authResponse = await axios.get('https://chembonddev.authentication.us10.hana.ondemand.com/oauth/token', {
              params: {
                  grant_type: 'client_credentials'
              },
              auth: {
                  username: 'sb-ffaa3ab1-4f00-428b-be0a-1ec55011116b!b142994|ads-xsappname!b65488',
                  password: 'e44adb92-4284-4c5f-8d41-66f8c1125bc5$F4bN1ypCgWzc8CsnjwOfT157HCu5WL0JVwHuiuwHcSc='
              }
          });
          const accessToken = authResponse.data.access_token;
          console.log("Access Token:", accessToken);
          const pdfResponse = await axios.post('https://adsrestapi-formsprocessing.cfapps.us10.hana.ondemand.com/v1/adsRender/pdf?templateSource=storageName', {
              xdpTemplate: "PrePrintedLabel/Default",
              xmlData: base64EncodedXML, 
              formType: "print",
              formLocale: "",
              taggedPdf: 1,
              embedFont: 0
          }, {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
              }
          });
          const fileContent = pdfResponse.data.fileContent;
          console.log("File Content:", fileContent);
          return fileContent;

      } catch (error) {
          console.error("Error occurred:", error);
          return req.error(500, "An error occurred while processing your request.");
      }
        

       
    });
});

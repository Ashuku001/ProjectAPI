const {colors} = require('colors')
const axios = require("axios");
const messageTemplates = require("./messageTemplates.js"); // message Templates
// const products = require("./models/products.js"); // and the products we are selling

// environment variables
const accessToken = process.env.ACCESS_TOKEN;
const apiVersion = process.env.API_VERSION;
const recipientNumber = process.env.RECIPIENT_PHONE_NUMBER;
const myNumberId = process.env.PHONE_NUMBER_ID;
const myBizAcctId = process.env.BUSINESS_ACCOUNT_ID;


const products = {} // should be from the database

// console.log(
//   "MESSAGE HELPER ",
//   "access token: ",
//   accessToken,
//   " api version: ",
//   apiVersion,
//   " recipient number: ",
//   recipientNumber,
//   " my Number id: ",
//   myNumberId,
//   " my biz account: ",
//   myBizAcctId
// );

// send message data with the write configuration
// pass in the data we are sending including the recipient phone number
async function sendWhatsAppMessage(data, appSettings) {
  // console.log('THE DATA TO SEND', data)
  // console.log("APP SETTINGS IN SENDWHATSAPP##############################", appSettings)
  const config = {
    method: "post",
    url: `https://graph.facebook.com/${appSettings.API_VERSION}/${appSettings.PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${appSettings.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  try{

    return await axios(config);
  } catch(error){
    console.log(`An error occured while sending message1 ${error.message}`.bgRed)
    if(error.code === "131030"){
      console.log("Recipient phone number not in allowed list: Add recipient phone number to recipient list and try again.".bgRed)
      return
    }
  }

}

async function sendReceivedDataToclient(data) {
  const config = {
    method: "post",
    url: `http://localhost:3000/api/webhookData`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
}

// update the whatsapp message
async function updateWhatsAppMessage(data) {
  const config = {
    method: "put",
    url: `https://graph.facebook.com/${apiVersion}/${myNumberId}/messages`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
}

// if customer wants a product list map a list with the product id the name and the price
// we will have the id the name and the price of each product in the list wehn user wants to add an item to the order
function createProductsList(product) {
  return {
    id: `${product.id}`,
    title: product.name,
    description: `$${product.price}`,
  };
}

// constructs the message template
// the recipient phone number and the order we are processing
// depending on the stage of the order(the prev status of the order) we decide what template to send to the recipient
function getMessageData(recipient, order) {
  // if order status is one take the template at position 1 that is 0
  const messageTemplate = messageTemplates[order.statusId - 1];

  // the parameter on the message
  let messageParameters;

  // the message parameters {{number}}
  switch (messageTemplate.name) {
    case "welcome": // start transaction that is order status is one so send a welcome template
      messageParameters = [
        { type: "text", text: order.customer.split(" ")[0] }, // the first name of the customer
      ];
      break;
    case "payment_analysis":
      // customers name from order model and the product name from the products model
      messageParameters = [
        { type: "text", text: order.customer.split(" ")[0] }, //param 1 customers first name
        { type: "text", text: products[order.items[0].productId - 1].name }, // the name of product
      ];
      break;
    case "payment_approved":
      // the customer name the order id and deliver date from the Order model
      messageParameters = [
        { type: "text", text: order.customer.split(" ")[0] }, // first name of the customer
        { type: "text", text: order.id }, // the product id
        { type: "text", text: order.deliveryDate }, // the delivery date
      ];
      break;
    case "invoice_available":
      //
      messageParameters = [
        { type: "text", text: order.customer.split(" ")[0] }, // first customer name from order model
        { type: "text", text: products[order.items[0].productId - 1].name }, // products name
        {
          type: "text",
          text: `https://customer.your-awesome-grocery-store-demo.com/my-account/orders/${order.id}`,
        }, // where to download the invoice
      ];
      break;
    case "order_picked_packed":
      messageParameters = [
        { type: "text", text: order.customer.split(" ")[0] }, // first name
        { type: "text", text: order.id }, // the order id
        {
          type: "text",
          text: `https://customer.your-awesome-grocery-store-demo.com/my-account/orders/${order.id}`,
        }, // where to track your shipping and cross sell there
      ];
      break;
    case "order_in_transit":
      messageParameters = [
        { type: "text", text: order.customer.split(" ")[0] }, // customer's first name
        { type: "text", text: order.id }, // order id
        { type: "text", text: order.deliveryDate }, // the deliver date of the order
        {
          type: "text",
          text: `https://customer.your-awesome-grocery-store-demo.com/my-account/orders/${order.id}`,
        }, // where to track your shipping and cross sell there
      ];
      break;
    case "order_delivered":
      messageParameters = [
        { type: "text", text: order.customer.split(" ")[0] }, // first name
        { type: "text", text: order.id }, // order id
        { type: "text", text: order.deadlineDays }, // order deadline of returning
      ];
      break;
  }

  // the message data
  const messageData = {
    messaging_product: "whatsapp", // whatsapp
    to: recipient, // recipient phone number
    type: "template", // type not text but template
    template: {
      name: process.env.TEMPLATE_NAME_PREFIX + "_" + messageTemplate.name,
      // name: messageTemplate.name, // template name as in whatsapp
      language: { code: "en_US" }, // the language on the tempalate
      components: [
        {
          // components
          type: "body", // type of the component header body footer
          parameters: messageParameters, // a list of parameters {{}} that the component type is expecting
        },
      ],
    },
  };

  return JSON.stringify(messageData); // stringify the payload to be send to whatsapp
}

// an api request to get the list of all templates in my business account
async function listTemplates() {
  // a request to get all the templates from that business account
  return await axios({
    method: "get",
    url:
      `https://graph.facebook.com/${apiVersion}/${myBizAcctId}/message_templates` +
      "?limit=1000",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}

// I think this is send a request to the business accont to create a template for them
async function createMessageTemplate(template) {
  console.log(
    "Sending a request to whatsapp to createMessageTemplate  name:" +
      process.env.TEMPLATE_NAME_PREFIX +
      "_" +
      template.name
  );
  // console.log('Sending a request to whatsapp to createMessageTemplate name:'  + template.name);

  const config = {
    method: "post",
    url: `https://graph.facebook.com/${apiVersion}/${myBizAcctId}/message_templates`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: {
      name: process.env.TEMPLATE_NAME_PREFIX + "_" + template.name,
      // name: template.name, // the name of the template to create
      category: template.category, // the category transactional marketing or whatever
      components: template.components, // the component part of the template
      language: template.language, // the language on this template
    },
  };

  return await axios(config); // send the request
}

module.exports = {
  sendWhatsAppMessage: sendWhatsAppMessage,
  updateWhatsAppMessage: updateWhatsAppMessage,
  listTemplates: listTemplates,
  createMessageTemplate: createMessageTemplate,
  getMessageData: getMessageData,
  createProductsList: createProductsList,
  sendReceivedDataToclient: sendReceivedDataToclient,
};

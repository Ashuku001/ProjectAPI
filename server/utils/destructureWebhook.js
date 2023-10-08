const XHubSignature = require("x-hub-signature");
const {saveMessageToDatabase} = require('./saveDataToDB.js')

async function getPayload(req) {

  const mer_username = req.query["username"] // the merchant receiving the text from the webhook endpoint

  let body = req.body;
  body = body.entry;
  //   console.log("BODY>>>>>>", body);
  //   console.log("ENTRY>>>>>>", body[0]);
  //   console.log("changes>>>>>>", body[0].changes[0]);
  //   console.log("value>>>>>>>>>>>>>>>>>>>: ", body[0].changes[0].value);
  console.log("BUSINESS_ACCOUNT_ID>>>>>: ", body[0].id);
  console.log("FIELD>>>>>>>>>>>>>>>>>>>: ", body[0].changes[0].field);

  if (body[0].changes[0].value) {
    const value = body[0].changes[0].value;
    if (value.statuses) {
      const statuses = value.statuses;
      console.log(
        "##################STATUS OF THE SENT MESSAGE###################"
      );
      console.log(statuses)
      console.log("MSG ID>>>>>>>>>>>>>>: ", statuses[0].id);
      console.log("MSG DELIVERY STATUS>: ", statuses[0].status);
      console.log("MSG TIMESTAMP>>>>>>>: ", statuses[0].timestamp);
      console.log("MSG to_id>>>>>>>>>>>: ", statuses[0].recipient_id);
      if(statuses[0].conversation){
        // the conversation the message is in once it expires this field is null
        console.log("MEE conversation>>>>: ", statuses[0].conversation);
        console.log("MSG conversation ID>: ", statuses[0].conversation.id);
        console.log("MSG conExp ",statuses[0].conversation.expiration_timestamp); // expiration timestamp
      }
      if(statuses[0].pricing){
        // the pricing once the conversation expires this field is null
        console.log("MSG PRICING>>>>>>>>>: ", statuses[0].pricing);
        console.log("MSG PRICING MODEL>>>: ", statuses[0].pricing.pricing_model);
        console.log("MSG PRICING CATEGORY: ", statuses[0].pricing.category);
      }
    } else if (value.messages) {
      let message = {};
      let customer = {}
      let participants = {}

      console.log("############RECEIVING A MESSAGE FROM CUSTOMER#############");
      console.log("PROFILE NAME>>>>>>>>: ", value.contacts[0].profile.name);
      customer['whatsapp_name'] = value.contacts[0].profile.name
      
      const messages = value.messages;
      console.log(messages)

      console.log("message id>>>>>>>>>>: ", messages[0].id);


      let from_customer = false;


      if (messages[0].context) {
        const context = messages[0].context;
        console.log("CONTEXT>>>>>>>>>>>: ", messages[0].context);
        console.log("CONTEXT ID>>>>>>>>: ", context.id)
        console.log("CONTEXT FROM>>>>>>: ", context.from)
      }
      console.log("from>>>>>>>>>>>>>>>>: ", messages[0].from);
      from_customer = true;
      customer['phone_number'] = messages[0].from
      // set the customer and merchat being texted
      participants['mer_username'] = mer_username
      participants['customer'] = customer // customer object with phone_number and whatsapp_name

      console.log("FROM customer>>>>>>>: ", from_customer);
      message['from_customer'] = from_customer // from customer to true

      console.log("time>>>>>>>>>>>>>>>>: ", messages[0].timestamp);
      message['timestamp'] = messages[0].timestamp  // timestamp when meta received the message

      console.log("Type>>>>>>>>>>>>>>>>: ", messages[0].type);

      const message_type = messages[0].type;
      if (message_type === "text") {
        // support for text message
        console.log("$$$$$$$$$$ A TEXT TYPE MESSAGE $$$$$$$$$");

        console.log("Text body>>>>>>>>>: ", messages[0].text.body);
        message['text'] = messages[0].text.body   // the text that was sent
        // console.log("MESSAGE FOR OUR GRAPHQL>>: ",message)

        // call the mutation to save the text message to the database
        let payload = {}
        payload['message'] = message
        payload['participants'] = participants
        console.log("PARTICIPANTS AND MESSAGE for graphql>>>>>:", payload)
        try{
          console.log("SAVING TO DATABASE>>>>>>>>>>##########%%%%%%%%%%")
          await saveMessageToDatabase(payload)
        } catch(error){
          console.log("could not save the message to database")

        }
        

      } else if (message_type === "interactive") {
        // support for interactive message
        console.log("$$$$$$ AN INTERACTIVE TYPE MESSAGE $$$$$$$$$");
        console.log("Interactive>>>>>>>: ", messages[0].interactive);
        const interactive = messages[0].interactive;
        if (interactive.type === "button_reply") {
          // support for button_reply interactive message
          console.log("$$$$$$ A BUTTON INTERACTIVE TYPE");
          console.log("button_reply>>: ", interactive.button_reply);
          const button_reply = interactive.button_reply;
          console.log("button id>>>>: ", button_reply.id);
          console.log("button title>: ", button_reply.title);
        } else if (interactive.type === "list") {
          // support for selecting a list message
          console.log("$$$$$$ A LIST INTERACTIVE TYPE");
        }
      } else if (message_type === "image") {
        // support for image type of message
        console.log("$$$$$$$$ AN IMAGE TYPE MESSAGE $$$$$$$$$$");
        console.log("image>>>>>>>>>>>>>: ", messages[0].image);

        const image = messages[0].image;
        console.log("image id>>>>>>>>>>: ", image.id);
        console.log("image sha256>>>>>>: ", image.sha256);
        console.log("image mime_type>>>: ", image.mime_type);
        if(image.caption){
          console.log("image caption>>>: ", image.caption)
        }
      } else if (message_type === "document") {
        // support for document type of message
        console.log("$$$$$$$$ AN DOCUMENT TYPE MESSAGE $$$$$$$$$$");
        console.log("document>>>>>>>>>>: ", messages[0].document);

        const document = messages[0].document;
        console.log("document filename>: ", document.filename);
        console.log("document mime_type: ", document.mime_type);
        console.log("document sha256>>>: ", document.sha256);
        console.log("document id>>>>>>>: ", document.id);
      } else if (message_type ==="video"){
        console.log("$$$$$$$$ AN VIDEO TYPE MESSAGE $$$$$$$$$$");
        console.log("video id>>>>>>>>>>: ", messages[0].video)

        const video = messages[0].video
        console.log("viddeo mime_type>: ", video.mime_type)
        console.log("video sha256>>>>>: ", video.sha256)
        console.log("video id>>>>>>>>>: ", video.id)
      }
    }
  }
}

if (exports) {
  exports.getPayload = getPayload;
}


const statuses = {
  // the read status set status to read for the message_id received
  read : {
    messaging_product: "whatsapp",
    status: "read",
    message_id: ""
  }
}

if (exports) {
  exports.messageStatuses = statuses;
}

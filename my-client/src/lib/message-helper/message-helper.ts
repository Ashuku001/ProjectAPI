// import { MessageConfigType, MessageInputType, OrderQuantityType, ProductType } from "@/types";


// export function getTextMessageInput(recipient: string, text: string) {
//     console.log("RECIPIENT PHONE NUMBER>>>>>>>>>>>..", recipient)
//     return JSON.stringify({
//         "messaging_product": "whatsapp",
//         "preview_url": false,
//         "recipient_type": "individual",
//         "to": recipient,
//         "type": "text",
//         "text": {
//             "body": text
//         }
//     });
// }


// export function getTemplatedMessageInput(recipient:string, product:ProductType) {
//     return JSON.stringify({
//         "messaging_product": "whatsapp",
//         "to": recipient,
//         "type": "template",
//         "template": {
//             "name": "new_arrival_product",
//             "language": {
//                 "code": "en_US"
//             },
//             "components": [
//                 {
//                     "type": "header",
//                     "parameters": [
//                         {
//                             "type": "image",
//                             "image": {
//                                 "link": product.thumbnail.url
//                             }
//                         }
//                     ]
//                 },
//                 {
//                     "type": "body",
//                     "parameters": [
//                         {
//                             "type": "text",
//                             "text": product.name
//                         },
//                         {
//                             "type": "date_time",
//                             "date_time": {
//                                 "fallback_value": product.price
//                             }
//                         },
//                         {
//                             "type": "text",
//                             "text": product.quantity
//                         }
//                     ]
//                 }
//             ]
//         }
//     }
//     );
// }

// export function getTemplatedMessageInput2(recipient:string, product:ProductType) {
//     return JSON.stringify({
//         "messaging_product": "whatsapp",
//         "to": recipient,
//         "type": "template",
//         "template": {
//             "name": "buy_now",
//             "language": {
//                 "code": "en_US"
//             },
//             "components": [
//                 {
//                     "type": "header",
//                     "parameters": [
//                         {
//                             "type": "image",
//                             "image": {
//                                 "link": product.thumbnail.url
//                             }
//                         }
//                     ]
//                 },
//                 {
//                     "type": "body",
//                     "parameters": [
//                         {
//                             "type": "text",
//                             "text": product.name
//                         },
//                         {
//                             "type": "date_time",
//                             "date_time": {
//                                 "fallback_value": product.price
//                             }
//                         }
//                     ]
//                 }
//             ]
//         }
//     }
//     );
// }

const nothing = "nothing"
export default nothing

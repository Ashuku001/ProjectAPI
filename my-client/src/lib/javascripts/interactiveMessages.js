/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

// This list will be cross selling from analysis of other customers buring and the past customers purchase
export const interactive_list = {
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "PHONE_NUMBER",
  "type": "interactive",
  "interactive": {
    "type": "list",
    "header": {
      "type": "text",
      "text": "Add an Item to Existing Pending Order"
    },
    "body": {
      "text": "View our list of produce to add to your existing order. Hurry before your order is out for delivery!"
    },
    "footer": {
      "text": "Markt online groceries"
    },

    // actions a list of products one can add to the cart
    "action": {
      "button": "Products List", 
      "sections": [
        {
          "title": "Fresh Produce", // make this part dynamic first list
          "rows": [ // first list at postion zero
            {
              "id": "SECTION_1_ROW_1_ID",
              "title": "SECTION_1_ROW_1_TITLE",
              "description": "SECTION_1_ROW_1_DESCRIPTION"
            },
            {
              "id": "SECTION_1_ROW_2_ID",
              "title": "SECTION_1_ROW_2_TITLE",
              "description": "SECTION_1_ROW_2_DESCRIPTION"
            }
          ]
        },
        {
          "title": "Fresh Produce Cont",  // list of products of specific category
          "rows":[] // second list
        }
      ]
    }
  }
}

// buttons added to the interactive messages
export const yes_no_interactiveBtn = {
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "PHONE_NUMBER",
  "type": "interactive",
  "interactive": {
    "type": "button",
    "body": {
      "text": "Do you want to add an item to your order?"
    },
    "action": {
      "buttons": [
        {
          "type": "reply",
          "reply": {
            "id": "0",
            "title": "No"
          }
        },
        {
          "type": "reply",
          "reply": {
            "id": "1",
            "title": "Yes"
          }
        }
      ]
    }
  }
}

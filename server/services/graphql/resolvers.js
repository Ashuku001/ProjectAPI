const { logger } = require("../../helpers/logger.js");
const colors = require("colors");
require("dotenv").config();
const { sendWhatsAppMessage } = require("../../utils/messageHelper.js");
const { getTextMessageInput } = require("../../utils/textMessageInput.js");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { Op, Sequelize } = require("sequelize");
const { setCookie } = require("./helpers/setCookies.js");
const { PubSub, withFilter } = require("graphql-subscriptions");

const JWT_SECRET = process.env.JWT_SECRET;
const pubsub = new PubSub(); // in production use

// a nonarrow fun doesnt take a scope
function resolvers() {
  const { db } = this.db;
  const { Customer, Merchant, Chat, Message, Setting, Product } = db.models;

  const resolvers = {
    Customer: {
      // a function to get the associated merchant of a customer
      merchant(customer, args, context) {
        return customer.getMerchant();
      },
    },
    Message: {
      chat(message, args, context) {
        return message.getChat(); // the message belongs to what chat
      },
    },
    Chat: {
      messages(chat, args, context) {
        return chat.getMessages({ order: [["createdAt", "ASC"]] });
      },
      merchant(chat, args, context) {
        return chat.getMerchant();
      },
      customer(chat, args, context) {
        return chat.getCustomer();
      },
      // messageFeed: (chat, { cursor }) => {
      //   const messages = chat.dataValues.Messages;

      //   if (!cursor) {
      //     console.log(" IN HERE ");
      //     cursor = new Date(
      //       messages[messages.length - 1].dataValues.createdAt
      //     ).toISOString();
      //   }

      //   cursor = new Date(cursor).toISOString();

      //   const newestMessageIndex = messages.findIndex(
      //     (message) =>
      //       cursor === new Date(message.dataValues.createdAt).toISOString()
      //   ); // find index of message creaetd at time held in cursor can find the next page.
      //   console.log("newestMessage Index".bgCyan, newestMessageIndex);
      //   // set newCursor to the createdAt time of the last message in this messageFeed:
      //   const limit = 10;
      //   // try{
      //   const newCursor = new Date(
      //     messages[newestMessageIndex - limit].dataValues.createdAt
      //   ).toISOString();
      //   // } catch(err){
      //   // console.log("an error occured".bgRed)
      //   // }
      //   console.log("new cursor".bgCyan, newCursor);

      //   const messageFeed = {
      //     messages: messages.slice(
      //       newestMessageIndex - limit,
      //       newestMessageIndex
      //     ),
      //     cursor: newCursor,
      //   };

      //   return messageFeed;
      // },
    },
    Merchant: {
      customers(merchant, args, context) {
        return merchant.getCustomers();
      },
      setting(merchant, args, context) {
        return merchant.getSetting();
      },
      products(merchant, args, context) {
        return merchant.getProducts();
      },
      chats(merchant, args, context) {
        return merchant.getChats({ order: [["updatedAt", "ASC"]] });
      },
    },
    Product: {
      merchant(product, args, context) {
        return product.getMerchant();
      },
    },

    RootQuery: {
      async currentMerchant(root, args, context) {
        return context.merchant;
      },

      async customers(root, args, context) {
        const merchant = await Merchant.findOne({
          where: {
            id: context.merchant.id,
          },
        });
        if (!merchant) {
          throw new Error(
            "It seems you are not registered. Sign up to start managing your customers"
          );
        }

        return await merchant.getCustomers();
      },

      async customer(root, { customerId }, context) {
        console.log(
          "the idss".bgGreen,
          customerId,
          typeof customerId,
          context.merchant.id,
          typeof context.merchant.id
        );
        const customer = await Customer.findOne({
          where: {
            id: customerId,
            merchantId: context.merchant.id,
          },
        });
        if (!customer) {
          throw new Error("Unautharized operation could not find the customer");
        }
        return customer;
      },

      async customersSearch(root, { page, limit, text }, context) {
        // if text length less than three skip
        let customers = [];
        if (text.length < 3) {
          return {
            customers,
          };
        }

        var skip = 0;
        if (page && limit) {
          skip = page * limit;
        }

        var query = {
          order: [["createdAt", "DESC"]],
          offset: skip,
        };
        if (limit) {
          query.limit = limit;
        }

        query.where = {
          [Op.or]: [
            {
              first_name: { [Op.iLike]: "%" + text + "%" },
              merchantId: context.merchant.id,
            },
            {
              last_name: { [Op.iLike]: "%" + text + "%" },
              merchantId: context.merchant.id,
            },
            {
              phone_number: { [Op.iLike]: "%" + text + "%" },
              merchantId: context.merchant.id,
            },
          ],
        };

        customers = await Customer.findAll(query);
        console.log(typeof customers);
        // if (customers.length === 0) {
        //   throw new Error(`No results found for ${text}`);
        // }

        const customerIds = customers.map((cus) => {
          return cus.id;
        });
        const chats = await Chat.findAll({
          where: {
            merchantId: context.merchant.id,
            customerId: { [Op.in]: customerIds },
          },
        });
        if (chats) {
          customers = await customers.filter((cus) =>
            chats.every((chat) => cus.id !== chat.customerId)
          );
        }
        
        return { customers, chats };
      },

      async chats(root, args, context) {
        const merchant = await Merchant.findOne({
          where: {
            id: context.merchant.id,
          },
        });
        if (!merchant) {
          throw new Error(
            "It seems you are not registered. Sign up to start managing your customers"
          );
        }
        return await merchant.getChats();
      },

      async lastMessage(args, { chatId }, context) {
        if (chatId) {
          const chat = await Chat.findByPk(chatId, {
            where: {
              merchantId: context.merchant.id,
            },
          });

          return chat
            .getMessages({
              limit: 1,
              order: [["id", "DESC"]],
            })
            .then((messages) => {
              return messages[0];
            });
        }
      },

      async chat(root, { chatId }, context) {
        const merchant = await Merchant.findOne({
          where: {
            id: context.merchant.id,
          },
        });
        if (!merchant) {
          throw new Error(
            "It seems you are not registered. Sign up to start managing your customers"
          );
        }

        const chat = await Chat.findOne({
          where: {
            id: chatId,
            merchantId: context.merchant.id,
          },
          include: [
            {
              model: Message,
            },
            {
              model: Customer,
            },
          ],
        });

        if (!chat) {
          throw new Error("You are not authorized to access this chat");
        }
        return chat;
      },

      // username required to verify the webhook events and context from logged in user
      async setting(root, { username }, context) {
        let merchant = null;
        if (username) {
          merchant = await Merchant.findOne({
            where: {
              username: username,
            },
          });
          if (!merchant) {
            // console to an error reporting system
            logger.log({
              level: "error",
              message: `error retriving settings for merchant, "${username}" could not find the username`,
            });

            return; // short circuit
          }
        } else if (context.merchant) {
          merchant = await Merchant.findOne({
            where: {
              id: context.merchant.id,
            },
          });
        } else {
          throw new Error(
            "Failed to authenticate you while retrieving settings Contact us to solve this"
          );
        }

        console.log(merchant);
        const setting = await merchant.getSetting();

        if (setting) {
          return setting;
        } else {
          throw new Error(
            "something went wrong while retrieving your settings"
          );
        }
      },

      async products(root, args, context) {
        const merchant = await Merchant.findOne({
          where: {
            id: context.merchant.id,
          },
        }); // authenticated merchant
        if (!merchant) {
          throw new Error(
            "Make sure you are logged in to access your products"
          );
        }

        var query = { order: [["createdAt", "DESC"]] };
        query.where = { "$Product.merchantId$": merchant.id };

        const products = await Product.findAll(query);

        if (!products) {
          throw new Error("Add products to view them here");
        }

        return products;
      },
    },

    RootMutation: {
      async addCustomer(root, { customer }, context) {
        const merchantsRow = await Merchant.findOne({
          where: {
            id: context.merchant.id,
          },
        });

        // check if a customer does exist with the same phone number
        const existingCustomer = await Customer.findOne({
          where: {
            phone_number: customer.phone_number,
            merchantId: merchantsRow.id,
          },
        });

        // update the customer
        if (existingCustomer) {
          await Customer.update(
            {
              ...customer,
            },
            {
              where: {
                phone_number: customer.phone_number,
                merchantId: merchantsRow.id,
              },
            }
          ).then((customer) => {
            console.log("Updating customer###########");
            logger.log({
              level: "info",
              message: "customer updated",
            });
            return customer;
          });
        } else {
          // create the new customer
          return await Customer.create({
            ...customer,
          }).then(async (newCustomer) => {
            await Promise.all([newCustomer.setMerchant(merchantsRow.id)]);
            logger.log({
              level: "info",
              message: "Customer was created",
            });
            return newCustomer;
          });
        }
      },

      async addChat(root, { chat }, context) {
        const existingChat = await Chat.findOne({
          where: {
            merchantId: chat.merchant,
            customerId: chat.customer,
          },
        });

        if (existingChat) {
          await Chat.update(
            {
              ...chat,
            },
            {
              where: {
                merchantId: chat.merchant,
                customerId: chat.customer,
              },
            }
          ).then((chat) => {
            console.log("Updated a chat##############");
            logger.log({
              level: "info",
              message: "Updated an existing chat",
            });
            return chat;
          });
        } else {
          return await Chat.create().then(async (newChat) => {
            await Promise.all([
              newChat.setCustomer(chat.customer),
              newChat.setMerchant(chat.merchant),
            ]);
            logger.log({
              level: "info",
              message: "Chat was created",
            });
            return newChat;
          });
        }
      },

      async addMessage(root, { message, participants, customerId }, context) {
        console.log("SAVING TO DB>>#######%%%%%%%%In addMessage resolvers");

        let chatId = null;
        let customer = undefined;
        let merchant = undefined;
        let chat = undefined;
        let addNewChat = false;

        if (participants) {
          // message from the webhook endpoint(sent by customer)
          const mer_username = participants.mer_username;
          const cus_phone_number = participants.customer.phone_number;

          // the merchant as per the url param must exist to receive this webhook
          const merchant = await Merchant.findOne({
            where: {
              username: mer_username,
            },
          });

          // the customer as per the phone number from the webhook(might not exist so we can create)
          customer = await Customer.findOne({
            where: {
              phone_number: cus_phone_number,
              merchantId: merchant.id,
            },
          });

          if (!customer) {
            // mark this customer as new since we dont have the first name and last name
            // customer = await this.addCustomer({customer: data.customer});
            customer = await Customer.create({
              ...participants.customer, // whatsapp_name and the phone number
            }).then((newCustomer) => {
              newCustomer.setMerchant(merchant.id);
              return newCustomer;
            });
          }

          // is there an existing chat with the following participants
          chat = await Chat.findOne({
            where: {
              merchantId: merchant.id, // this is unique
              customerId: customer.id, // might have duplicate customers
            },
          });

          if (!chat) {
            try {
              chat = await Chat.create().then((newChat) => {
                Promise.all([
                  newChat.setMerchant(merchant),
                  newChat.setCustomer(customer),
                ]);
                // pubsub.publish("chatAdded", {
                //   chatAdded: newChat,
                //   merchantId: newChat.merchantId,
                // });
                addNewChat = true;
                return newChat;
              });
            } catch {
              console.log(
                "unable to set new chat from the received webhook",
                error
              );
            }

            chatId = chat.id; // set chat to the newly created chat
          } else {
            chatId = chat.id; // else the chat already exists
          }
        } else {
          // the message from the client sent by merchant

          //the chat root exists so message comes with a chat id
          if (typeof message.chatId !== undefined) {
            chatId = message.chatId; // if from client we create a chat before creating a message
          }

          // merchant is creating a new chat
          if (!chatId || typeof chatId === undefined) {
            console.log(
              "Merchant creating a new chat with customer",
              customerId
            );
            merchant = context.merchant;

            customer = await Customer.findByPk(parseInt(customerId), {
              where: {
                merchantId: merchant.id,
              },
            });

            if (customer) {
              // console.log("Found customer",customer)
              chat = await Chat.create().then((newChat) => {
                Promise.all([
                  newChat.setMerchant(merchant),
                  newChat.setCustomer(customer),
                ]);
                // pubsub.publish("chatAdded", {
                //   message: newChat,
                //   merchantId: newChat.merchantId,
                // });
                addNewChat = true;
                return newChat;
              });

              chatId = chat.id;
              message.chatId = chatId;
            } else {
              throw new Error(
                `Could not find that customer make sure you have added him or her`
              );
            }
          } else {
            // get the customer involved in the chat include the merchat
            chat = await Chat.findByPk(chatId, {
              include: [
                {
                  model: Customer,
                },
                {
                  model: Merchant,
                },
              ],
            });
            customer = await chat.getCustomer(); // the customer receiving
            merchant = await chat.getMerchant(); // the merchat sending
          }

          // ##########################Sending a text or template to customers##############################################

          // send message from merchant to the customer
          const to = customer.dataValues.phone_number; // the whatsapp number
          let setting = await merchant.getSetting(); // merchat app settings
          // console.log(customer, merchant);
          setting = setting.dataValues;

          // need to check if message is a text type or a template type(image, document. interactive, video )

          // get the message type if template or text type
          const text = message.text; // the text from merchantsetting)
          console.log("THE TESDFSD".bgGreen,text)
          // for text type message
          const data = getTextMessageInput(to, text); // get the data for text type message
          // console.log(data);
          sendWhatsAppMessage(data, setting); // send the text type message

          // else template type message create the parameters for that message
        }

        const newMessage = await Message.create({
          ...message,
        }).then(async (newMessage) => {
          await Promise.all([newMessage.setChat(chatId)]).then(() => {
            // send a new websocket to connected clients subscribed to messageAdded channel
            if (addNewChat === true) {
              pubsub.publish("messageAdded", {
                messageAdded: {chat: chat,message: newMessage },
                chatId: newMessage.chatId,
              });
              console.log("The new chat", chat, " and the message", newMessage)
              return newMessage
            } else {
              pubsub.publish("messageAdded", {
                messageAdded:  {message: newMessage} ,
                chatId: newMessage.chatId,
              });
              console.log("Just a new message for an existing chat", newMessage)
            }
          });

          logger.log({
            level: "info",
            message: "Message was created",
          });
          // send the message to whatsapp after it is saved into the database

          console.log("returning the new message")
          return newMessage;
        });
        console.log("new message and new chat", newMessage, chat);

        return { newMessage, chat };
      },

      async addSetting(root, { setting }, context) {
        return await Merchant.findAll().then(async (merchants) => {
          const merchantsRow = merchants[0]; // the authenticated merchant

          console.log("MERCHANT ID ", merchantsRow.id);
          const existingSetting = await Setting.findOne({
            where: {
              merchantId: merchantsRow.id,
            },
          });

          if (existingSetting) {
            // console.log("#################",existingSetting)
            console.log("UPDATING settings");
            // update settings
            await Setting.update(
              {
                ...setting,
              },
              {
                where: {
                  merchantId: merchantsRow.id,
                },
              }
            ).then((setting) => {
              logger.log({
                level: "info",
                message: "setting updated",
              });
              return setting;
            });
          } else {
            // create a new setting
            return Setting.create({
              ...setting,
            }).then(async (newSetting) => {
              await Promise.all([newSetting.setMerchant(merchantsRow.id)]);
              logger.log({
                level: "info",
                message: "Setting created",
              });
              return newSetting;
            });
          }
        });
      },
      async signupMerchant(
        root,
        { username, password, whatsapp_phone_number, email },
        context
      ) {
        return Merchant.findAll({
          where: {
            [Op.or]: [{ whatsapp_phone_number }, { username }],
          },
          raw: true,
        }).then(async (users) => {
          if (users.length) {
            throw new Error("Username or phone number already in use");
          } else {
            return bcrypt.hash(password, 10).then((hash) => {
              return Merchant.create({
                username,
                password: hash,
                email,
                whatsapp_phone_number,
                activated: 1,
              }).then((newMerchant) => {
                const token = JWT.sign(
                  { username, id: newMerchant.id },
                  JWT_SECRET,
                  {
                    expiresIn: "1d",
                  }
                );
                // set the cookies for the users browser in the context of the user
                setCookie(context, token);
                return { token };
              });
            });
          }
        });
      },

      async loginMerchant(root, { username, password }, context) {
        return Merchant.findAll({
          where: {
            username,
          },
          raw: true,
        }).then(async (merchants) => {
          if (merchants.length === 1) {
            const merchant = merchants[0];
            console.log(merchant);
            const passwordValid = await bcrypt.compare(
              password,
              merchant.password
            );
            if (!passwordValid) {
              throw new Error("Password or username does not match");
            }
            console.log(JWT_SECRET);
            const token = JWT.sign({ username, id: merchant.id }, JWT_SECRET, {
              expiresIn: "1d",
            });

            console.log("TOKEN>>>> ", token);
            // add the cookies in the context of the client
            setCookie(context, token);
            return { token };
          } else {
            throw new Error(
              "Error while logging you in we did not find the user"
            );
          }
        });
      },

      logoutMerchant(root, params, context) {
        setCookie(context, (logout = true)); //remove the cookie from clients context
        return {
          message: true,
        };
      },

      async addProduct(root, { product }, context) {
        console.log("PRODUCT#######", product);
        return await Merchant.findAll().then(async (merchants) => {
          const merchantsRow = merchants[0];

          if (merchantsRow) {
            return await Product.create({
              ...product,
            }).then(async (newProduct) => {
              await Promise.all([newProduct.setMerchant(merchantsRow.id)]);
              logger.log({
                level: "info",
                message: "Product created",
              });
              return newProduct;
            });
          } else {
            throw new Error("Merchant does not exist");
          }
        });
      },
    },

    RootSubscription: {
      messageAdded: {
        subscribe: withFilter(
          () => pubsub.asyncIterator(["messageAdded"]),
          async (payload, variables) => {
            return payload.messageAdded.message.chatId === variables.chatId;
          }
        ),
      },
      // chatAdded: {
      //   subscribe: withFilter(
      //     () => pubsub.asyncIterator("chatAdded"),
      //     async (payload, variables, context) => {
      //       console.log("Context33333333333333", context);
      //       return payload.chatAdded.merchatId === context.merchant.id;
      //     }
      //   ),
      // },
    },
  };

  return resolvers;
}
module.exports = resolvers;

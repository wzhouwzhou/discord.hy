"use strict";

const qdb = require("quick.db")
const { Errors, KeyMissingError } = require("../../Error/Errors.js")
const request = require("request")
const tokendb = new qdb.table("discordhytoken")
class channel {
  constructor(client) {
    this.client = client
  }

  sendEmbed(content){
    if(!content)KeyMissingError("Content")
    if(content === "")KeyMissingError("Content")
        let msg;
            msg = {
                "content": "",
	            "embed": content.toJSON()
            }
        var options = {
          'method': 'POST',
          'url': `https://discordapp.com/api/channels/${this.client.channel_id}/messages`,
          'headers': {
            'Authorization': `Bot ${tokendb.get('token.token')}`,
            'content-type': 'application/json',
            'Cookie': '__cfduid=d691ce9608d2f2417dea1a984b9cb46aa1587146073; __cfruid=1c5bf67d2aa9e7bc76ced134a29a051b862dc121-1587146073'
          },
          body: JSON.stringify(msg)
        };
        request(options, function (error, response) { 
          if(JSON.parse(response.body).message === "Unknown Channel")console.error(Errors.UNKNOWN_CHANNEL)
          if(JSON.parse(response.body).message === "401: Unauthorized")throw new Error(Errors.UNAUTHORIZED);
          return JSON.parse(response.body)
        });
  };
  

  sendMessage(content){
    if(!content)KeyMissingError("Content")
    if(content === "")KeyMissingError("Content")
        let msg;
            msg = {
                "content": content
            }
        var options = {
          'method': 'POST',
          'url': `https://discordapp.com/api/channels/${this.client.channel_id}/messages`,
          'headers': {
            'Authorization': `Bot ${tokendb.get('token.token')}`,
            'content-type': 'application/json',
            'Cookie': '__cfduid=d691ce9608d2f2417dea1a984b9cb46aa1587146073; __cfruid=1c5bf67d2aa9e7bc76ced134a29a051b862dc121-1587146073'
          },
          body: JSON.stringify(msg)
        };
        console.log(msg)
        request(options, function (error, response) { 
          if(JSON.parse(response.body).message === "Unknown Channel")console.error(Errors.UNKNOWN_CHANNEL)
          if(JSON.parse(response.body).message === "401: Unauthorized")throw new Error(Errors.UNAUTHORIZED);
          return JSON.parse(response.body)
        });
  };
  
};

module.exports = channel
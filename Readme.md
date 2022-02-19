# Made this so that i dont get confused LMAO

### Useage:
```js
const dash=require("./dash.js");

const a = new dash.Dash({
  bot:bot,//your bot
  clientID:"943831369832861746",//client id
  clientSecret:process.env.s,//client secret
  redirectURI:"https://UsefulMonumentalEmbed.dreamy-dankers.repl.co/callback"//redirect uri
  
  
})
```


### Functions Till Now:
#### All these are Dash functions.
- `generatrURL()`=> create a login link for the bot.
- `getAccessToken()`=> from the code getting the user access token.
- `getUser()` => Getting basic details of the user.
- `getGuilds()`=> Getting users guilds.
- `getAdminGuilds()`=> Getting Guilds where the user is admin.
- `getCommonAdminGuilds()`=> Getting guilds where user is admin and bot is there.

### Getting a variable:
```js
let c = await bot.db.get("main","prefix","932106126336598016");//args: ["table","varname","serverid/userid"]
```
### Setting a variable
```js
let c = await bot.db.set("main", "prefix", "932106126336598016", "hello"); //args: ["table","varname","serverid/userid","value"]
```
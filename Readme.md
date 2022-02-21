# Aoi.js Dashboard with Aoi.js-plugins
## packages needed:
- [aoi.js](https://www.npmjs.com/package/aoi.js)
- [aoi.js-plugins](https://www.npmjs.com/package/aoi.js-plugins)
- [path](https://www.npmjs.com/package/path)
- [express](https://www.npmjs.com/package/express)
- [express-session](https://www.npmjs.com/package/express-session)
### Useage
(1) Go to config.js and add everything there( most of it is self explanatory.)

(2) Go to [discord developers portal](https://discord.com/developers/applications), select yout bot and go to "Oauth2" tab.

(3) Under "Redirects" add your website link/callback a.k.a. <https://example.com/callback>

### Credits:
- [Bumblebee [owner/ dev]](https://discord.com/users/818377414367379487) 
- [Fight Farewell Fearless - he helped me a lot, <3 Thanks](https://discord.com/users/694184230271451166)
- [W3Schools - referred to it a lot XD](https://www.w3schools.com/)

### Possible errors:
- Cannot read properties of undefined (reading "replace")
![error](https://media.discordapp.net/attachments/878880487681179678/945271608694689792/unknown.png)
**Solution: ** The error is a one time error, but if you get it repeatedly, omit the `.replace("undefined","")`.

- 400 Bad request
![error](https://media.discordapp.net/attachments/878880487681179678/945272452240515123/20220219_172243.png)
**Solution: **This happens when you try to fetch data from an api without signing in. Re-Start the code and then login.

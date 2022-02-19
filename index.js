const fs = require('fs')
const express = require('express')
const aoijs = require("aoi.js");
var session = require('express-session')
const config=require("./config.js")

const bot = new aoijs.Bot({
  token:config.token,
  prefix:"$getServerVar[prefix]",
  intents:"all"
})
const oneDay=1000 * 60 * 60 * 24;
const app = express()
app.use(session({ secret:"bumblebee is pro", cookie: { maxAge: oneDay }}))



const plugins=require("aoi.js-plugins");
const dash = new plugins.Dash({
  bot:bot,
  port:"3000",
  clientID:config.id,
  clientSecret:config.secret,
  redirectURI:config.redirect
  
  
})
bot.variables({
  prefix:"!"
})

bot.onMessage()
bot.command({
  name:"help",
  code:`A simple bot to connect with a dashboard.\n**Server Prefix:** \`$getServerVar[prefix]\``
})
bot.command({
  name:"prefix",
  code:`
  Changed the server prefix to \`$message\`

  $setServerVar[prefix;$message]`
})
//let c = a.getAccessToken()

function al(port){
  if (bot) {
    app.listen(port)
  }
  else{
    al(port)
  }
}

al()

app.get("/", async (req,res) => {
  let b=dash.generateUrl()
  if (req.session.act){
    
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>${config.title}</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body style="background-image: url('${config.bg}');background-repeat: no-repeat;background-size: cover;">

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#"><strong>${bot.user.username}</strong></a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="/"><span class="glyphicon glyphicon-home"> Home</a></li>
      <li class="active"><a href="/select"><span class="glyphicon glyphicon-dashboard"> Dashboard</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li><a href="/logout"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
    </ul>
  </div>
</nav>
  
<div class="container" align=center>
  <img src="${config.icon}" class="img-responsive img-circle" alt="Bot">
  <b><p style="color:white;text-align: center;font-size:5vw">${bot.user.username}</p></b>
</div>
<p style="color:white;text-align: center;font-size:2vw">In <strong>${bot.guilds.cache.size}</strong> Servers!<br>Serving <strong>${bot.users.cache.size}</strong> Members!</p>


</body>
</html>`)
  }
  else{
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>${config.title}</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body style="background-image: url('${config.bg}');background-repeat: no-repeat;background-size: cover;">

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#"><strong>${bot.user.username}</strong></a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="/"><span class="glyphicon glyphicon-home"> Home</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li><a href="${b}"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
  </div>
</nav>
  
<div class="container" align=center>
  <img src="${config.icon}" class="img-responsive img-circle" alt="Bot">
  <b><p style="color:white;text-align: center;font-size:5vw">${bot.user.username}</p></b>
</div>
<p style="color:white;text-align: center;font-size:2vw">In <strong>${bot.guilds.cache.size}</strong> Servers!<br>Serving <strong>${bot.users.cache.size}</strong> Members!</p>


</body>
</html>`)
  }
})

app.get("/callback", async (req,res) => {
  let code = req.query.code;
  let ac = await dash.getAccessToken(code);
  req.session.act=ac
  res.redirect("/");
})

app.get("/logout", async (req,res) => {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    }// cannot access session here
    else {
      console.log("Logged Out")
    }
  })
  res.redirect("/");
})


app.get("/select", async (req,res) => {
  if (req.session.act){
    let b = await dash.getCommonAdminGuilds(req.session.act);
    let d = await dash.getGuilds(req.session.act);
    let c = await dash.getAdminGuilds(req.session.act)
    for (let [i, guild] of Object.entries(d)) {
      var aa;
      var bb;
      if (c.includes(guild.id)==true && b.includes(guild.id)==true){
        aa=aa+`<label>
                    <a href="/dashboard/${guild.id}/"><input type="image" name="${guild.name}" value="${guild.id}" src="https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png" width="100px" height="100px" class="rounded-circle" onerror="this.src='https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png'"
                    style="margin: 70px;border: 5px solid #555;border: 5px solid;border-color:#228B22;"  required>
                    <br>
                    <b><p style="color:white;text-align: center;">${guild.name}</p></b></a>
                  </label>`
      }
      else if (c.includes(guild.id)==true){
        bb=bb+`<label>
                    <a href="/invite-bot/${guild.id}"><input type="image" name="${guild.name}" value="${guild.id}" src="https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png" width="100px" height="100px" class="rounded-circle" onerror="this.src='https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png'"
                    style="margin: 70px;border: 5px solid #555;border: 5px solid;border-color:#ff0000;"  required>
                    <br>
                    <b><p style="color:white;text-align: center;">${guild.name}</p></b></a>
                  </label>`
      }


      
    };
    res.send(`<head>
    <title>Select A Server</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js">
    </script>
    
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  </head>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#"><strong>${bot.user.username}</strong></a>
      </div>
      <ul class="nav navbar-nav">
        <li class="active"><a href="/"><span class="glyphicon glyphicon-home"> Home</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="/logout"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
      </ul>
    </div>
  </nav>
  <body style="background-image: url('${config.bg}');background-repeat: no-repeat;background-size: cover;">


    <b><p style="color:white;text-align: center;font-size:5vw">Select A Server:</p></b>
    <div style="text-align: center;">
      ${aa.replace("undefined","")}
    </div>
    <br>
    <br>
    <b><p style="color:white;text-align: center;font-size:5vw">Add To Server:</p></b>
    <div style="text-align: center;">
      ${bb.replace("undefined","")}
    </div>
  </body>
  `)
  }
  else{
    let b=dash.generateUrl()
    res.redirect(b)
  }

})



app.get('/invite-bot/:id', function(request, response){
  response.redirect(`https://discord.com/oauth2/authorize?response_type=code&client_id=${bot.user.id}&scope=bot+applications.commands&guild_id=${request.params.id}&disable_guild_select=false&prompt=consent&permissions=8`);
});
app.get('/dashboard/:id', async (req,res) => {
  if (req.session.act){
    let b = await dash.getCommonAdminGuilds(req.session.act);
    let d = await dash.getGuilds(req.session.act);
    
    if (b.includes(req.params.id)==true){
      for (let [i, guild] of Object.entries(d)) {
        if (guild.id==req.params.id){
          let gname=guild.name;
          let gicon = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
          let prefix = await bot.db.get("main","prefix",req.params.id)
          res.send(`<!DOCTYPE html>
<html>
<title>${gname}'s Dashboard</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<body align=center style="background-image: url('${config.bg}');background-repeat: no-repeat;background-size: cover;">

<div class="w3-container">
  <h2 style="color:white;text-align: center;font-size:5vw">${gname}'s Dashboard</h2>
  <button onclick="document.getElementById('id01').style.display='block'" class="w3-button w3-green w3-large">Change Prefix</button>

  <div id="id01" class="w3-modal">
    <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">

      <div class="w3-center"><br>
        <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
        <img src="${gicon}" alt="${gname}" style="width:30%" class="w3-circle w3-margin-top" onerror="this.src='https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png'">
      </div>

      <form class="w3-container" action="/${guild.id}/setprefix">
        <div class="w3-section">
          <label><b>Prefix</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="${prefix.value}" name="prefix" required>
          <button class="w3-button w3-block w3-green w3-section w3-padding" type="submit">Change</button>
        </div>
      </form>

      <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
        <button onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-button w3-red">Cancel</button>
      </div>

    </div>
  </div>
</div>
            
</body>
</html>
`)
        }
      }
    }
    else {
      res.send("Unauhorized!")
    }
    
  }
  else{
    let b=dash.generateUrl()
    res.redirect(b)
  }

});



app.get('/:id/setprefix', async (req,res) => {
  if (req.session.act){
    let b = await dash.getCommonAdminGuilds(req.session.act);
    
    if (b.includes(req.params.id)==true){
      let c = await bot.db.set("main", "prefix", req.params.id, req.query.prefix);
      res.redirect(`/dashboard/${req.params.id}`)
    }
    else{
      res.send("Unauthorized!")
    }
  }
  else{
    let b=dash.generateUrl()
    res.redirect(b)
  }
})

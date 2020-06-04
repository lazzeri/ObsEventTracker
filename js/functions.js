var broadcastId;
var userId;
var self = this;
this.peerId = uuidv4();
this.signalingWS = null;
var error = false;
var lastmoment = "";
var startviews = 0;
var firstrun = true;
var newFans = [];
var newInvites = [];

var goodies;
var panelList;So:

var paneltimecounter = [];

var eventsToTrigger = [];

//CONSTRUCTORS
var started = false;

var iVolume = 50;
var iSuperchat = true;
var iVoicechat = true;


var iName = "Test1";
var iSeconds = 30;
var iMinimumBarrs = 5;
var iInvites = true;
var iMoments = true;
var iFans = true;
var iM50 = true;
var iM400 = true;
var iM1000 = true;
var iM2000 = true;
var iM2000p = true;

function instatiatelocalVars()
{
iName = localStorage.getItem("vName");
iSeconds = localStorage.getItem("vSecondsbetweenchange");
iMinimumBarrs= localStorage.getItem("vMinimumbarrs");
iInvites= localStorage.getItem("vInvites");
iMoments= localStorage.getItem("vMoments");
iFans= localStorage.getItem("vFans");
iM50= localStorage.getItem("v50likes");
iM400= localStorage.getItem("v400likes");
iM1000= localStorage.getItem("v1000likes");
iM2000= localStorage.getItem("v2000likes");
iM2000p= localStorage.getItem("v2000plikes");
iVolume= localStorage.getItem("vVolume");
iSuperchat= localStorage.getItem("vSuperchat");
iVoicechat= localStorage.getItem("vVoicechat");
}


function saveVars()
{

if(document.getElementById("ipName").value.localeCompare("") == 0 || document.getElementById("ipTimeBetweenColor").value.localeCompare("") == 0 || document.getElementById("ipMinimumBarrs").value.localeCompare("") == 0)
{
    document.getElementById("Status").innerHTML = "YOU FORGOT A VALUE";
}
else
{
document.getElementById("Status").innerHTML = "Status";

localStorage.setItem("vName", document.getElementById("ipName").value);
localStorage.setItem("vSecondsbetweenchange", document.getElementById("ipTimeBetweenColor").value);
localStorage.setItem("vMinimumbarrs", document.getElementById("ipMinimumBarrs").value);

localStorage.setItem("vInvites", document.getElementById("ipInvites").checked);
localStorage.setItem("vMoments", document.getElementById("ipMoments").checked);
localStorage.setItem("vFans", document.getElementById("ipFans").checked);

localStorage.setItem("v50likes", document.getElementById("ip1").checked);
localStorage.setItem("v400likes", document.getElementById("ip2").checked);
localStorage.setItem("v1000likes", document.getElementById("ip3").checked);
localStorage.setItem("v2000likes", document.getElementById("ip4").checked);
localStorage.setItem("v2000plikes", document.getElementById("ip5").checked);
localStorage.setItem("vVolume", document.getElementById("ip8").value);
localStorage.setItem("vVoicechat", document.getElementById("ip7").checked);
localStorage.setItem("vSuperchat", document.getElementById("ip6").checked);
}


}

function instatiateVars()
{

if(localStorage.getItem("vName") == "undefined")
    document.getElementById("ipName").value = "TestValue";

if(localStorage.getItem("vSecondsbetweenchange") == null)
    document.getElementById("ipTimeBetweenColor").value = "TestValue";

if(localStorage.getItem("vMinimumbarrs") == null)
    document.getElementById("ipMinimumBarrs").value = "TestValue";

 document.getElementById("ipName").value = localStorage.getItem("vName"); 
 document.getElementById("ipTimeBetweenColor").value = localStorage.getItem("vSecondsbetweenchange"); 
 document.getElementById("ipMinimumBarrs").value = localStorage.getItem("vMinimumbarrs"); 

 if(localStorage.getItem("vInvites") != null && localStorage.getItem("vInvites").localeCompare("true") == 0)
 document.getElementById("ipInvites").checked = true;

if(localStorage.getItem("vMoments") != null && localStorage.getItem("vMoments").localeCompare("true") == 0)
 document.getElementById("ipMoments").checked = true;

if(localStorage.getItem("vFans") != null && localStorage.getItem("vFans").localeCompare("true") == 0)
 document.getElementById("ipFans").checked = true;

if(localStorage.getItem("v50likes") != null && localStorage.getItem("v50likes").localeCompare("true") == 0)
 document.getElementById("ip1").checked = true;

if(localStorage.getItem("v400likes") != null && localStorage.getItem("v400likes").localeCompare("true") == 0)
 document.getElementById("ip2").checked = true;

if(localStorage.getItem("v1000likes") != null && localStorage.getItem("v1000likes").localeCompare("true") == 0)
 document.getElementById("ip3").checked = true;

if(localStorage.getItem("v2000likes") != null && localStorage.getItem("v2000likes").localeCompare("true") == 0)
 document.getElementById("ip4").checked = true;

if(localStorage.getItem("v2000plikes") != null && localStorage.getItem("v2000plikes").localeCompare("true") == 0)
 document.getElementById("ip5").checked = true; 

if(localStorage.getItem("vSuperchat") != null && localStorage.getItem("vSuperchat").localeCompare("true") == 0)
 document.getElementById("ip6").checked = true; 

if(localStorage.getItem("vVoicechat") != null && localStorage.getItem("vVoicechat").localeCompare("true") == 0)
 document.getElementById("ip7").checked = true; 

if(localStorage.getItem("vVolume") != null && localStorage.getItem("vVolume") != "undefined")
  document.getElementById("ip8").value = localStorage.getItem("vVolume"); 
}

//CONSTRUCTS FOR ANIMATIONS
function RefreshPage()
{
    if(started)
       location.reload(); 
}


async function RunCode()
{
    LoopInfo();
    instatiatelocalVars();

    document.getElementById("btn").innerHTML = "Refresh";
    started = true;
    await DownloadGifts();
    FetchBroadcastId();
    panelList = new Array(12);
    
    for(i = 1; i < 13;i++)
    {
    panelList[i-1] = document.getElementById("p" + i);
    }

    for(i = 0; i < 12;i++)
    {
    paneltimecounter[i] = 0;

    }

    ChangeColors();
}

async function ChangeColors()
{
    while(true)
    {
       ChangeColor();
       
        await sleep(1000);
    }
}



function ChangeColor()
{

    for(i = 0; i < 12;i++)
    {
        if(paneltimecounter[i] >= (document.getElementById("ipTimeBetweenColor").value *2)  && panelList[i].innerText != "") //30
        {
            panelList[i].style.backgroundImage = "url(" +'img/green.jpg' + ")";
            panelList[i].style.border = "none";
        }
        else if(paneltimecounter[i] >= document.getElementById("ipTimeBetweenColor").value && panelList[i].innerText != "") //15
        {
            panelList[i].style.backgroundImage = "url(" +'img/brown.jpg' + ")"; 
            panelList[i].style.border = "none";
        }

        if(panelList[i].innerText != "")
            paneltimecounter[i]++;
    }
}


async function DownloadGifts()
{
    console.log("Fetching Gifts...");
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://ynassets.younow.com/giftsData/live/de/data.json';
    var json = fetch(proxyUrl + targetUrl)
    .then(blob => blob.json())
    .then(data => {
    json = JSON.stringify(data, null, 2);
     goodies = JSON.parse(json);
    });
}


async function Retry()
{
    console.log("Retrying in 5 seconds");
    await sleep(5000);
    error = false;  
    FetchBroadcastId();
}

async function LoopInfo()
{
    while(true)
    {
        await sleep(5000);
        UpdateInfo();
    }    
}

async function FetchBroadcastId()
{
    console.log("Fetching Broadcast....");
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://api.younow.com/php/api/broadcast/info/curId=0/user=' + document.getElementById("ipName").value;
    var json = fetch(proxyUrl + targetUrl)
    .then(blob => blob.json())
    .then(data => {
    json = JSON.stringify(data, null, 2);
    var done = JSON.parse(json);
        if(json.length < 1)
        {
            console.log("No Data Found");
            error = true;
        }
        else if(done.errorCode != 0)
        {
            console.log("User not online or not found");

            error = true;
        }
        if(error)
        {
            document.getElementById("Status").innerHTML = "Error found retrying..";
            document.getElementById("ProgresColor").style.backgroundColor = "orange";

            console.log("Error Found Retrying")
            Retry();
            return;
        }
        else
        {
            userId = done.userId;
            broadcastId = done.broadcastId;
            document.getElementById("Status").innerHTML = "Connected.";
            document.getElementById("ProgresColor").style.backgroundColor = "green";

            FetchEvent();
            return;
        }
  })
  .catch(e => {  
  });
}

function UpdateInfo()
{
     console.log("Fetching Broadcast....");
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://api.younow.com/php/api/broadcast/info/curId=0/user=' +  document.getElementById("ipName").value;
    var json = fetch(proxyUrl + targetUrl)
    .then(blob => blob.json())
    .then(data => {
    json = JSON.stringify(data, null, 2);
    var done = JSON.parse(json);
        
    console.log(done);
    console.log(done.errorCode);
    if(done.errorCode == 0)
    {
        document.getElementById("t1").innerHTML = "Stream Number: " + done.broadcastsCount;
        document.getElementById("t2").innerHTML = "Total Guests: " + done.guestListCount;
        document.getElementById("t3").innerHTML = "Moment Views: " + done.momentViews;
        document.getElementById("t4").innerHTML = "New Fans: " + done.fans;

    
        if(firstrun)
        {
        	console.log(done.display_viewers);
        	console.log("TESTTEST");
            startviews = parseInt(done.display_viewers, 10);
            firstrun = false;
			document.getElementById("t5").innerHTML = "Avg Views: " + startviews;
        }
        else
        {
            startviews = (parseInt(startviews, 10) + parseInt(done.display_viewers, 10))/2;
            document.getElementById("t5").innerHTML = "Avg Views: " + startviews;
        }

    }

		document.getElementById("t6").innerHTML = "Silented Users:  <br> <br>" ;

    	var listOfSilentedusers = [];
    	listOfSilentedusers = done.silentFromChatUsers.match(/[0-9]+/g);
    	console.log(listOfSilentedusers[0]);
 		console.log(listOfSilentedusers);
    	listOfSilentedusers.forEach(addToSilentedUsers);



  })
  .catch(e => {  
  });
}


function addToSilentedUsers(item)
{
	console.log(item);
	var img = document.createElement("img");
	img.src = "https://ynassets.younow.com/user/live/"+item+"/"+item+".jpg";
	img.height = "50";
	img.width = "50";
	document.getElementById("t6").appendChild(img);
}


function TextToSpeech(text, name)
{

if(!text.includes("I became a fan!") && !text.includes("@") && !text.includes("captured a moment of") && !text.includes("invited") && text.length <= 100 && !text.includes("#"))
{
    var msg = new SpeechSynthesisUtterance(name + ' says ' + text);
    msg.lang = 'en-US';
    
 	if(text.includes("!!"))
 		msg.lang = 'de-DE';
 
    msg.volume = (document.getElementById("ip8").value/100)
    window.speechSynthesis.speak(msg);
}

}




function FetchEvent()
{
    //First Startup Connection:
    console.log("Succesfully Connected to WebSocket");	

    
	var pusher = new Pusher('d5b7447226fc2cd78dbb', {
        cluster: "younow"
    });
    var channel = pusher.subscribe("public-channel_" + userId);

    //Superchat
    channel.bind('onSuperMessage', async function(data) {
      console.log(data);
            var input =  data.message.superMessages[0].comment;
            var foundname = data.message.superMessages[0].name;
            if(document.getElementById("ip6").checked == true)
            TextToSpeech(input,foundname);
    });

    //Get Moments, Invites and Shares
    channel.bind('onChat', async function(data) {
        	
            var input =  data.message.comments[0].comment;
			var foundname = data.message.comments[0].name;

			console.log(document.getElementById("ip7").checked);
			console.log(document.getElementById("ip1").value);
			console.log(document.getElementById("ip2").value);
			console.log(document.getElementById("ip4").value);
			console.log(document.getElementById("ip5").value);
			console.log(document.getElementById("ip6").value);

            if(document.getElementById("ip7").checked == true)
            {

            console.log("Went trough");

            if(foundname.includes("adisaaaa"))
            {
                TextToSpeech(input,"adi");
            }
            else
                TextToSpeech(input,foundname.substring(0,4));
            }
        	
            if(input.includes("I became a fan!")  && document.getElementById("ipFans").checked == true)
        	{
        		if(newFans.length > 0)
        		for (b = 0; b < newFans.length; b++) 
        		{
        			var test = newFans[b].localeCompare(foundname);
					console.log("Found compare solution: " + test); 
                    		
					if(test == 0)
                    {
                    	console.log("Replica found for " + foundname);
						found = true;
					}
				}

				if(!found)
				{
                   await Animation("New Fan: <br>" + "<b>" + foundname.substring(0, 40) + "<b>"); 
				}
        	}

            //Invite Event
            if(input.includes("invited") && input.includes("fans to this broadcast.") && document.getElementById("ipInvites").checked == true)
            {
            	console.log(document.getElementById("ipInvites").value);

            	var found = false;
                var matches_array = input.match(/(\d+)/); 

                if(matches_array.length == 2)
                {
                	if(newInvites.length > 0)
                    for (b = 0; b < newInvites.length; b++) 
                    {          
                    	var test = newInvites[b].localeCompare(foundname);
                    	console.log("Found compare solution: " + test); 
                    		
                    	if(test == 0)
                    	{
                    		console.log("Replica found for " + foundname);
                    		found = true;
                    	}
                    }

                    if(!found)
                    {
                        console.log("Found");
                      await Animation("New Invite: <br>" + "<b>" + foundname.substring(0, 40) + "<b>"); 
                    }
                }
            }

            if(input.includes("captured a moment of")  && document.getElementById("ipMoments").checked == true)
            {
                if(lastmoment.localeCompare(foundname) != 0)
                {
                    lastmoment = foundname;
                    await Animation("New Capture: <br>" + "<b>" + foundname.substring(0, 40) + "<b>"); 
                }
                else
                {
                    console.log("Repeated Moment captured");
                }                
            }
    });
    //Get Gifts
    channel.bind('onGift', function(data) {
        var foundValue = 0;    
        var foundname = data.message.stageGifts[0].name;
        console.log(foundname);


        if(data.message != "undefined")
        {
            console.log("Gift number:" + data.message.stageGifts[0].giftId);  
                
            var foundgif; var foundlikes;
        
            //Test this
            for(b = 0; b < goodies.goodies.length; b++)
            {
                    if(data.message.stageGifts[0].giftId == goodies.goodies[b].id)
                    {
                        foundgif = goodies.goodies[b].SKU;
                        foundValue = goodies.goodies[b].cost;
                    }
            }
                            
            console.log(foundgif + " found gif" + foundValue);
           
            var test = foundgif.localeCompare("TIP");
            
            if(document.getElementById("ip1").checked == true  && foundValue <= 100 && foundValue >= 15)
            {
                var audio = new Audio('music/audio50.mp3');
                audio.play();
            }
            else if(document.getElementById("ip2").checked == true && foundValue <= 200 && foundValue > 100)
            {
                var audio = new Audio('music/audio400.mp3');
                audio.play();
            }
            else if(document.getElementById("ip3").checked == true && foundValue == 500)
            {
                var audio = new Audio('music/audio1000.mp3');
                audio.play();
            }
            else if(document.getElementById("ip4").checked == true && foundValue == 1000)
            {
                var audio = new Audio('music/audio2000.mp3');
                audio.play();
            }
            else if(document.getElementById("ip5").checked == true && foundValue > 1000)
            {
                var audio = new Audio('music/audio2500.mp3');
                audio.play();
            }


            if(test == 0)
            {
                Animation("New Gift from " + foundname.substring(0, 19) + ":" + "<br>"+ "<b>" + foundgif + "</b>");  
            } else if(foundValue > document.getElementById("ipMinimumBarrs").value)
            {
                Animation("New Gift from " + foundname.substring(0, 19) + ":" + "<br>"+ "<b>" + foundgif + "</b>");   
            }
        }
    });
}


//shift is first
//pop is last

async function Animation(Input)
{
    //Pop One
    var pickedelem = panelList.pop();   //Not remove first remove last
    paneltimecounter.pop();             //same here
    
    //Add at last part
    panelList.unshift(pickedelem);         //Add as first unshift
    paneltimecounter.unshift(0);

    document.getElementById(pickedelem.id).innerHTML = Input;

    pickedelem.parentNode.removeChild(pickedelem);

    //Add New stuff
    pickedelem.style.backgroundImage = "url(" +'img/RedPulse.gif' + ")";
    pickedelem.style.border = "none";
    document.getElementById("EventTracker").insertAdjacentElement('afterbegin', pickedelem);

 
    //set interval for sleep
    await sleep(3 * 1000);
}



function uuidv5() {
    return 'xxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function sleep(milliseconds) { return new Promise(resolve => setTimeout(resolve, milliseconds)); }



function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
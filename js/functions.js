var broadcastId;
var userId;
var self = this;
this.peerId = uuidv4();
this.signalingWS = null;
var error = false;
var lastmoment = "";

var newFans = [];
var newInvites = [];

var goodies;
var panelList;
var paneltimecounter = [];

var eventsToTrigger = [];

var userName = "UkuLuca";
//CONSTRUCTORS


//CONSTRUCTS FOR ANIMATIONS
async function RunCode()
{
    await DownloadGifts();
    FetchBroadcastId();
    panelList = new Array(14);
    
    for(i = 1; i < 15;i++)
    {
    panelList[i-1] = document.getElementById("p" + i);
    }

    for(i = 0; i < 14;i++)
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
       
        await sleep(30000);
    }
}



function ChangeColor()
{

for(i = 0; i < 14;i++)
{
    
    if(paneltimecounter[i] >= 10  && panelList[i].innerText != "") //30
    {
           panelList[i].style.borderColor  =  "rgb(57, 67, 185)";   
    }
    else if(paneltimecounter[i] >= 5 && panelList[i].innerText != "") //15
    {
           panelList[i].style.borderColor  = "rgb(191, 110, 40)";
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

async function FetchBroadcastId()
{
    console.log("Fetching Broadcast....");
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://api.younow.com/php/api/broadcast/info/curId=0/user=' + userName;
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
            console.log("Error Found Retrying")
            Retry();
            return;
        }
        else
        {
            userId = done.userId;
            broadcastId = done.broadcastId;
            console.log("Data Found");
            FetchEvent();
            return;
        }
  })
  .catch(e => {  
  });
}

function FetchEvent()
{
    //First Startup Connection:
    console.log("Succesfully Connected to WebSocket");	

    
	var pusher = new Pusher('d5b7447226fc2cd78dbb', {
        cluster: "younow"
    });
    var channel = pusher.subscribe("public-channel_" + userId);


    //For Single likes will be used later for now just console print
    channel.bind('onLikes', function(data) {
        console.log("1 Like");
        console.log(data);
    });

    //Get Moments, Invites and Shares
    channel.bind('onChat', async function(data) {
        	
            var input =  data.message.comments[0].comment;
			var foundname = data.message.comments[0].name;
               

        	if(input.includes("I became a fan!"))
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
                   await Animation("New Fan: " + foundname);
				}
        	}

            //Invite Event
            if(input.includes("invited") && input.includes("fans to this broadcast."))
            {
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
                      await Animation("New Invite: " + foundname);
                    }
                }
            }

            if(input.includes("captured a moment of"))
            {
                if(lastmoment.localeCompare(foundname) != 0)
                {
                    lastmoment = foundname;
                    await Animation("New Capture: " + foundname); 
                }
                else
                {
                    console.log("Repeated Moment captured");
                }                
            }
    });
    //Get Gifts
    channel.bind('onGift', function(data) {
            
        var foundname = data.message.stageGifts[0].name;
        console.log(foundname);
        if(data.message != "undefined")
        {
            console.log("Gift number:" + data.message.stageGifts[0].giftId);  
                
            var foundgif;
        
        //Test this
            for(b = 0; b < goodies.goodies.length; b++)
            {
                    if(data.message.stageGifts[0].giftId == goodies.goodies[b].id)
                    foundgif = goodies.goodies[b].SKU;
            }
                
            console.log(foundgif + " found gif");
        
            Animation("New Gift from " + foundname + ":" + "\n"+  foundgif); 
        }
    });
}




async function Animation(Input)
{
    //Pop One
    var pickedelem = panelList.shift();
    paneltimecounter.shift();
    

    //Add at last part
    panelList.push(pickedelem);
    paneltimecounter.push(0);

    document.getElementById(pickedelem.id).innerHTML = Input;


    pickedelem.parentNode.removeChild(pickedelem);

    //Add New stuff
    pickedelem.style.borderColor = "#940e0e";
    document.getElementById("EventTracker").appendChild(pickedelem);

 
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
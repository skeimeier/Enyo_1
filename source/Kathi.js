enyo.kind({
  name: "Kathi",
  kind: enyo.VFlexBox,
  components: [
		{name: "KathiService", kind: "WebService", 
		handleAs: "text",	//Response object
        url: "http://192.168.115.100:9000/HandleKey/",
        method: "GET",
        onSuccess: "kathiSuccess",
        onFailure: "kathiFailure"},
		
		{name: "KathiCurrent", kind: "WebService", 
		handleAs: "html",	//Response object
        url: "http://192.168.115.100:9000/Current/00001",
        method: "GET",
        onSuccess: "kathiCurrentSuccess",
        onFailure: "kathiFailure"},
				
		{kind: "ModalDialog", name: "errorBox",  lazy: false,  components: [
			{name: "errorData", content: "errorData", className: "enyo-text-error warning-icon"},
			{name: "errorMessage", content: "errorData", className: "enyo-text-error warning-icon"},
			{kind: "Button", caption: "OK", onclick: "closeDialog"}
		]},
		{kind: "PageHeader", content: "Enyo Kathrein",
		    components:[
			   {kind: "Image", src: "img/kathrein.png"},
			   {kind: "Image", name: "PingImg", src: "http://192.168.115.100:9000/icon/1", showing : true, onerror: "kathiFailure" },
			   //{kind: "Image", src: "http://192.168.115.100:9000/icon/2"},
			   //{kind: "Image", src: "http://192.168.115.100:9000/icon/3"},
			   //{kind: "Image", src: "http://192.168.115.100:9000/icon/4"},
			   //{kind: "Image", src: "http://192.168.115.100:9000/icon/5"},
			   //{kind: "Image", src: "http://192.168.115.100:9000/icon/6"},
			   //{kind: "Image", src: "http://192.168.115.100:9000/icon/7"},
			   //{kind: "Image", src: "http://192.168.115.100:9000/tvtv/4162"},
			   //{kind: "Image", src: "http://192.168.115.100:9000/tvtv/4163"},
			   {kind: "Image", src: "http://192.168.115.100:9000/tvtv/5"},
			   
			   {kind: "Image", src: "img/icons/Transparent.png"}			   
			]
		},
		{layoutKind: enyo.HFlexLayout,
		components: [
			{kind: "ActivityButton",name: "vol-",  caption: "Vol-", flex: 1, onclick: "doClick"},
			{kind: "ActivityButton",name: "p+",  caption: "P+", onclick: "doClick", flex: 1},
			{kind: "ActivityButton",name: "vol+",  caption: "Vol+", onclick: "doClick", flex: 1}
		]},
		{layoutKind: enyo.HFlexLayout,
		components: [
			{kind: "ActivityButton", name: "mute", caption: "Mute", onclick: "doClick", flex: 1},
			{kind: "ActivityButton", name: "p-", caption: "P-", onclick: "doClick", flex: 1},
			{kind: "ActivityButton", name: "info", caption: "Info", onclick: "doClick", flex: 1}
		]},
		{kind: "ActivityButton", name: "exit", disabled: false, active: false,  caption: "Back" , onclick: "doClick"},
		{kind: "KathiCurrent", name: "current" }, 
		//{kind: "ActivityButton", name: "PlugButton", disabled: false, active: false,  caption: "Plugwise" , onclick: ""},
		//{kind: "Button", name: "Komponent2", caption: "2"}, 

  ],
 
  rendered: function() {
        //enyo.log("PingImg.With ",this.PingImg.width);
        //this.ipsGetWZStatus();
		this.senderListe = [];
	    this.$.KathiCurrent.call('');
 		this.job = setInterval(enyo.bind(this, this.kathiCurrentUpdate), 10000);
		
 },


  doClick: function(inSender) {	
	var befehl = inSender.name; 
   	enyo.log("got Click from: ",befehl);
	url = "http://192.168.115.100:9000/HandleKey/"+ befehl;
   	enyo.log(url);
	this.$.KathiService.setUrl(url);
	this.$.KathiService.call('');
 },
 
  ipsTestForObj: function(inObj) {
			if( typeof inObj == 'object'){
				//var xobj = ipsobj[name];
				for(xname in inObj){
					if( typeof inObj[name] !== 'function'){  
						this.$.ipsshow.addContent(">");
						this.$.ipsshow.addContent(xname + " : " + inObj[xname]+ "<BR>");
						this.ipsTestForObj(inObj[xname]);
					}
				}		
			}
  },
  plugSuccess: function(inSender, inResponse) {
  	enyo.log("got success from Plugdevice:", inResponse);
   },
  
  plugSuccess: function(inSender, inResponse) {
  	enyo.log("got success from Plugdevice:", inResponse);

  },

  plugApiSuccess: function(inSender, inResponse) {
  	enyo.log("got success from Plugapi:", inResponse);
   var appls =  inResponse.getElementsByTagName("appliance");
   var count = appls.length;
  for(teil=0;teil<count;teil += 1 ){
        var id = appls[teil].getElementsByTagName("id")[0];
 		while (id){
			var name = id.tagName;
			var val = id.textContent;
			id = id.nextSibling;
		}
	}
  },
  
 kathiCurrentSuccess: function(inSender, inResponse) {
	enyo.log("got success from KathiCurrent:", inResponse);
	var myWebviev = this.$.current.$.currentWebView;
	myWebviev.setUrl("http://192.168.115.100:9000/Current/00001");
	myWebviev.node.hidden = false;
 }, 
 
 kathiCurrentUpdate: function() {
	var myWebview = this.$.current.$.currentWebView;
	if( myWebview.hasNode() ){
		var info = myWebview.node.contentDocument.getElementById("info");
		info.src = "/Detailed/00001T04162S1357848900";
		var detail = myWebview.node.contentDocument.getElementById("detail");
		
		//detail.style.visibility="visible";
		
		//var bars = myWebview.node.contentDocument.getElementsByTagName("id");
		//var logo  = bar.findNodeById("logo");
		var bar = myWebview.node.contentDocument.getElementById("Bar");;
		var barin = myWebview.node.contentDocument.querySelectorAll("#logo");
		//var barinfo = myWebview.node.
		var line = "";
		this.senderListe = [];  // Leeren
		this.findLogoUrl(barin);
	}
 }, 
 findLogoUrl: function(nodeListe){
	var sendInfo = {};
    var i = 0;
	for (var elem in nodeListe) {
		if(i === nodeListe.length) { return };
	    sendInfo.name = nodeListe[elem].querySelector("a").name; 
	    sendInfo.logoLink = (nodeListe[elem].querySelector("img")) ? nodeListe[elem].querySelector("img").src : null;
		var nextSib = nodeListe[elem].nextElementSibling;
		var cells = nextSib.querySelectorAll("table>tbody>tr>td"); 
		sendInfo.senderNo = cells[0].textContent;
		sendInfo.sender = cells[1].textContent;
		nextSib = nextSib.nextElementSibling;
		var icon = nextSib.childNodes[0].src;
		sendInfo.icon = icon;
		nextSib = nextSib.nextElementSibling;
		if( nextSib.attributes.length === 5 ){ 
			var klickText =  nextSib.attributes[2].childNodes[0].data;
				var sndID = klickText.split("'")[1];
		}else{ 
			var sndID = "";
		};
		sendInfo.detailId = klickText;
		var sendung = nextSib.childNodes[0].data;
		sendInfo.sendung = sendung;
		
		nextSib = nextSib.nextElementSibling;
		var cells = nextSib.querySelector("#textn>table>tbody>tr>td:nth-of-type(1)>img"); 
			sendInfo.fortschritt = (cells) ? cells.width : 0;
// Link zur SelectorSyntax->   http://www.w3schools.com/cssref/css_selectors.asp 			
//*[@id="textn"]/table/tbody/tr/td[1]/img
		this.senderListe.push(sendInfo);
		i++;
    }
	i=0;
 },
  kathiSuccess: function(inSender, inResponse) {
	enyo.log("got success from KathiService:", inResponse);
	//if(inResponse == ""){
	//	this.showDialog({data:"Kathi", message:" Keine Verbindung!"});		
	//}
	if(inResponse.error !== undefined){
		this.showDialog(inResponse.error);		
	}
	if(inResponse.id === "1"){
		var ipsobj = inResponse.result;
		enyo.log("got success from ipsJson:", ipsobj.ObjectName);
		this.results = ipsobj.ChildrenIDs;
	
		this.$.Komponent2.setContent(ipsobj.ObjectName);
		for(name in ipsobj){
			if( typeof ipsobj[name] !== 'function'){  
				this.$.ipsshow.addContent(name + " : " + ipsobj[name]+ "<BR>");
				this.ipsTestForObj(ipsobj[name]);
				/*if( typeof ipsobj[name] == 'object'){
					var xobj = ipsobj[name];
					for(xname in xobj){
						if( typeof xobj[name] !== 'function'){  
							this.$.ipsshow.addContent(">    " + xname + " : " + xobj[xname]+ "<BR>");
						}
					}		
				}	
				*/
			}
		}
		this.$.ipsButton.setActive(false);
		this.$.ipsButton.setDisabled(false);

	}
	if(inResponse.id === "100"){
		var ipsobj = inResponse.result*6.25;
		this.$.EZSlider.setPosition(ipsobj);
	}
	if(inResponse.id === "105"){
		var ipsobj = inResponse.result*6.25;
		this.$.WZSlider.setPosition(ipsobj);
	}
	if(inResponse.id === "106"){
		var ipsobj = inResponse.result;
		this.$.ToggleSchrankwand.setState(ipsobj);
	}

  },
  
  showDialog: function(inContent) {
    this.$.errorData.setContent(inContent.data);
    this.$.errorMessage.setContent(inContent.message);
    this.$.errorBox.openAtCenter();

  },
  closeDialog: function(inContent) {
        this.$.errorBox.close();

  },

  confirmClick: function() {
    // process confirmation
    //this.doConfirm();
    // then close dialog
    this.$.dialog.close();
 },
  kathiFailure: function(inSender, inResponse) {
		this.showDialog({data:"Kathi", message:" Keine Verbindung!"});
  },
	
	
	
	
	
	
	
  plugFailure: function() {
	enyo.log("got failure from Plugdevice");
  },
 
  create: function() {
	this.inherited(arguments);
	this.results = [];
  },
  getIpsItem: function(inSender, inIndex) {
	var r = this.results[inIndex];
	if (r) {
     // this.$.title2.setCaption(r);
      this.$.description2.setContent(inIndex);
      return true;
	}
  },
  esszimmerToggle: function(inSender, inState) {
    this.log("Toggled to state" + inState);
	//if(inState){
		this.$.ipsJson.call('{"jsonrpc": "2.0", "method": "FS20_SwitchMode", "params": [29910,'+inState+'],"id": "1"}');
	//}
	//else{
	//	this.$.ipsJson.call('{"jsonrpc": "2.0", "method": "FS20_SetIntensity", "params": [29910,false],"id": "1"}');
	//}
  },
  wohnzimmerToggle: function(inSender, inState) {
    this.log("Toggled to state" + inState);
	//if(inState){
		this.$.ipsJson.call('{"jsonrpc": "2.0", "method": "FS20_SwitchMode", "params": [55366,'+inState+'],"id": "1"}');
	//}
	//else{
	//	this.$.ipsJson.call('{"jsonrpc": "2.0", "method": "FS20_SetIntensity", "params": [45397,0,3],"id": "1"}');
	//}
  },
  wzsliderChange: function(inSender, inPos) {
    this.log("Slide to Pos: " + inPos);
	var pos = Math.round(inPos/6.25);
	this.$.ipsJson.call('{"jsonrpc": "2.0", "method": "FS20_SetIntensity", "params": [45397,'+pos+',0],"id": "1"}');

 },
  ezsliderChange: function(inSender, inPos) {
    this.log("Slide to Pos: " + inPos);
	var pos = Math.round(inPos/6.25);
	this.$.ipsJson.call('{"jsonrpc": "2.0", "method": "FS20_SetIntensity", "params": [59045,'+pos+',0],"id": "1"}');

 },
  fernsehnToggle: function(inSender, inState) {
    var status = inState?"on":"off";
	this.log("Fernsehn to State: " + status);
    
	this.$.Plugwise.call({applid:4,cmd:status});

 }

 







});
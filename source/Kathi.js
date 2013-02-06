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
				

		{name: "KathiInfo", kind: "WebService", 
		handleAs: "html",	//Response object
        url: "",
        method: "GET",
        onSuccess: "kathiInfoSuccess",
        onFailure: "kathiFailure"},


		{kind: "ModalDialog", name: "errorBox",  lazy: false,  components: [
			{name: "errorData", content: "errorData"}, 
			{name: "errorMessage", content: "errorMessage"}, 
			{kind: "Button", caption: "OK", onclick: "closeDialog"}
		]},
		
		{kind: "ModalDialog", name: "infoToast", lazy: false, flyInFrom: "top",  
			components: [
			{name: "infoSender", content: "1"}, 
			{name: "infoSendung", content: "2"}, 
			{name: "infoTitel", content: "3"}, 
			{name: "infoInfo", content: "4"}, 
			{kind: "Button", caption: "OK", onclick: "closeInfoToast"}
			]
		},
		{kind: "PageHeader", name: "header", content: "Enyo Kathrein",
		    components:[
			   {kind: "Image", src: "./img/kathrein.png"},
			   //{kind: "Image", name: "PingImg", src: "http://192.168.115.100:9000/icon/1", showing : true, onerror: "kathiFailure" }
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
		{kind: "Divider", caption: "Aktuelles Programm"},
		{kind: "Scroller", flex: 5, 
		    components: [
			        {kind: "Repeater", onSetupRow: "listSetupRow"}
			]
		},

		{kind: "KathiAktuellesProgramm", name: "current", 
				urlPage: "http://192.168.115.100:9000/Current/00001", 
				flex: 1 },
		{kind: "KathiAktuellesProgramm", name: "programmInfo", 
				urlPage: "", 
				flex: 1 }
		
		//{kind: "ActivityButton", name: "xxx", disabled: false, active: false,  caption: "xxxx" , onclick: "doXxx"},
		//{kind: "ActivityButton", name: "PlugButton", disabled: false, active: false,  caption: "Plugwise" , onclick: ""},
		//{kind: "Button", name: "Komponent2", caption: "2"}, 

  ],
 
  rendered: function() {
        //enyo.log("PingImg.With ",this.PingImg.width);
        //this.ipsGetWZStatus();
		
		this.deviceInfo = enyo.fetchDeviceInfo();

		this.senderListe = [];
		//this.$.current.setUrlPage("http://192.168.115.100:9000/Current/00001");
	    //this.$.KathiCurrent.call();
	    //this.$.KathiInfo.call();
		
		if(this.job){ clearInterval(this.job)};
 		this.job = setTimeout(enyo.bind(this, this.kathiCurrentUpdate), 500);
		
 },


  doClick: function(inSender) {	
	var befehl = inSender.name; 
   	enyo.log("got Click from: ",befehl);
	url = "http://192.168.115.100:9000/HandleKey/"+ befehl;
   	enyo.log(url);
	this.$.KathiService.setUrl(url);
	this.$.KathiService.call();
 },
 
  
 kathiCurrentSuccess: function(inSender, inResponse) {
	//enyo.log("got success from KathiCurrent:", inResponse);
	var myWebviev = this.$.current.$.currentWebView;
	//myWebviev.onLoadComplete = this.kathiCurrentUpdate();
	myWebviev.setUrl("http://192.168.115.100:9000/Current/00001");
	//myWebviev.node.hidden = true;
	//this.kathiCurrentUpdate();
 }, 
 
 kathiInfoSuccess: function(inSender, inResponse) {
	enyo.log("got success from KathiInfo:", inResponse);
	var myWebviev = this.$.programmInfo.$.currentWebView;
	
	myWebviev.setUrl(this.$.KathiInfo.url);
	//myWebviev.setUrl("http://192.168.115.100:9000/Current/00001");
	//myWebviev.node.hidden = true;
	this.kathiProgInfoUpdate();

 }, 

 kathiProgInfoUpdate: function() {
	var myWebview = this.$.programmInfo.$.currentWebView;
	if(this.job2){ clearTimeout(this.job2)};
 	this.job2 = setTimeout(enyo.bind(this, this.kathiProgInfoUpdate), 500);

	if( myWebview.hasNode() ){
		var infoContent = myWebview.node.contentDocument;
		if( infoContent.all.length > 3 ){
			var bars = myWebview.node.contentDocument.querySelectorAll("div#Bar");
			var texte1 = bars[0].querySelectorAll("td#text");
			var senderName = texte1[0].textContent + " " + texte1[1].textContent;
			var texte1 = bars[1].querySelectorAll("td#text");
			var progDauer_Name = texte1[0].textContent + " " + texte1[1].textContent;
			var contents = myWebview.node.contentDocument.querySelector("div#content").outerText;
			var texte = contents.split("\n");
			var infoTitel = texte[0];
			var infoText = texte[1];
			
			this.$.infoSender.setContent(senderName);
			this.$.infoSendung.setContent(progDauer_Name);
			this.$.infoTitel.setContent(infoTitel);
			this.$.infoInfo.setContent(infoText);

			if(this.job2){ clearTimeout(this.job2)};
			this.$.infoToast.open();
			this.job3 = setTimeout(enyo.bind(this, this.closeInfoToast), 5000);

			//*[@id="text"]
		}
	}
 },
 kathiCurrentReload: function() {
	this.$.current.setUrlPage("http://192.168.115.100:9000/Current/00001");
 	if(this.job){ clearTimeout(this.job)};
 	this.job = setTimeout(enyo.bind(this, this.kathiCurrentUpdate), 500);

 },
 kathiCurrentUpdate: function() {
	var myWebview = this.$.current.$.currentWebView;
	if(this.job){ clearTimeout(this.job)};
 	this.job = setTimeout(enyo.bind(this, this.kathiCurrentUpdate), 500);

	if( myWebview.hasNode() ){
	    if(this.senderListe.length){
		     if(this.job){ clearTimeout(this.job)};
 		     this.job = setTimeout(enyo.bind(this, this.kathiCurrentReload), 60000);
		}
		//var info = myWebview.node.contentDocument.getElementById("info");
		//info.src = "/Detailed/00001T04162S1357848900";
		//var detail = myWebview.node.contentDocument.getElementById("detail");
		
		//detail.style.visibility="visible";
		
		//var bars = myWebview.node.contentDocument.getElementsByTagName("id");
		//var logo  = bar.findNodeById("logo");
		var bar = myWebview.node.contentDocument.getElementById("Bar");;
		var barin = myWebview.node.contentDocument.querySelectorAll("#logo");
		//var barinfo = myWebview.node.
		var line = "";
		this.senderListe = [];  // Leeren
		if(barin.length){
			this.findLogoUrl(barin);
		}
	}
 }, 
 
 findLogoUrl: function(nodeListe){
    var i = 0;
	for (var elem in nodeListe) {
		var sendInfo = {};
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
		sendInfo.detailId = sndID;
		var sendung = nextSib.childNodes[0].data;
		sendInfo.sendung = sendung;
		
		nextSib = nextSib.nextElementSibling;
		var cells = nextSib.querySelector("#textn>table>tbody>tr>td:nth-of-type(1)>img"); 
			sendInfo.fortschritt = (cells) ? cells.width : 0;
// Link zur SelectorSyntax->   http://www.w3schools.com/cssref/css_selectors.asp 			
//*[@id="textn"]/table/tbody/tr/td[1]/img
		this.senderListe.push(sendInfo);
		i++;
		if(i === nodeListe.length) { 
			this.$.repeater.render(); 
			return 
		};
    }
	i=0;
	this.$.repeater.render();
 },
 
 listSetupRow: function(inSender, inIndex) {
	var d = this.senderListe;
	if(d){
		if (inIndex < d.length-1) {
			var name = d[inIndex].name;
			var logo = d[inIndex].logoLink;
			var senderNo =  d[inIndex].senderNo; 
			//if (this.deviceInfo){
				//if (this.deviceInfo.screenWidth < 1000 ){
					return {kind: "SwipeableItem", tapHighlight: true, layoutKind: "HFlexLayout",
					className: "kathi-current-item",
						components: [
							//{kind: "IconButton", label: senderNo, icon: '<img src="' + logo + '"/>' },
							{kind: "Item",  tapHighlight: true, 
									layoutKind: "HFlexLayout", style: "padding: 0px 0px; width: 100px; border: 0px ", onclick: "switchToSender",
								components: [
									{content: senderNo, 
									  className: "kathi-current-item-text", flex:1
									},
									{content: '<img src="' + logo + '"/>',flex: 2}
								]
							},
							
							{content: d[inIndex].sender, 
							        tapHighlight: true,
									className: "kathi-current-item-text",   flex: 1},
							{content: d[inIndex].sendung, 
									className: "kathi-current-item-text", 
									flex: 1},
							{kind: "InfoButton", 
									sndID : d[inIndex].detailId,
									onclick: "currentInfo"
									},
							{kind: "ProgressBar", 
									position: d[inIndex].fortschritt, 
									style: "padding: 0px;", flex: 1},
							{content: d[inIndex].fortschritt + "%", 
									className: "kathi-current-item-text" 
							}
							//{content: this.decodeUTF8(d[inIndex].name), style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;",  flex: 1},
							//{content: d[inIndex].name, style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;",  flex: 1},
							//{kind: "ToggleButton", disabled:  lockstate, state: powerstate, onLabel: "AN", offLabel: "AUS",onChange: "PlugToggle",flex:1}
						]
					};
				//};
				/* 
				if (this.deviceInfo.screenWidth > 1000 ){
					return {kind: "SwipeableItem", layoutKind: "HFlexLayout", onclick: "itemClick", 
						components: [
							{content: '<img src="' + url + d[inIndex].image + '"  class="enyo-roundy"/>',flex: 1},
							{content: 'ID: '+d[inIndex].id,flex: 1},
							//{content: this.decodeUTF8(d[inIndex].name), style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;", flex: 1},
							{content: this.decodeIt(d[inIndex].name), style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;",  flex: 1},
							{content: d[inIndex].powerusageround, flex: 1},
							{kind: "ToggleButton", disabled:  lockstate, state: powerstate, onLabel: "AN", offLabel: "AUS",onChange: "PlugToggle",flex:1},
							{content: 'Lock '+lock.substr(4)+" = "+lockstate, flex: 1},
							{content: 'Switch '+powerstate, flex: 1}
						]
					};
				};
			}
			else{
				return {kind: "SwipeableItem", layoutKind: "HFlexLayout", onclick: "itemClick", 
					components: [
						{content: '<img src="' + url + d[inIndex].image + '"  class="enyo-roundy"/>',flex: 1},
						{content: 'ID: '+d[inIndex].id,flex: 1},
						//{content: this.decodeUTF8(d[inIndex].name), style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;",flex: 1},
						{content: this.decodeIt(d[inIndex].name), style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;",  flex: 1},
						{content: d[inIndex].powerusageround, flex: 1},
						{kind: "ToggleButton", disabled:  lockstate, state: powerstate, onLabel: "AN", offLabel: "AUS",onChange: "PlugToggle",flex:1},
						{content: 'Lock '+lock.substr(4)+" = "+lockstate, flex: 1},
						{content: 'Switch '+powerstate, flex: 1}
					]
				};
			};
			
		};
			
		};
		*/
	}
	}
	},

 
  kathiSuccess: function(inSender, inResponse) {
	enyo.log("got success from KathiService:", inResponse);
	//if(inResponse == ""){
	//	this.showDialog({data:"Kathi", message:" Keine Verbindung!"});		
	//}
	if(inResponse.error !== undefined){
		this.showDialog(inResponse.error);		
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
  
  closeInfoToast: function(inContent) {
        this.$.infoToast.close();

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
  currentInfo: function(inSender, inResponse) {
	//	this.showDialog({data:"AbrufID", message: inSender.sndID});
		this.$.KathiInfo.url = "http://192.168.115.100:9000/Detailed/"+inSender.sndID;
		this.$.KathiInfo.call();
		
  },
  switchToSender: function(inSender, inResponse) {
		this.showDialog({data:"Sender:", message: inSender.components[0].content});
   },
	
 
  create: function() {
	this.inherited(arguments);
	this.results = [];
  }

 
});

enyo.kind({
  name: "InfoButton",
  kind: "IconButton", 
  published: {
		sndID : "sndIDtest"
  },
  label: "Info", 
  icon: "img/icons/Information.png",
  create: function() {
		this.inherited(arguments);
  }
});
							

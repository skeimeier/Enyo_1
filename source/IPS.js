enyo.kind({
  name: "MyApps.IPS",
  kind: enyo.VFlexBox,
  components: [
		{name: "ipsJson", kind: "WebService", 
		handleAs: "json",	//Response object
		//contentType: "application/json",	//Request object type
        url: "http://192.168.115.22:82/jsonrpc.php",
        method: "POST",
        onSuccess: "ipsSuccess",
        onFailure: "ipsFailure"},
		
		{name: "Plugwise", kind: "WebService", 
		handleAs: "xml",	//Response object
		//contentType: "application/json",	//Request object type
        url: "http://192.168.115.22:8080/cc.html",
        method: "GET",
        onSuccess: "plugSuccess",
        onFailure: "plugFailure"},
		
		{name: "PlugwiseApi", kind: "WebService", 
		handleAs: "xml",	//Response object
		//contentType: "application/json",	//Request object type
        url: "http://192.168.115.22:8080/api/data.xml",
        method: "GET",
        onSuccess: "plugApiSuccess",
        onFailure: "plugFailure"},
		
		{kind: "ModalDialog", name: "errorBox",  lazy: false,  components: [
			{name: "errorData", content: "errorData", className: "enyo-text-error warning-icon"},
			{name: "errorMessage", content: "errorData", className: "enyo-text-error warning-icon"},
			{kind: "Button", caption: "OK", onclick: "closeDialog"}
		]},
		{kind: "PageHeader", content: "Enyo IPS",
		    components:[
			   {kind: "Image", src: "img/icons/IPS.png"},
			   {kind: "Image", src: "img/icons/Transparent.png"},
			   {content: "IP-Symcon"}
			   
			]
		},
		{kind: "DividerDrawer", caption: "Esszimmer", components: [
			{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout",		
				components: [
					{content: "Licht-Cube ", flex: 1},
					{name: "EZSlider", kind: "Slider", flex: 1, onChanging: "ezsliderChanging", onChange: "ezsliderChange"},
				]
			},
			{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout",		
				components: [
					{content: "Glasvitriene ", flex: 1},
					{name: "ToggleGlasvitriene", kind: "ToggleButton", state: true, onLabel: "AN", offLabel: "AUS",onChange: "esszimmerToggle"}
				]
			}
			]
		},
		{kind: "DividerDrawer", caption: "Wohnzimmer", components: [
			{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout",
				components: [
					{content: "Licht-Cube ", flex: 1},
					{name: "WZSlider", kind: "Slider", flex: 1, onChanging: "wzsliderChanging", onChange: "wzsliderChange"},
				]
			},
			{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout",		
				components: [
					{content: "Schrankwand ", flex: 1},
					{name: "ToggleSchrankwand", kind: "ToggleButton", flex: 1, state: true, onLabel: "AN", offLabel: "AUS",onChange: "wohnzimmerToggle"}
				]
			},
			{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout",		
				components: [
					{content: "Fernsehn ", flex: 1},
					{name: "ToggleFernsehn", kind: "ToggleButton", flex: 1, state: true, onLabel: "AN", offLabel: "AUS",onChange: "fernsehnToggle"}
				]
			}



			]
		},

		{kind: "ActivityButton", name: "ipsButton", disabled: false, active: false,  caption: "IPS" , onclick: "ipsClick"},
		{kind: "ActivityButton", name: "PlugButton", disabled: false, active: false,  caption: "Plugwise" , onclick: "plugClick"},
		{name: "Komponent2",kind: "Button", caption: "2"}, 

  ],
  rendered: function() {
        this.ipsGetEZStatus();
        this.ipsGetWZStatus();
 },
  ipsGetEZStatus: function() {
	this.$.ipsJson.call('{"jsonrpc": "2.0", "method": "GetValue", "params": [46400],"id": "100"}');
  },
  ipsGetWZStatus: function() {
	this.$.ipsJson.call('{"jsonrpc": "2.0", "method": "GetValue", "params": [41791],"id": "105"}');
	this.$.ipsJson.call('{"jsonrpc": "2.0", "method": "GetValue", "params": [40009],"id": "106"}');

  },
  plugClick: function(inSender) {	
	this.$.PlugwiseApi.call({type: 'appliances'});
  },
  ipsClick: function(inSender) {	
    //var url = "http://192.168.115.22:82/jsonrpc.php";
	//this.$.ipsJson.setUrl(url);
	//this.$.ipsJson.call('{"jsonrpc": "2.0", "method": "IPS_GetAllInstances", "params": [0],"id": "1"}');
	//this.$.ipsJson.call('{"jsonrpc": "2.0", "method": "IPS_GetInstanceListByModuleID", "params": ["{48FCFDC1-11A5-4309-BB0B-A0DB8042A969}"],"id": "1"}');
   //IPS_GetInstanceListByModuleID("{EE4A81C6-5C90-4DB7-AD2F-F6BBD521412E}"
	//this.$.ipsJson.call('{"jsonrpc": "2.0", "method": "IPS_GetScript", "params": [25994],"id": "1"}');
	//49017  /*[Aussen]*/
	//46400  /*[Erdgeschoss\Esszimmer\Sideboard-Lampe\Intensität]*/
	//this.$.ipsJson.call('{"jsonrpc": "2.0", "method": "FS20_SetIntensity", "params": [59045,7,0],"id": "1"}');
	this.$.ipsJson.call('{"jsonrpc": "2.0", "method": "GetValue", "params": [40009],"id": "111"}');
	 //inSender.setActive(true);
	 this.$.ipsButton.setActive(true);
	 this.$.ipsButton.setDisabled(true);
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

  
  ipsSuccess: function(inSender, inResponse) {
	enyo.log("got success from ipsJson:", inResponse);
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
	
	
	
	
	
	
	
  ipsFailure: function() {
	enyo.log("got failure from ipsJson");
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
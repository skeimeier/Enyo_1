enyo.kind({
  name: "KathiCurrent",
  kind: enyo.Scroller, flex: 1, 
	components: [
			{kind: (window.PalmSystem ? enyo.WebView : enyo.Iframe),
			name: "currentWebView", flex: 1, 
			onLoadComplete: "hideWebViewSpinner", 
			onLoadStarted: "showWebViewSpinner"
			},
			{kind: enyo.Spinner, name: "feedWebViewSpinner", align: "center"}

	],
	rendered: function() {
     this.inherited(arguments);
       enyo.log("Current rendered ");
        //this.ipsGetWZStatus();
	    
    },
	hideWebViewSpinner: function() {
		this.$.feedWebViewSpinner.hide();
	},
	showWebViewSpinner: function() {
		this.$.feedWebViewSpinner.show();
	},


		
 
  
  
})
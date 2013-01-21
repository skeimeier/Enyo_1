enyo.kind({
  name: "KathiAktuellesProgramm",
  kind: enyo.Scroller, flex: 1, 
    published: {
		urlPage : ""
    },

	components: [
			{kind: "WebView", //(window.PalmSystem ? enyo.WebView : enyo.Iframe),
			name: "currentWebView", flex: 1 , lazy: false,
					url : this.urlPage,
					//onLoadComplete: "hideWebViewSpinner", 
					//onLoadStarted: "showWebViewSpinner"
			},
			{kind: enyo.Spinner, name: "feedWebViewSpinner", align: "center"}

	],
	create: function() {
     this.inherited(arguments);
       enyo.log("Current created:"+this.urlPage);
		this.$.currentWebView.setUrl(this.urlPage);
		
	},
	rendered: function() {
     this.inherited(arguments);
       enyo.log("Current rendered ");
	    
    },
	hideWebViewSpinner: function() {
		this.$.feedWebViewSpinner.hide();
	},
	showWebViewSpinner: function() {
		this.$.feedWebViewSpinner.show();
	},
	urlPageChanged: function(to_new){
		this.$.currentWebView.setUrl(to_new);
	}
	

		
 
  
  
})
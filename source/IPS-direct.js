enyo.kind({
  name: "MyApps.IPS",
  kind:  enyo.Scroller,
  components: [
		{kind: "WebView", url: "http://192.168.115.22:82",
		onLoadComplete: "doresize"}
		], 
	doresize: function(){
		this.resize();
	}






});
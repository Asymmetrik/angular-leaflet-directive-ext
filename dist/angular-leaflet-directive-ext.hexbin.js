/*! angular-leaflet-directive-ext Version: 0.1.0 */
angular.module('leaflet-directive.ext.hexbin', ['leaflet-directive']).config(function($provide){
	"use strict";

	$provide.decorator('leafletDirective', function($delegate){
		// Just adding the scope variable called 'hexbin'
		$delegate[0].scope.hexbin = "=";
		return $delegate;
	});
});
angular.module("leaflet-directive.ext.hexbin").directive('hexbin', function() {
	"use strict";

	return {
		restrict : "A",
		scope : false,
		replace : false,
		require : 'leaflet',
		link : function(scope, element, attrs, controller) {
			// Get the leaflet scope, so we can access the hexbin variable
			var leafletScope  = controller.getLeafletScope();

			controller.getMap().then(function(map) {
				// Initialize the hexbin layer
				var hexLayer = L.hexbinLayer(leafletScope.hexbin.config).addTo(map);

				// Watch the hexbin scope variable
				leafletScope.$watch('hexbin.data', function(){
					hexLayer.data(leafletScope.hexbin.data);
				});

				hexLayer.data(leafletScope.hexbin.data);
			});
		}
	};
});
sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'project1/test/integration/FirstJourney',
		'project1/test/integration/pages/railwayList',
		'project1/test/integration/pages/railwayObjectPage'
    ],
    function(JourneyRunner, opaJourney, railwayList, railwayObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('project1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTherailwayList: railwayList,
					onTherailwayObjectPage: railwayObjectPage
                }
            },
            opaJourney.run
        );
    }
);
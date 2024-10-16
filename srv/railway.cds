using {com.satinfotech.xml as rail} from '../db/schema';

service railways {
    entity railway as projection on rail.railway actions{action convertToXML() returns String} ;
        
    
    

}
annotate railways.railway with  @odata.draft.enabled ;

annotate railways.railway with @(

     UI.LineItem           : [
        {
            Label: 'PNR Number',
            Value: pnr_no
        },
        {
            Label: 'Train number',
            Value: trn
        },
        {
            Label: 'From Address',
            Value: from_add
        },
        {
            Label: 'To Address',
            Value: to_add
        },
        {
            Label: 'Selected Berth',
            Value: berth_selected
        },
        {
            Label: 'Date of Journey',
            Value: doj
        },
        {
            Label: 'Selected Class',
            Value: classs
        },
    ],
    UI.FieldGroup #railway: {
        $Type: 'UI.FieldGroupType',
        Data : [
         {
            Label: 'PNR Number',
            Value: pnr_no
        },
        {
            Label: 'Train number',
            Value: trn
        },
        {
            Label: 'From Address',
            Value: from_add
        },
        {
            Label: 'To Address',
            Value: to_add
        },
        {
            Label: 'Selected Berth',
            Value: berth_selected
        },
        {
            Label: 'Date of Journey',
            Value: doj
        },
        {
            Label: 'Selected Class',
            Value: classs
        }
        ],
    },
    UI.Facets             : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'railwayFacet',
        Label : 'railway facets',
        Target: '@UI.FieldGroup#railway'
    }, ]

);


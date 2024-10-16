namespace com.satinfotech.xml;
using {managed,cuid} from '@sap/cds/common';

entity railway : managed,cuid {
    pnr_no : String(10);
    trn:String(6);
    from_add:String(40);
    to_add:String(40);
    berth_selected:String(30);
    doj:Date;
    classs:String(30);

    
}


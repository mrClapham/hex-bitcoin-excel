document.addEventListener("DOMContentLoaded", function(){
    init();
});

function init(){
    console.log("Dom Loaded ", this);
    initBitcoin();
    try{
        fin.desktop.main(function(){
            initWithOpenFin();
        })
    }catch(err){
        initNoOpenFin();
    }
};


function initWithOpenFin(){
    initExcel();
};

function initNoOpenFin(){
    console.log("OpenFin is not available - you are probably running in a browser.");
};

function createDivCell(data){
    var _div = document.createElement('div');
    var _p = document.createElement('p');
    var _t = document.createTextNode("Bitcoin: "+data[0]+" =  $"+data[1]);
    _p.appendChild(_t);
    _div.appendChild(_p);
    return _div;
}

function initExcel(){
    Excel = fin.desktop.Excel;
    Excel.init();
    Excel.getConnectionStatus(excelCallback);
    Excel.addEventListener("connected", onExcelConnected);

    Excel.addEventListener("workbookAdded", excelCallback);
    Excel.addEventListener("workbookClosed", excelCallback);
    Excel.addEventListener("workbookActivated", function(w){
        console.log("THERE HAS BEEN A WORKBOOK workbookActivated");
    });
}
getWorkbookByName = function(name) {
    return new Promise(function (resolve, reject) {
        fin.desktop.Excel.getWorkbooks(function (workbooks) {
            var wb = workbooks.filter(function (d, i) {
                    return d.name === name + ".xlsx"
                }
            );
            wb.length > 0 ? resolve(wb[0]) : reject("no workbook with the name"+name+".")
        })
    });
};

function getWorksheetbyName(book, sheet){
    return new Promise(function(resolve, reject){
        getWorkbookByName(book).then(function(d,i){
           var _sheets = d.getWorksheets(function(ws){
                var _chosenSheet = ws.filter(function(dd,ii){
                    return dd.name === sheet
                });
               console.log("_chosenSheet : ",_chosenSheet)
               _chosenSheet.length > 0 ? resolve(_chosenSheet[0]) : reject(book+ " has no worksheet called "+ sheet);
            });

        });
    });
}

//-- Excel utility function


// --- Excel Callbacks

onExcelConnected = function(){
    ///////
};

onExcelWorkbookAdded = function(){
    //////
};

onExcelWorkbookClosed = function(){
    ////////
};



excelCallback = function(e){

    getWorksheetbyName('bitcoin', 'Sheet991').then(function(s){
        console.log("THE WORKSHEET HAS BEEN FOUND ",s)
    }).catch(function(err){
        console.log("ERROR ", err);
    })
};

function setSheetData(sheet, data){

}



function initBitcoin(){
    var bids_placeholder = document.querySelector("#bids_placeholder");
    var asks_placeholder = document.querySelector("#asks_placeholder");
    var pusher = new Pusher('de504dc5763aeef9ff52');
    var order_book_channel = pusher.subscribe('order_book');

    order_book_channel.bind('data', function(data) {
        while (bids_placeholder.firstChild) bids_placeholder.removeChild(bids_placeholder.firstChild);
        while (asks_placeholder.firstChild) asks_placeholder.removeChild(asks_placeholder.firstChild);

        data.bids.filter(function(dd,ii){
            return dd[1] > 0
        }).map(function(d,i){
            bids_placeholder.appendChild( createDivCell(d) );
        });

        data.asks.filter(function(dd,ii){
            return dd[1] > 0
        }).map(function(d,i){
            asks_placeholder.appendChild( createDivCell(d) );
        });
    });
}
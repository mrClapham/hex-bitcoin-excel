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
    alert("OpenFin is available");
    // Your OpenFin specific code to go here...
    //https://www.bitstamp.net/api/transactions/
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

function initBitcoin(){
    console.log("INIT BITCOIN ");


        var bids_placeholder = document.querySelector("#bids_placeholder");
        var asks_placeholder = document.querySelector("#asks_placeholder");
        var pusher = new Pusher('de504dc5763aeef9ff52');
        var order_book_channel = pusher.subscribe('order_book');

        order_book_channel.bind('data', function(data) {
            console.log(">>>> DATA: ",data);
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
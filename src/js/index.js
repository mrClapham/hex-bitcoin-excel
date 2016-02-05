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

function initBitcoin(){
    console.log("INIT BITCOIN ");
}
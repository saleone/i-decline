// ==UserScript==
// @name Lazyman Decliner
// @namespace https://steamcommunity.com/
// @author Saša Savić <sasa.savic@protonmail.com>
// @description Declines every trade (that is not confirmed).
// @version 1.0.0
// @include https://steamcommunity.com/id/*/tradeoffers/
// @include http://steamcommunity.com/id/*/tradeoffers/
// @grant none
// ==/UserScript==

console.log("Starting lazymans decliner.");
divCloseAll = document.createElement("div");
divCloseAll.className = "btn_darkblue_white_innerfade btn_medium new_trade_offer_btn responsive_OnClickDismissMenu";
divCloseAll.innerHTML = "<span> Decline all trade offers...</span>";
divCloseAll.style="margin-top: 10px";
divCloseAll.on("click", declineEverything);
document.querySelector(".rightcol_controls_content").appendChild(divCloseAll);

function declineEverything() {
    var tradeOffers = document.querySelectorAll(".tradeoffer");
    for (var i = 0; i < tradeOffers.length; i++) {
        var tradeId = tradeOffers[i].getAttribute("id").split("_")[1];
        DeclineTradeOffer(tradeId);
        document.querySelector(".newmodal_buttons > div.btn_green_white_innerfade.btn_medium").click();
    }
}

function sleep(ms)
{
    // Stop the execution of the script for specified time.
    var dt = new Date();
    dt.setTime(dt.getTime() + ms);
    while (new Date().getTime() < dt.getTime());
}
 // TODO: Koristi setInterval da izbjednes kocenje skripte, declinuj trade po  trade sa querySelector(".tradeoffer") sto izbjegava for

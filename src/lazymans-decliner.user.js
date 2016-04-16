// ==UserScript==
// @name iDecline
// @namespace https://steamcommunity.com/
// @author Saša Savić <sasa.savic@protonmail.com>
// @description Declines every trade (that is not confirmed).
// @version 1.0.0
// @include https://steamcommunity.com/id/*/tradeoffers/
// @include http://steamcommunity.com/id/*/tradeoffers/
// @include https://csgolounge.com/mytrades
// @include http://csgolounge.com/mytrades
// @grant none
// ==/UserScript==

console.log("Starting to reject dem bitches.");

// Extend array so it can search for values contained in itself
Array.prototype.contains = function (value) {
    for (var i in this) {
        if (this[i] == value) {
            return true;
        }
    }
    return false;
};

// List of URLs that match the page we want
urls_mytrades = ["https://csgolounge.com/mytrades",
    "https://www.csgolounge.com/mytrades",
    "http://csgolounge.com/mytrades",
    "http://www.csgolounge.com/mytrades"];

if (urls_mytrades.contains(window.location.href)) {
    // We are on CS:GO Lounge trades page.
    aDoneAll = document.createElement("a");
    aDoneAll.id = "repost-button";
    aDoneAll.className = "buttonright";
    aDoneAll.innerHTML = "CLOSE ALL TRADES";
    aDoneAll.addEventListener("click", function () {
        var trades = document.querySelectorAll(".tradepoll");
        for (var i = 0; i < trades.length; i++) {
            trashTrade(trades[i].getAttribute("id").slice(5));
        }
    });
aDoneAllParent = document.querySelector("article.standard");
aDoneAllParent.insertBefore(aDoneAll, aDoneAllParent.firstChild);

} else {
    // We are not on CS:GO Lounge, so we must be on Steam.
    divCloseAll = document.createElement("div");
    divCloseAll.className = "btn_darkblue_white_innerfade btn_medium new_trade_offer_btn responsive_OnClickDismissMenu";
    divCloseAll.innerHTML = "<span>Nabijem Vas Sve Na Kurac</span>";
    divCloseAll.style="margin-top: 12px";
    divCloseAll.addEventListener("click", declineEverything);
    document.querySelector(".rightcol_controls_content").appendChild(divCloseAll);
}

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

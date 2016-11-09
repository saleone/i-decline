// ==UserScript==
// @name iDecline
// @namespace https://steamcommunity.com/
// @author Saša Savić <sasa.savic@protonmail.com>
// @description Mr.Proper All in One
// @version 1.3.0
// @include https://steamcommunity.com/id/*/tradeoffers/
// @include http://steamcommunity.com/id/*/tradeoffers/
// @include https://csgolounge.com/mytrades
// @include http://csgolounge.com/mytrades
// @include https://csgolounge.com/trade?t=*
// @include http://csgolounge.com/trade?t=*
// @grant none
// ==/UserScript==

console.log("Starting iDecline.");

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
    "http://www.csgolounge.com/mytrades",
    "/trade"];

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

} else if (urls_mytrades.contains(window.location.pathname)) {
    // We are still on CS:GO Lounge, and we want to clean comments section
    var trashCan = document.querySelectorAll("#messages img");
    var img = "http://csgolounge.com/img/trash.png";
    var clean = document.getElementsByClassName("buttonright")[0];

    purgeBtn = document.createElement("a");
    purgeBtn.className = "buttonright";
    purgeBtn.innerHTML = "<div>PURGE</div>";
    purgeBtn.addEventListener("click", function() {
        for (i = 0; i < trashCan.length; i++) {
            if (trashCan[i].src == img) {
                trashCan[i].click();
            }
        }
        setTimeout(function () {
            clean.click();
        }, 1500);
    });
    document.querySelector("body > main > section:nth-child(1) > div.box-shiny-alt > div:nth-child(1)").appendChild(purgeBtn);

} else {
    // We are not on CS:GO Lounge, so we must be on Steam.
    divCloseAll = document.createElement("div");
    divCloseAll.className = "btn_darkblue_white_innerfade btn_medium new_trade_offer_btn responsive_OnClickDismissMenu";
    divCloseAll.innerHTML = "<span>Decline All</span>";
    divCloseAll.style="margin-top: 12px";
    divCloseAll.addEventListener("click", function () {
        var tradeOffers = document.querySelectorAll(".tradeoffer");
        for (var i = 0; i < tradeOffers.length; i++) {
            var tradeId = tradeOffers[i].getAttribute("id").split("_")[1];
            DeclineTradeOffer(tradeId);
            document.querySelector(".newmodal_buttons > div.btn_green_white_innerfade.btn_medium").click();
        }
    });
    document.querySelector(".rightcol_controls_content").appendChild(divCloseAll);
}

<?php

$test = 
'base/translate.js,
base/userLan.js,
base/navBar.js,
base/LPreLoad.js,
base/LBaseData.js,
base/base.js,
base/boxWrapper.js,
base/rank.js,
player.js,
world/province.js,
world/city.js,
fullscr.js,
alert.js,
city/city_profile.js,
city/army_building.js,
interatction.js,
base/schadular.js,
building.js,
city/cityBuilding.js,
city/PlayerHero.js,
army.js,
hero.js,
heroArmy.js,
matrial.js,
LItemUse.js,
education.js,
menu-list/menuList.js,
menu-list/exchange.js,
menu-list/battelReport.js,
menu-list/dominant.js,
menu-list/LItem.js,
ws/server.js,
ws/wsBattel.js,
ws/lib/chat.js,
ws/lib/battel.js,
ws/lib/guild.js,
ws/lib/mail.js,
ws/lib/hero.js,
ws/lib/player.js,
ws/lib/serverAnnounce.js,
ws/lib/city.js,
ws/lib/Base.js,

world/worldUnit.js,
world/worldCampBox.js,
world/worldUtil.js,
world/worldUnitPrize.js,
world/worldMap.js,
world/world.js,
battel.js,
guild.js,
message.js,
quest.js,
lastUtil.js,
tools/luck_wheel.js,
tools/market.js,
tools/palace.js,
tools/spy.js,
navigate.js,
animation.js,
equipment.js,
tools/tradeCenter.js,
tools/jop.js,
battel/joinAttack.js,
battel/battelField.js,
feature/godGate.js,
feature/setting.js,
feature/emjoi.js,
ui/ui.js';

$files = explode(",", $test);
$file = "";
foreach ($files as $one) {
    $file .= file_get_contents("../js-10.55.85/" . trim($one));
    
    
}

file_put_contents("totalFile.js", $file);
echo 'Obs';
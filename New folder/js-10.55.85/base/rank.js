
var Rank = {};

Rank.playerRow = function (offset, json_data) {
    var _return = "";

    _return += `<div class="th">
                       <div class="td_1 ellipsis" style="width: 14.5%">${Translate.Title.TH.Ranking[UserLag.language]}</div>
                       <div class="td_2 ellipsis" style="width: 14.5%">${Translate.Title.TH.Lord[UserLag.language]}</div>
                       <div class="td_3 ellipsis" style="width: 14.5%">${Translate.Title.TH.League[UserLag.language]}</div>
                       <div class="td_4 ellipsis" style="width: 14.5%">${Translate.Title.TH.NobleRank[UserLag.language]}</div>
                       <div class="td_5 ellipsis" style="width: 14.5%">${Translate.Title.TH.Honor[UserLag.language]}</div>
                       <div class="td_6 ellipsis" style="width: 14.5%">${Translate.Title.TH.Prestige[UserLag.language]}</div>
                       <div class="td_7 ellipsis" style="width: 13.0%">${Translate.Button.General.Action[UserLag.language]}</div>
                   </div>`;

    if (json_data.length > 0) {
        
        var title_count = 0;
        var p_name = "";
        var name = "";
        
        for (var iii in json_data) {
            
            name = "";
            p_name = "";
            title_count = 0;

            if(json_data[iii].title_1){
                p_name +=  `<div class="rank-title rank-title_1" style="width: 75px;">${json_data[iii].title_1}</div>`;
                title_count++;
            }
            if(json_data[iii].title_2){
                p_name +=  `<div class="rank-title rank-title_2" style="width: 75px; margin-right: -65px;">${json_data[iii].title_2}</div>`;
                title_count++;
            }
            if(json_data[iii].title_3){
                p_name +=  `<div class="rank-title rank-title_3" style="width: 75px; margin-right: -65px;">${json_data[iii].title_3}</div>`;
                title_count++;
            }
            if(json_data[iii].title_4){
                p_name +=  `<div class="rank-title rank-title_4" style="width: 75px; margin-right: -65px;">${json_data[iii].title_4}</div>`;
                title_count++;
            }
            if(json_data[iii].title_5){
                p_name +=  `<div class="rank-title rank-title_5" style="width: 75px; margin-right: -65px;">${json_data[iii].title_5}</div>`;
                title_count++;
            }
            if(json_data[iii].title_6){
                p_name +=  `<div class="rank-title rank-title_6" style="width: 75px; margin-right: -65px;">${json_data[iii].title_6}</div>`;
                title_count++;
            }
                
            if(title_count === 0){
                name = json_data[iii].name;
            }else{
                name = `<div class="name">${json_data[iii].name}</div>`;
            }

            _return += `<div class="tr" rank="${offset + Number(iii) + 1}">
                            <div class="td_1" style="width: 14.5%">${getArabicNumbers(offset +  Number(iii) + 1)}</div>
                            <div class="td_1" style="width: 14.5%">${name + p_name}</div>
                            <div class="td_1" style="width: 14.5%"> ${json_data[iii].guild || "-----"}</div>
                            <div class="td_1" style="width: 14.5%">${Elkaisar.BaseData.Promotion[json_data[iii].porm].Title}</div>
                            <div class="td_1" style="width: 14.5%">${getArabicNumbers(json_data[iii].honor)}</div>
                            <div class="td_1" style="width: 14.5%">${getArabicNumbers(json_data[iii].prestige)}</div>
                            <div class="td_7" style="width: 13%"  >
                                <button class="full-btn full-btn-1x show-player-profile ellipsis" data-id-player="${json_data[iii].id_player}">${Translate.Button.MenuList.View[UserLag.language]}</buton>
                            </div>
                        </div>`;

        }

        $(".for_Ranks .left-content").html(_return);
        $("#current_page_num").html(getArabicNumbers(Math.ceil(offset / 10) + 1));

    } else {
        _return = false;
    }
    return _return;
};
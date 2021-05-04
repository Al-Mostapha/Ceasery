Elkaisar['ArenaChallange'] = {
    'DialogBox': function () {},
    'Arena': {}
};

Elkaisar.ArenaChallange.Coords = {
    'xCoord': 233,
    'yCoord': 246
};


Elkaisar['ArenaChallange']['getArenaData'] = function (callBack) {
    return $['ajax']({
        'url': API_URL + '/api/AArenaChallange/getArenaData',
        'data': {
            'server': Elkaisar['Config']['idServer'],
            'token': Elkaisar['Config']['OuthToken']
        },
        'beforeSend': function (_0x202459) {},
        'success': function (data, _0x4ce0b4, _0x58fd94) {
            if (!Elkaisar['LBase']['isJson'](data))
                return Elkaisar['LBase']['Error'](data);
            Elkaisar['ArenaChallange']['Arena'] = JSON['parse'](data);
            Elkaisar['ArenaChallange']['getFightList']()['done'](function () {
                if (callBack)
                    callBack();
            });
        }
    });
};



Elkaisar['ArenaChallange']['getFightList'] = function () {
    return $['ajax']({
        'url': API_URL + '/api/AArenaChallange/getFightList',
        'data': {
            'server': Elkaisar['Config']['idServer'],
            'token': Elkaisar['Config']['OuthToken']
        },
        'beforeSend': function (_0x4b6272) {},
        'success': function (data, _0x2cd76c, _0x561f87) {
            if (!Elkaisar['LBase']['isJson'](data))
                return Elkaisar['LBase']['Error'](data);
            Elkaisar['ArenaChallange']['Arena']['PlayerList'] = JSON['parse'](data)['reverse']();
        }
    });
};



Elkaisar['ArenaChallange']['DialogBox'] = function () {
    return `  <div id="dialg_box" class="fullBoxContent" style="top: 125px;">
                        <div class="head_bar">
                            <img src="images/style/head_bar.png">
                            <div class="title">الميدان</div>
                        </div>
                        <div class="nav_bar">
                            <div class="left-nav">
                                <ul> 
                                    <li class="selected" id="SArenaTroops">
                                        القوات
                                    </li> 
                                    <li class="" id="SArenaField">
                                        الميدان
                                    </li>
                                    <li class="" id="SArenaRanking">
                                        التصنيف
                                    </li>
                                </ul>
                            </div>
                            <div class="right-nav">
                                <div class="nav_icon">
                                    <img class="close_dialog" src="images/btns/close_b.png">
                                </div>
                            </div>
                        </div>
                        <div class="box_content arenaChallange">
                            <div id="ArenaChallangeHome" class="fullBoxContent flex"></div>
                        </div>
                    </div>`;
};


Elkaisar['ArenaChallange']['ArenaProfile'] = function () {

    var Box = `<div id="ArenaChallangeHome" class="fullBoxContent flex">
                        <div id="heroArenaSelectList">
                            <div class="prize-row">
                                <div style="font-size: 16px;line-height: 40px;direction: rtl;margin-right: 15px;">قائمة الابطال:</div>
                                <div id="selectHeroCity"></div>
                            </div>
                            <div class="RankList heroCityList hero-select-list"><ol class="ol"></ol></div>
                        </div>
                        <div class="heroControlBtns flex">
                            <div class="border"></div>
                            <div class="content">
                                <div class="heroAdding btnBlock">
                                    <button class="full-btn-2x" id="cpGoRight" disabled="disabled">
                                        <label class="cb goRight"></label>
                                    </button>
                                    <button class="full-btn-2x" id="cpGoLeft" disabled="disabled">
                                        <label class="cb goLeft"></label>
                                    </button>
                                </div>
                                <div class="heroOrder btnBlock">
                                    <button class="full-btn-2x" id="cpGoUp" disabled="disabled">
                                        <label class="cb goUp"></label>
                                    </button>
                                    <button class="full-btn-2x" id="cpGoDown" disabled="disabled">
                                        <label class="cb goDown"></label>
                                    </button>
                                </div>
                                <div class="heroConfirm btnBlock">
                                    <button id="refreshArenaHero" class="full-btn-2x">
                                        <label class="cb" style="background-image: url(images/icons/war-icon/enter-city.png)"></label>
                                    </button>
                                    <button id="saveArenaHero" class="full-btn-2x" disabled="disabled">
                                        <label class="cb" style="background-image: url(images/btns/done.png)"></label>
                                    </button>
                                </div>
                            </div>
                            <div class="border"></div>
                        </div>
                        <div id="arenaHeroList" class="arenaHeroList">
                            <div class="prize-row">
                                <div class="banner-red">قائمة الميدان</div>
                            </div>
                            <div class="hero-select-list" class="RankList"><ol></ol></div>
                        </div>
                        <div class="arenaChallangeReview flex">
                            <div class="border"></div>
                            <div class="content">
                                <div class="title">
                                    <h1 class="banner-red">الميدان</h1>
                                </div>
                                <div class="playerProfile flex">
                                    <div class="playerProfileImage">
                                        <div class="avatar">
                                            <div class="avatar-img">
                                                <img ondragstart="return false;" src="${ Elkaisar['BaseData']['HeroAvatar'][Elkaisar['DPlayer']['Player']['avatar']] }">
                                            </div>
                                        </div>
                                        <div class="avatar-name">
                                            <h2>${ Elkaisar['DPlayer']['Player']['name'] }</h2>
                                        </div>
                                    </div>
                                    <div class="arenaChallangeProfile">
                                        <ul>
                                            <li>مستوى الميدان: ${ Elkaisar['ArenaChallange']['Arena']['Arena']['lvl'] }</li>
                                            <li>
                                                <button id="useArenaExpBox" class="pluse"></button>
                                               خبرة: ${ Elkaisar['ArenaChallange']['Arena']['Arena']['exp'] }
                                            </li>
                                            <li>فوز: ${ Elkaisar['ArenaChallange']['Arena']['Arena']['win'] }</li>
                                            <li>خسارة: ${ Elkaisar['ArenaChallange']['Arena']['Arena']['lose'] }</li>
                                            <li>يطل: ${ Elkaisar['ArenaChallange']['Arena']['Arena']['champion'] }</li>
                                            <li>تصنيف(الجولة): ${ Elkaisar['ArenaChallange']['Arena']['Arena']['rank'] }</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="th">
                                    جوائز &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; الملك
                                </div>
                                <div class="arenaKingPrize">
                                    <div class="bg prizeList"><ul>${ Elkaisar['ArenaChallange']['PrizeList'](WorldUnit['prize']['PrizFor']['Sp']) }</ul></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    $('#ArenaChallangeHome')['replaceWith'](Box);
    Elkaisar['ArenaChallange']['HeroList']();
    Elkaisar['ArenaChallange']['ArenaHeroList']();
    var CityList = [];
    for (var idCity in Elkaisar['DPlayer']['City'])
        CityList['push']({
            'title': Elkaisar['DPlayer']['City'][idCity]["City"]['name'],
            'value': Elkaisar['DPlayer']['City'][idCity]["City"]['id_city']
        });
    $('#selectHeroCity')['html'](Elkaisar['Ui']['Select']['make'](CityList));
    Elkaisar['Ui']['Select']['height'] = 150;
    $('#heroArenaSelectList .heroCityList ol')['niceScroll'](SCROLL_BAR_PROP);
};


Elkaisar['ArenaChallange']['HeroList'] = function (idCity) {
    if (!idCity)
        idCity = Object['keys'](Elkaisar['DPlayer']['City'])[0];

    var HeroListHt = '';
    var Count = 0;

    for (var Index in Elkaisar['DPlayer']['Heros']) {
        var HStateImg = 'images/icons/h_s_incity.png';
        if (Elkaisar['DPlayer']['Heros'][Index]['Hero']['id_city'] != idCity)
            continue;
        if (Number(Elkaisar['DPlayer']['Heros'][Index]['Hero']['in_city']) == Elkaisar['Hero']['HeroState']['HERO_IN_BATTEL'])
            HStateImg = 'images/icons/h_s_attack_2.png';
        else if (Elkaisar['DPlayer']['Heros'][Index]['Hero']['in_city'] == Elkaisar['Hero']['HeroState']['HERO_IN_GARISON']) {
            HStateImg = 'images/icons/h_s_support.png';
        }
        if (Elkaisar['Hero']['isConsole'](Elkaisar['DPlayer']['Heros'][Index]['Hero']['id_hero']))
            HStateImg = 'images/icons/h_s_console.png';

        HeroListHt += `
                    <li class="tr" data-id-hero="${ Elkaisar['DPlayer']['Heros'][Index]['Hero']['id_hero'] }">
                        <div class="td" style="width: 25%">
                            <div class="wrapper">
                                <div class="image" style="background-image: url(${ Elkaisar['BaseData']['HeroAvatar'][Elkaisar['DPlayer']['Heros'][Index]['Hero']['avatar']] })">

                                </div>
                            </div>
                        </div>
                        <div class="td" style="width: 35%">
                            <div class="name${ (Elkaisar['DPlayer']['Heros'][Index]['Hero']['ultra_p'] > 0x0 ? ' POT-HERO' : '') }" style="width: 100%">${ Elkaisar['DPlayer']['Heros'][Index]['Hero']['name'] }</div>
                        </div>
                        <div class="td flex" style="width: 16%">
                            <button class="full-btn-3x showCityHero flex" data-id-hero="${ Elkaisar['DPlayer']['Heros'][Index]['Hero']['id_hero'] }"><img src="images/icons/showIcon.png"/></button>
                        </div>
                        <div class="td" style="width: 20%">
                            <div class="lvl">${ Elkaisar['DPlayer']['Heros'][Index]['Hero']['lvl'] }</div>
                        </div>
                        <div class="td" style="width: 15%">
                            <div class="heroState" style="background-image: url(${ HStateImg })"></div>
                        </div>
                    </li>`;
        Count++;
    }

    if (Count < 11) {
        for (var iii = 0x0; iii < 11 - Count; iii++)
            HeroListHt += '<li class="tr"></li>';
    }
    $('#heroArenaSelectList .heroCityList ol')['html']('' + HeroListHt);
};


Elkaisar['ArenaChallange']['ArenaHeroList'] = function () {
    var HeroListHtm = '';
    var Count = 0;
    for (var HIndex in Elkaisar['ArenaChallange']['Arena']['HeroList']) {
        var Hero = Elkaisar['Hero']['getHero'](Elkaisar['ArenaChallange']['Arena']['HeroList'][HIndex]['id_hero']);
        HeroListHtm += `<li class="tr" data-id-hero="${ Elkaisar['ArenaChallange']['Arena']['HeroList'][HIndex]['id_hero'] }" data-index="${ HIndex }">
                        <div class="td" style="width: 25%">
                            <div class="wrapper">
                                <div class="image" style="background-image: url(${ Elkaisar['BaseData']['HeroAvatar'][Hero['Hero']['avatar']] })">

                                </div>
                            </div>
                        </div>
                        <div class="td" style="width: 40%">
                            <div class="name${ (Hero['Hero']['ultra_p'] > 0 ? ' POT-HERO' : '') }" style="width: 100%">${ Hero['Hero']['name'] }</div>
                        </div>
                        <div class="td flex" style="width: 16%">
                            <button class="full-btn-3x showCityHero flex" data-id-hero="${ Elkaisar['ArenaChallange']['Arena']['HeroList'][HIndex]['id_hero'] }"><img src="images/icons/showIcon.png"/></button>
                        </div>
                        <div class="td" style="width: 20%">
                            <div class="lvl">${ Hero['Hero']['lvl'] }</div>
                        </div>
                    </li>`;
        Count++;
    }
    if (Count < 11) {
        for (var iii = 0x0; iii < 11 - Count; iii++)
            HeroListHtm += '<li class="tr"></li>';
    }
    $('#ArenaChallangeHome .arenaHeroList .hero-select-list ol')['html']('' + HeroListHtm);
};

Elkaisar['ArenaChallange']['PrizeList'] = function (PrizeFor) {
    var Prize = WorldUnit['prize']['getUnitAllLvlsPrize'](WUT_CHALLAGE_FIELD_PLAYER, PrizeFor);

    var PrizeListHt = '';
    for (var ii in Prize)
        PrizeListHt += `<li>
                        <div class="golden-border">
                            <div class="unit-image" style="background-image: url(${Matrial['image'](Prize[ii]['prize'])})">
                                <div class="amount stroke">(${Prize[ii]['amount_min'] == Prize[ii]['amount_max'] ? Prize[ii]['amount_max'] : `${Prize[ii]['amount_min']}-${Prize[ii]['amount_max']}`})X</div>
                            </div>
                        </div>
                    </li>`;
    return PrizeListHt;
};

Elkaisar['ArenaChallange']['getRankList'] = function () {
    var RankListHt = '';
    for (var iii = 0x0; iii < 0xa; iii++) {
        var Player = Elkaisar['ArenaChallange']['Arena']['PlayerList'][iii];
        if (Player)
            RankListHt += `<div class="tr" rank="1">
                                <div class="td ellipsis" style="width: 11%">${ Player['rank'] }</div>
                                <div class="td ellipsis" style="width: 20%">${ Player['PlayerName'] }</div>
                                <div class="td flex ellipsis" style="width: 25%">
                                    <div class="guildIcon">
                                        ${ (Player['idGuild'] ? `<div class="image-slog" style="background-image: url(images/style/bottom-${ Player['slog_btm'] }.png)"></div>
                                            <div class="image-slog" style="background-image: url(images/style/central-${ Player['slog_cnt'] }.png); margin-top: -100%" ></div>
                                            <div class="image-slog" style="background-image: url(images/style/top-${ Player['slog_top'] }.png);  margin-top: -100%"></div>` : '') }
                                        
                                    </div>
                                    <h1 class="guildName">${ (Player['idGuild'] ? Player['GuildName'] : '---') }</h1>
                                </div>
                                <div class="td ellipsis" style="width: 20%">${ Elkaisar['BaseData']['Promotion'][Player['porm']]['Title'] }</div>
                                <div class="td ellipsis" style="width: 11%">${ Player['arenaLvl'] }</div>
                                <div class="td ellipsis" style="width: 13%">
                                    <button class="full-btn-3x ellipsis startFightPlayer" data-id-player="${ Player['idPlayer'] }" >اختر</button>
                                </div>
                            </div>`;
        else
            RankListHt += `<div class="tr" rank="1"></div>`;
    }
    $('#arenaChallangeFightList')['html'](`<div class="th">
                                            <div class="td_1 ellipsis" style="width: 11%">تصنيف</div>
                                            <div class="td_2 ellipsis" style="width: 20%">الملك</div>
                                            <div class="td_3 ellipsis" style="width: 25%">الحلف</div>
                                            <div class="td_4 ellipsis" style="width: 20%">الرتبة</div>
                                            <div class="td_4 ellipsis" style="width: 11%">مستوى</div>
                                            <div class="td_7 ellipsis" style="width: 13%">اختر</div>
                                        </div> 
                                    ${RankListHt}`);
};

Elkaisar['ArenaChallange']['ArenaField'] = function () {
    var FileldList = `<div id="ArenaChallangeHome" class="fullBoxContent flex">
                    <div class="col-i">
                        <div id="arenaChallangeFightList" class="RankList"></div>
                    </div>
                    <div class="col-ii">
                        <div class="row-i solidBg flex">
                            <div class="arenaChallangePrief">
                                <div>
                                    <div class="li">
                                        <label class="lable">وقت الانتهاء: </label>
                                        <label class="time_counter value green" time-start="${ Math['floor'](Date['now']() / 0x3e8) }" time-end="${ (Math['floor'](new Date(TimeRest['restEvery12']())['getTime']() / 0x3e8) - 0x3c) }">${ changeTimeFormat(Math['floor'](new Date(TimeRest['restEvery12']())['getTime']() / 0x3e8) - 0x3c - Math['floor'](Date['now']() / 0x3e8)) }</label>
                                    </div>
                                    <div class="li flex">
                                        <div class="lable">وقت الانتظار: </div>
                                        ${ Date['now']() / 1000 - Elkaisar['ArenaChallange']['Arena']['Arena']['lastAttackTime'] < 0xa * 0x3c ?
            `<div class="time_counter value red" time-start="${ Math['floor'](Date['now']() / 0x3e8) }" 
                                            time-end="${ (Math['floor'](Date['now']() / 1000) + (Elkaisar['ArenaChallange']['Arena']['Arena']['lastAttackTime'] + 60 * 10 - Date['now']() / 1000)) }">
                                            ${ changeTimeFormat(Math['floor'](Date['now']() / 1000) + (Elkaisar['ArenaChallange']['Arena']['Arena']['lastAttackTime'] + 60 * 10 - Date['now']() / 1000) - Math['floor'](Date['now']() / 0x3e8)) }
                                        </div>
                                        <div>
                                            <button id="SpeedUpArenaAtt" class="smallAcce" style="width: 20px; height: 20px; vertical-align: top; margin-right: 10px;"></button></div>` : '' }
                                        
                                    </div>
                                    <div class="li">
                                        <label class="lable"> عدد الجولات: </label>
                                        <label class="value"> ${ Elkaisar['ArenaChallange']['Arena']['Arena']['attempt'] }/10</label>
                                        <label><button id="useAttemptBox" class="pluse"></button></label>
                                    </div>
                                    <div class="li flex">
                                        <label class="lable"> شراء جولات: </label>
                                        <div id="buyArenaChallangeAtt" class="value flex"> 
                                            <button class="full-btn-3x buyBtn" data-amount="10">+ 10</button>
                                            <button class="full-btn-3x buyBtn" data-amount="25">+ 25</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-ii flex">
                            <div class="prizeListWrapper">
                                <h1 class="header-2 banner-red">جوائز الفوز</h1>
                                <ul> ${ Elkaisar['ArenaChallange']['PrizeList'](WorldUnit['prize']['PrizFor']['Win']) }</ul>
                            </div>
                            <div class="prizeListWrapper">
                                <h1 class="header-2 banner-red">جوائز الخسارة</h1>
                                <ul> ${ Elkaisar['ArenaChallange']['PrizeList'](WorldUnit['prize']['PrizFor']['Lose']) }</ul>
                            </div>
                        </div>
                    </div>
                </div>`;
    $('#ArenaChallangeHome')['replaceWith'](FileldList);
    Elkaisar['ArenaChallange']['getRankList']();
};


Elkaisar['ArenaChallange']['ArenaRankingList'] = function (offset, OrderBy = 0) {
    return $['ajax']({
        'url': API_URL + '/api/AArenaChallange/getRankList',
        'data': {
            'server': Elkaisar['Config']['idServer'],
            'token': Elkaisar['Config']['OuthToken'],
            'offset': offset,
            'orderBy': OrderBy
        },
        'beforeSend': function (_0x16cf12) {},
        'success': function (data, _0x51715d, _0x54c172) {
            if (!Elkaisar['LBase']['isJson'](data))
                return Elkaisar['LBase']['Error'](data);

            var JsonData = JSON['parse'](data);
            var RankList = '';

            for (var ii = 0; ii < 10; ii++) {
                if (JsonData[ii]) {
                    RankList += `<div class="tr" rank="1">
                                    <div class="td ellipsis" style="width: 10%">${ (offset + ii + 0x1) }</div>
                                    <div class="td ellipsis" style="width: 20%">${ JsonData[ii]['PlayerName'] }</div>
                                    <div class="td flex ellipsis" style="width: 20%">
                                        <div class="cont">
                                            <div class="guildIcon">
                                            ${ (JsonData[ii]['idGuild'] ? `<div class="image-slog" style="background-image: url(images/style/bottom-${ JsonData[ii]['slog_btm'] }.png)"></div>
                                                    <div class="image-slog" style="background-image: url(images/style/central-${ JsonData[ii]['slog_cnt'] }.png); margin-top: -100%" ></div>
                                                    <div class="image-slog" style="background-image: url(images/style/top-${ JsonData[ii]['slog_top'] }.png);  margin-top: -100%"></div>` : '') }

                                            </div>
                                            <h1 class="guildName">${ (JsonData[ii]['idGuild'] ? JsonData[ii]['GuildName'] : '---') }</h1>
                                        </div>
                                    </div>
                                    <div class="td ellipsis" style="width: 10%">${ Elkaisar['BaseData']['Promotion'][JsonData[ii]['porm']]['Title'] }</div>
                                    <div class="td ellipsis" style="width: 10%">${ JsonData[ii]['lvl'] }</div>
                                    <div class="td ellipsis" style="width: 10%">${ JsonData[ii]['exp'] }</div>
                                    <div class="td ellipsis" style="width: 10%">${ JsonData[ii]['lose'] }/${ JsonData[ii]['win'] }</div>
                                    <div class="td ellipsis" style="width: 10%">${ JsonData[ii]['champion'] }</div>
                                </div>`;
                } else {
                    RankList += '<div class="tr" rank="1"></div>';

                }
            }
            $('#ArenaChallangeRankList')['html'](`<div class="th">
                                                    <div class="td ellipsis" style="width: 10%">تصنيف</div>
                                                    <div class="td ellipsis" style="width: 20%">الملك</div>
                                                    <div class="td ellipsis" style="width: 20%">الحلف</div>
                                                    <div class="td ellipsis" style="width: 10%">الرتبة</div>
                                                    <div class="td ellipsis" style="width: 10%">مستوى</div>
                                                    <div class="td ellipsis" style="width: 10%">خبرة</div>
                                                    <div class="td ellipsis" style="width: 10%">فوز/خسارة</div>
                                                    <div class="td ellipsis" style="width: 10%">بطل</div>
                                                </div>
                                            ${RankList} `);
            $('#ArenaChallangeRankCPage')['attr']('data-offset', offset);
            $('#ArenaChallangeRankCPage')['html'](Math['floor'](offset / 10) + 1);
        }
    });
};



Elkaisar['ArenaChallange']['ArenaRanking'] = function () {
    var Box = `
                    <div id="ArenaChallangeHome" class="fullBoxContent">
                        <div id ="ArenaChallangeRankList" class="RankList">
                            <div class="th">
                                <div class="td ellipsis" style="width: 10%">تصنيف</div>
                                <div class="td ellipsis" style="width: 20%">الملك</div>
                                <div class="td ellipsis" style="width: 20%">الحلف</div>
                                <div class="td ellipsis" style="width: 10%">الرتبة</div>
                                <div class="td ellipsis" style="width: 10%">مستوى</div>
                                <div class="td ellipsis" style="width: 10%">خبرة</div>
                                <div class="td ellipsis" style="width: 10%">فوز/خسارة</div>
                                <div class="td ellipsis" style="width: 10%">بطل</div>
                            </div>
                            <div class="tr" rank="1"></div>
                            <div class="tr" rank="1"></div>
                            <div class="tr" rank="1"></div>
                            <div class="tr" rank="1"></div>
                            <div class="tr" rank="1"></div>
                            <div class="tr" rank="1"></div>
                            <div class="tr" rank="1"></div>
                            <div class="tr" rank="1"></div>
                            <div class="tr" rank="1"></div>
                            <div class="tr" rank="1"></div>
                        </div>
                        <div class="right-content-footer">  
                            <div class="buttons">  
                                <ul class="flex">  
                                    <li id="show-my-rank">  
                                        <button class="full-btn full-btn-2x full">اعرض تصنيفي</button>  
                                    </li> 
                                    <li>
                                        <div id="ArenaChallangeRankNav" class="nav_icon flex">
                                            <div class="most-left-btn"></div>
                                            <div class="left-btn"></div>
                                            <h1>  <span id="ArenaChallangeRankCPage" data-offset="0">1</span>/${ Math['ceil'](Elkaisar['ServerData']['player_num'] / 10) }</h1>
                                            <div  class="right-btn"></div>
                                            <div  class="most-right-btn"></div>    
                                        </div>
                                    </li>

                                    <li id="nav_input" class="flex">  
                                        <input type="text" class="only_num input">
                                        <button class="full-btn full-btn-1x ellipsis">  
                                            اذهب الى    
                                        </button>
                                    </li>

                                    <li id="search_select" style=" float: left; width: 85px;">  
                                        <select>
                                            <option value="name" selected="">الاسم</option>
                                        </select>
                                    </li>
                                    <li id="nav_search" class="flex">  
                                        <input type="text" class="input">
                                        <button class="full-btn full-btn-1x ellipsis">  
                                            بحث
                                        </button>
                                    </li>
                                </ul>  
                            </div>  
                        </div>
                    </div>`;
    $('#ArenaChallangeHome')['replaceWith'](Box);
    Elkaisar['ArenaChallange']['ArenaRankingList'](0);
};

$(document)['on']('click', '#ArenaChallangeBtnWrapper button', function () {
    dialogBoxShow(Elkaisar['ArenaChallange']['DialogBox'](), function () {
        Elkaisar['ArenaChallange']['ArenaProfile']();
    });
});

$(document)['on']('click', '#SArenaTroops', function () {
    Elkaisar['ArenaChallange']['ArenaProfile']();
    Elkaisar['ArenaChallange']['getArenaData']()['done'](function () {
        Elkaisar['ArenaChallange']['ArenaProfile']();
    });
});

$(document)['on']('click', '#SArenaField', function () {
    Elkaisar['ArenaChallange']['ArenaField']();
    Elkaisar['ArenaChallange']['getFightList']()['done'](function () {
        Elkaisar['ArenaChallange']['ArenaField']();
    });
});

$(document)['on']('click', '#SArenaRanking', function () {
    Elkaisar['ArenaChallange']['ArenaRanking']();
});

$(document)['on']('click', '#selectHeroCity .unit-option', function () {
    var idCity = $(this)['attr']('data-value');
    Elkaisar['ArenaChallange']['HeroList'](idCity);
});


$(document)['on']('click', '#heroArenaSelectList .heroCityList .tr', function () {
    if (!$('#refreshArenaHero')['is'](':disabled'))
        return alert_box['failMessage']('عليك تفعيل زر التعديل اولا');
    var idHero = $(this)['attr']('data-id-hero');
    if (!idHero)
        return;
    $('#heroArenaSelectList .heroCityList .selected')['removeClass']('selected');
    $(this)['addClass']('selected');
    $('#cpGoRight')['removeAttr']('disabled');
    $('#cpGoLeft')['attr']('disabled', 'disabled');
    $('#cpGoUp')['attr']('disabled', 'disabled');
    $('#cpGoDown')['attr']('disabled', 'disabled');

    $('#ArenaChallangeHome .arenaHeroList .hero-select-list .tr')['each'](function () {
        var idHeroI = $(this)['attr']('data-id-hero');
        if (!idHeroI)
            return;
        if (idHeroI == idHero) {
            $('#ArenaChallangeHome .arenaHeroList .hero-select-list .selected')['removeClass']('selected');
            $(this)['addClass']('selected');
            $('#cpGoLeft')['removeAttr']('disabled');
            $('#cpGoUp')['removeAttr']('disabled');
            $('#cpGoDown')['removeAttr']('disabled');
            $('#cpGoRight')['attr']('disabled', 'disabled');
        }
    });
});


$(document)['on']('click', '#ArenaChallangeHome .arenaHeroList .hero-select-list .tr', function () {
    if (!$('#refreshArenaHero')['is'](':disabled'))
        return alert_box['failMessage']('عليك تفعيل زر التعديل اولا');
    var idHero = $(this)['attr']('data-id-hero');
    if (!idHero)
        return;
    $('#ArenaChallangeHome .arenaHeroList .hero-select-list .selected')['removeClass']('selected');
    $(this)['addClass']('selected');
    $('#cpGoUp')['removeAttr']('disabled');
    $('#cpGoDown')['removeAttr']('disabled');
    $('#cpGoLeft')['removeAttr']('disabled');
    $('#cpGoRight')['attr']('disabled', 'disabled');

    var Hero = Elkaisar['Hero']['getHero'](idHero);
    Elkaisar['ArenaChallange']['HeroList'](Hero['Hero']['id_city']);

    $('#heroArenaSelectList .heroCityList .tr')['each'](function () {
        var idHeroI = $(this)['attr']('data-id-hero');
        if (!idHeroI)
            return;
        if (idHeroI == idHero) {
            $('#heroArenaSelectList .heroCityList .selected')['removeClass']('selected');
            $(this)['addClass']('selected');
            $('#cpGoLeft')['removeAttr']('disabled');
            $('#cpGoUp')['removeAttr']('disabled');
            $('#cpGoDown')['removeAttr']('disabled');
            $('#cpGoRight')['attr']('disabled', 'disabled');
        }
    });
});


$(document)['on']('click', '#cpGoRight', function () {

    var idHero = $('#heroArenaSelectList .heroCityList .selected')['attr']('data-id-hero');
    if (!idHero)
        return;
    if (Elkaisar['ArenaChallange']['Arena']['HeroList']['length'] >= Elkaisar['ArenaChallange']['Arena']['Arena']['lvl'])
        return alert_box['failMessage']('وصل الميدان للحد الاقصى من الابطال');

    Elkaisar['ArenaChallange']['Arena']['HeroList']['push']({
        'id_hero': idHero
    });
    Elkaisar['ArenaChallange']['ArenaHeroList']();
});


$(document)['on']('click', '#cpGoLeft', function () {
    var idHero = $('#ArenaChallangeHome .arenaHeroList .hero-select-list .selected')['attr']('data-id-hero');
    if (!idHero)
        return;
    Elkaisar['ArenaChallange']['Arena']['HeroList']['forEach'](function (Hero, Index) {
        if (Hero['id_hero'] == idHero)
            Elkaisar['ArenaChallange']['Arena']['HeroList']['splice'](Index, 1);
    }), Elkaisar['ArenaChallange']['ArenaHeroList']();
});



$(document)['on']('click', '#cpGoUp', function () {
    var idHero = $('#ArenaChallangeHome .arenaHeroList .hero-select-list .selected')['attr']('data-id-hero');
    var Index = Number($('#ArenaChallangeHome .arenaHeroList .hero-select-list .selected')['attr']('data-index'));
    if (!idHero)
        return;
    if (!Index || Index <= 0x0)
        return;
    [Elkaisar['ArenaChallange']['Arena']['HeroList'][Index - 0x1], Elkaisar['ArenaChallange']['Arena']['HeroList'][Index]]
            =
            [Elkaisar['ArenaChallange']['Arena']['HeroList'][Index], Elkaisar['ArenaChallange']['Arena']['HeroList'][Index - 0x1]];

    Elkaisar['ArenaChallange']['ArenaHeroList']();
    $('#ArenaChallangeHome .arenaHeroList .hero-select-list .tr')['each'](function () {
        var idHeroI = $(this)['attr']('data-id-hero');
        if (!idHeroI)
            return;
        if (idHeroI == idHero)
            $(this)['trigger']('click');
    });
});


$(document)['on']('click', '#cpGoDown', function () {
    var idHero = $('#ArenaChallangeHome .arenaHeroList .hero-select-list .selected')['attr']('data-id-hero');
    var Index = Number($('#ArenaChallangeHome .arenaHeroList .hero-select-list .selected')['attr']('data-index'));
    if (!idHero)
        return;
    if (Index + 0x1 >= Elkaisar['ArenaChallange']['Arena']['HeroList']['length'])
        return;
    [Elkaisar['ArenaChallange']['Arena']['HeroList'][Index], Elkaisar['ArenaChallange']['Arena']['HeroList'][Index + 1]]
            =
            [Elkaisar['ArenaChallange']['Arena']['HeroList'][Index + 1], Elkaisar['ArenaChallange']['Arena']['HeroList'][Index]];
    Elkaisar['ArenaChallange']['ArenaHeroList']();

    $('#ArenaChallangeHome .arenaHeroList .hero-select-list .tr')['each'](function () {
        var idHeroI = $(this)['attr']('data-id-hero');
        if (!idHeroI)
            return;
        if (idHeroI == idHero)
            $(this)['trigger']('click');
    });
});


$(document)['on']('click', '#refreshArenaHero', function () {
    alert_box['confirmDialog']('تاكيد تعديل ابطال الميدان', function () {
        $('#saveArenaHero')['removeAttr']('disabled');
        $('#refreshArenaHero')['attr']('disabled', 'disabled');
    });
});


$(document)['on']('click', '#saveArenaHero', function () {
    alert_box['confirmDialog']('تأكيد حفظ التعديلات على البطل', function () {
        var idHeros = [];
        for (var ii in Elkaisar['ArenaChallange']['Arena']['HeroList'])
            idHeros['push'](Elkaisar.ArenaChallange.Arena.HeroList[ii]['id_hero']);
        $['ajax']({
            'url': API_URL + '/api/AArenaChallange/saveHeroList',
            'data': {
                'server': Elkaisar['Config']['idServer'],
                'token': Elkaisar['Config']['OuthToken'],
                'HeroList': idHeros['join']('-')
            },
            'type': 'POST',
            'beforeSend': function (_0x5880cf) {},
            'success': function (data, _0x5bc68d, _0x31f760) {
                if (!Elkaisar['LBase']['isJson'](data))
                    return Elkaisar['LBase']['Error'](data);
                var JsonData = JSON['parse'](data);
                if (JsonData['state'] == 'error_1')
                    alert_box['failMessage']('عدد الابطال اكبر من مستوى الميدان');

                Elkaisar['ArenaChallange']['getArenaData']()['done'](function () {
                    Elkaisar['ArenaChallange']['ArenaProfile']();
                });
            }
        });
    });
});


$(document)['on']('click', '.startFightPlayer', function () {
    var idPlayerToFight = $(this)['attr']('data-id-player');
    $['ajax']({
        'url': API_URL + '/api/AArenaChallange/fightSomeOne',
        'data': {
            'server': Elkaisar['Config']['idServer'],
            'token': Elkaisar['Config']['OuthToken'],
            'idPlayerToFight': idPlayerToFight
        },
        'type': 'POST',
        'beforeSend': function (_0x151a84) {},
        'success': function (data, _0x142eb5, _0x5a508d) {

            if (!Elkaisar['LBase']['isJson'](data))
                return Elkaisar['LBase']['Error'](data);

            var JsonData = JSON['parse'](data);

            if (JsonData['state'] == 'ok')
                Elkaisar['ArenaChallange']['getArenaData'](function () {
                    Elkaisar['ArenaChallange']['ArenaField']();
                });
            else if (JsonData['state'] == 'error_1') {
                alert_box['failMessage']('لا يمكنك قتال لاعب فى هذا المستوى');
            } else if (JsonData['state'] == 'error_2') {
                alert_box['failMessage']('لا يمكنك قتال لاعب فى هذا المستوى');
            } else if (JsonData['state'] == 'error_3') {
                alert_box['failMessage']('عدد الابطال غير كافى للقتال');
            } else if (JsonData['state'] == 'error_4') {
                alert_box['failMessage']('وقت الانتظار لم ينتهى');
            } else if (JsonData['state'] == 'error_5') {
                alert_box['failMessage']('لا يوجد محاولات كافية');
            }




        }
    });
});




$(document)['on']('click', '#ArenaChallangeRankNav .right-btn', function () {
    var offset = Number($('#ArenaChallangeRankCPage')['attr']('data-offset')) || 0x0;
    Elkaisar['ArenaChallange']['ArenaRankingList'](Math['min'](offset + 10, Elkaisar['ServerData']['player_num'] - Elkaisar['ServerData']['player_num'] % 10));
});

$(document)['on']('click', '#ArenaChallangeRankNav .left-btn', function () {
    var offset = Number($('#ArenaChallangeRankCPage')['attr']('data-offset')) || 0x0;
    Elkaisar['ArenaChallange']['ArenaRankingList'](Math['max'](offset - 0xa, 0));
});

$(document)['on']('click', '#ArenaChallangeRankNav .most-left-btn', function () {
    Elkaisar['ArenaChallange']['ArenaRankingList'](0);
});

$(document)['on']('click', '#ArenaChallangeRankNav .most-right-btn', function () {
    Elkaisar['ArenaChallange']['ArenaRankingList'](Elkaisar['ServerData']['player_num'] - Elkaisar['ServerData']['player_num'] % 10);
});

$(document)['on']('click', '#buyArenaChallangeAtt .buyBtn', function () {

    var amount = $(this)['attr']('data-amount');
    $['ajax']({
        'url': API_URL + '/api/AArenaChallange/buyBattelAttempt',
        'data': {
            'amount': amount,
            'server': Elkaisar['Config']['idServer'],
            'token': Elkaisar['Config']['OuthToken']
        },
        'type': 'POST',
        'success': function (data, _0x1cb305, _0x54b6b2) {

            if (!Elkaisar['LBase']['isJson'](data))
                return Elkaisar['LBase']['Error'](data);
            var JsonData = JSON['parse'](data);

            if (JsonData['state'] === 'ok') {

                Elkaisar['ArenaChallange']['Arena']['Arena'] = JsonData['Arena'];
                Elkaisar['ArenaChallange']['ArenaField']();
                Player_profile['getPlayerBaseData']();
                alert_box['succesMessage']('+' + amount + ' محاولة');

            } else if (JsonData['state'] == 'error_0') {
                alert_box['confirmMessage']('ليس لديك ذهب كافى');
            } else if (JsonData['state'] === 'error_1') {
                alert_box['confirmMessage']('لا يمكنك شراء محاولات اكتر من مرة');
            }
        }
    });

});


$(document)['on']('click', '#SpeedUpArenaAtt', function () {
    alert_box['confirmDialog']('تأكيد  تسريع انتظار الجولة مقابل 2 ذهبة', function () {
        $['ajax']({
            'url': API_URL + '/api/AArenaChallange/speedUpAtte',
            'data': {
                'token': Elkaisar['Config']['OuthToken'],
                'server': Elkaisar['Config']['idServer']
            },
            'success': function (data, _0x2b9276, _0x41a972) {
                if (!Elkaisar['LBase']['isJson'](data))
                    return Elkaisar['LBase']['Error'](data);
                var JsonData = JSON['parse'](data);
                if (JsonData['state'] === 'ok') {

                    Elkaisar['ArenaChallange']['Arena']['Arena'] = JsonData['Arena'];
                    Elkaisar['ArenaChallange']['ArenaField']();
                    Player_profile['getPlayerBaseData']();
                    alert_box['succesMessage']('تسريع المحاولة');

                }
            }
        });
    });
});

Elkaisar['ArenaChallange']['addExpByBox'] = function (idItem) {
    $['ajax']({
        'url': API_URL + '/api/AArenaChallange/addExpByBox',
        'data': {
            'server': Elkaisar['Config']['idServer'],
            'token': Elkaisar['Config']['OuthToken'],
            'Item': idItem
        },
        'type': 'POST',
        'success': function (data, _0x4a90e5, _0x47cebb) {

            if (!Elkaisar['LBase']['isJson'](data))
                return Elkaisar['LBase']['Error'](data);

            $('.close-alert')['click']();
            $('.close_select_menu')['click']();

            var JsonData = JSON['parse'](data);
            if (JsonData['state'] == 'ok') {
                alert_box['succesMessage']('خبرة +' + JsonData['Exp']);
                Elkaisar['ArenaChallange']['getArenaData']()['done'](function () {
                    Elkaisar['ArenaChallange']['ArenaProfile']();
                });
                Matrial['takeFrom'](idItem, 1);
            } else if (JsonData['state'] == 'error_0') {
                alert_box['failMessage']('لا توجد مواد كافية');
            }

        }
    });
};


Elkaisar['ArenaChallange']['addAttByBox'] = function (idItem) {
    $['ajax']({
        'url': API_URL + '/api/AArenaChallange/addAttByBox',
        'data': {
            'server': Elkaisar['Config']['idServer'],
            'token': Elkaisar['Config']['OuthToken'],
            'Item': idItem
        },
        'type': 'POST',
        'success': function (data, _0x326d67, _0x2f42d6) {

            if (!Elkaisar['LBase']['isJson'](data))
                return Elkaisar['LBase']['Error'](data);

            $('.close-alert')['click']();
            $('.close_select_menu')['click']();

            var JsonData = JSON['parse'](data);
            if (JsonData['state'] == 'ok') {
                alert_box['succesMessage']('محاولة +' + JsonData['Att']);
                Matrial['takeFrom'](idItem, 0x1);
                Elkaisar['ArenaChallange']['getArenaData'](function () {
                    Elkaisar['ArenaChallange']['ArenaField']();
                });
            } else if(JsonData['state'] == 'error_0'){
                alert_box['failMessage']('لا توجد مواد كافية');
            }
                
        }
    });
};


$(document)['on']('click', '#useArenaExpBox', function () {
    var Items = ['arena_exp_1', 'arena_exp_5', 'arena_exp_10', 'arena_exp_25'];
    BoxOfMatrialToUse(Items, 'addArenaExp');
});

$(document)['on']('click', '#useAttemptBox', function () {
    var Items = ['arena_attempt_1', 'arena_attempt_5', 'arena_attempt_10'];
    BoxOfMatrialToUse(Items, 'addArenaAtt');
});

$(document)['on']('click', '#heroArenaSelectList .showCityHero', function (e) {
    e['stopPropagation']();
    var idHero = $(this)['attr']('data-id-hero');
    Elkaisar['Hero']['showHeroDetail'](Elkaisar['Hero']['getHero'](idHero));
});


$(document)['on']('click', '#arenaHeroList .showCityHero', function (e) {
    e['stopPropagation']();
    var idHero = $(this)['attr']('data-id-hero');
    var Hero = Elkaisar['Hero']['getHero'](idHero);
    var HeroArmy = Hero['Army'];
    
    for (var Index in Elkaisar['ArenaChallange']['Arena']['HeroList']) {
        if (Elkaisar['ArenaChallange']['Arena']['HeroList'][Index]['id_hero'] == idHero)
            HeroArmy = Elkaisar['ArenaChallange']['Arena']['HeroList'][Index];
    }
    var HeroRev = {
        'Hero': Hero['Hero'],
        'Equip': Hero['Equip'],
        'Medal': Hero['Medal'],
        'Army': HeroArmy
    };
    Elkaisar['Hero']['showHeroDetail'](HeroRev);
});



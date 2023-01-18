Elkaisar.WsLib.Mail = {};


Elkaisar.WsLib.Mail.sentTo = function (data){
    PLAYER_NOTIF.msg_in = Number(PLAYER_NOTIF.msg_in) + 1;
    Fixed.refreshPlayerNotif();
};

Elkaisar.WsLib.Mail.someOneSpy = function (data){
    PLAYER_NOTIF.spy_report = Number(PLAYER_NOTIF.spy_report) +  1;
    Fixed.refreshPlayerNotif();
    city_profile.afterBattelFinish();
};
Elkaisar.WsLib.Guild = {};


Elkaisar.WsLib.Guild.joinReqAccepted = function (data){
    
    alert_box.systemChatMessage(` تم قبولك فى حلف ${data.guild_name} بواسطة ${data.accepter_name}`);
    Guild.getGuildData();
    Player_profile.refresh_player_data();
    
};



Elkaisar.WsLib.Guild.announceRelation = function (data){
    
    var relation_title = {
        ally:"محايدة",
        friend:"صداقة",
        enemy:"عداوة"

    };

    var msg = `تم تغير العلاقة بين حلف ${data.guild_one} وحلف ${data.guild_two} الى -${relation_title[data.relation]}- بواسطة  ${data.player_name}`;
    alert_box.systemChatMessage(msg);
    if(Number(data.id_guild_one) === Number(Elkaisar.DPlayer.Player.id_guild) || Number(data.id_guild_two) === Number(Elkaisar.DPlayer.Player.id_guild)){
        Guild.getGuildData();
    }
    
};

Elkaisar.WsLib.Guild.msgSent = function (data){
    
    PLAYER_NOTIF.msg_in = Number(PLAYER_NOTIF.msg_in) + 1;
    Fixed.refreshPlayerNotif();
    
};
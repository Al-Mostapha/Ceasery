



var ALL_SERVERS = [
    
    {
        title: "لايوجد"
    },
    {
        title: "الجبابرة s1"
    }
];



var last_offset = window.pageYOffset;

/*

var dropdown_btn = document.getElementById("forum-list").childNodes[1].children[0];

dropdown_btn.onclick = function (){
    
    
    if(document.getElementById("forum-list").children[1].style.height  === "" || document.getElementById("forum-list").children[1].style.height === "0px"){
        
        document.getElementById("forum-list").children[1].style.height = "190px";
        
    }else{
        document.getElementById("forum-list").children[1].style.height = "0px";
    }
    
    
};
*/


 
$(document).on("click" ,"#join-now" , function (){
    $("#over_lay").fadeIn();
});




$(document).on("keyup" ,"#signupEmail" , function (){
    if(!validateEmail(this.value) && this.value.length > 7){
       
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
});



$(document).on("keyup" ,"#signupUsername" , function (){
    
    if(!validateUsername(this.value) || this.value.length > 15 || this.value.length < 5){
        
        
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
    
    
});


$(document).on("blur" ,"#signupEmail" , function (){
    
    if(!validateEmail(this.value) && this.value.length > 7){
        
        this.style.border = "red solid 1px";
        this.style["box-shadow"] = "2px 0px 10px 0px red";
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
});


    

$(document).on("blur" ,"#signupUsername" , function (){
    
    if(!validateUsername(this.value) || this.value.length > 15 || this.value.length < 5){
        
        this.style.border = "red solid 1px";
        this.style["box-shadow"] = "2px 0px 10px 0px red";
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
    
    
});






$(document).on("keyup" ,"#signupPassword" , function (){
    
    if(this.value.length > 15 || this.value.length < 5){
        
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
    
    
});


$(document).on("blur" ,"#signupPassword" , function (){
    
    if(this.value.length > 15 || this.value.length < 5){
        
        this.style.border = "red solid 1px";
        this.style["box-shadow"] = "2px 0px 10px 0px red";
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
});



$(document).on("keyup" ,"#signupConfirmPassword" , function (){
    
    if(this.value !==  document.getElementById("signupPassword")){
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
    
    
});


$(document).on("blur" ,"#signupConfirmPassword" , function (){
    
    if(this.value !==  document.getElementById("signupPassword")){
        
        this.style.border = "red solid 1px";
        this.style["box-shadow"] = "2px 0px 10px 0px red";
        
    }else{
        this.style.border = "none";
        this.style["box-shadow"] = "";
    }
});






function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateUsername(username) {
    var usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    return usernameRegex.test(String(username));
}



$(document).on("click" , "#join-submit" , function (){
    
     var userName    = document.getElementById("signupUsername").value;
    var Email       = document.getElementById("signupEmail").value;
    var password    = document.getElementById("signupPassword").value;
    var confirmpass = document.getElementById("signupConfirmPassword").value;
    
    if(!validateUsername(userName)){
        alertBox.confirmDialog("خطأ اسم المستخدم يجب انا يحتوى على حروف وارقام" )
        
        
    }else if(userName.length < 5 || userName.length > 15){
        alertBox.confirmDialog("اقصى عدد لحروف اسم المستخدم هو 15 حرف واقل عدد هو 5");
       
        
    }else if(password.length < 5 || password.length > 15 ){
        alertBox.confirmDialog("اقصى عدد لحروف كلمة المرور هو 15 حرف واقل عدد هو 5");
        
    }else if(confirmpass !== password){
        
        alertBox.confirmDialog("كلمة المرور غير متطابقة");
        
    }else if(!validateEmail(Email)){
        alertBox.confirmDialog("الاميل غير صحيح");
        
    }else {
        
        
        $.ajax({
            
            url: "api/signup.php",
            data: {
                SIGN_USER_UP: true,
                username: userName,
                password: password,
                email: Email
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                if(data === "done"){
                    
                    $("#over_lay").fadeOut();
                    $("#username input").val(userName);
                    $("#password input").val(password);
                    $("#login-btn button").click();
                    $("#join-now").hide();
                    document.getElementById("signupUsername").value = "";
                    document.getElementById("signupPassword").value = "";
                    document.getElementById("signupEmail").value = "";
                    document.getElementById("signupConfirmPassword").value = "";

                    alertBox.confirmDialog("تم التسجيل بنجاح");
                    
                }else{
                    
                    alertBox.confirmDialog(data);
                    
                }
                
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
       
        
    }
    
});





    
function logout(){


    $.ajax({
        url: "api/logout.php",
        data: {
            logout:true
        },
        type: 'POST',
        beforeSend: function (xhr) {
            
        },
        success: function (data, textStatus, jqXHR) {
            
            $("#login-form").html(`
                                    <input id="username" type="text" name="" placeholder="البريد الالكتروني او اسم المستخدم">
                                    <input id="password" type="text" name="" placeholder="كلمة المرور">
                                    <button onclick="login()" class="login">تسجيل الدخول </button>
                                `);
             
            
            alertBox.confirmDialog("تم تسجيل خروجك");
            
        }
        ,error: function (jqXHR, textStatus, errorThrown) {
            
        }
    });
   

}
    




    
function login(){
    
    
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        
        $.ajax({
            
            url: "api/login.php",
            data: {
                LOG_USER_IN: true,
                user_name: username,
                password: password
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                if(!isJson(data)){
                    alert(data);
                    return ;
                }
                var json_data = JSON.parse(data);
                if(json_data !== false)
                {
                    
                    var form = `<div class="welcome-name">
                                        <label class="yellow-color">${json_data.user_name}</label>
                                        <label>مرحبا</label>

                                    </div>
                                    <div class="welcome-name">
                                        <label class="yellow-color">  مركز الاعضاء&nbsp;&nbsp;⇚   </label>
                                        <label>للدخول الى  </label>

                                    </div>
                                    <div class="welcome-name">
                                        <label class="yellow-color"><a href="${Number(json_data.last_server) === 1 ||  Number(json_data.last_server) === 2 ?  "http://web.elkaisar.com/" : ""}server.php?server=${json_data.last_server}&p=${json_data.id_user}&ot=${json_data.uot}" target="_blank">${json_data.server_name}</a></label>
                                        <label style="direction: rtl">اخر سيرفر قمت بالدخول علية :</label>

                                    </div>
                                    <div onclick="logout()" class="add-account" style="width: 85%">
                                        <h3>تسجيل الخروج</h3>
                                    </div> `;
                    $("#login-form").html(form);
                    $(".enter-server").each(function (){
                        
                        $(this).attr("href" ,  `http://web.elkaisar.com/server.php?server=${$(this).attr("data-id-server")}&p=${json_data.id_user}&ot=${json_data.uot}`)
                        $(this).attr("data-id-player" , json_data.id_user);
                        
                    });
                  
                } else {
                    
                    alertBox.confirmDialog("خطاء اسم المستخدم او كلمة المرور");
                    
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
            
        });
            
};
    


$(document).on("click" , "#close-signup" , function (){
    $('#over_lay').fadeOut();
});



alertBox = {
    
    confirmDialog: function (msg ,yesCallBack , obj){
        
        
        var contet = `<div id="over_lay_alert">  
                        <div id="alert_container">     
                            <div id="alert_head">       
                                <div>               
                                    <img src="images/panner/king_name.png">   
                                </div>     
                                <div id="alert-title">تاكيد            </div>  
                                <img src="images/btns/close_b.png" class="img-sml close-alert">     
                            </div> 
                            <div id="alert_box" class="for_battel">        
                                <div class="row-2">
                                    <div class="msg">${msg}</div>
                                </div>    
                                <div class="row-3">        
                                    <div class="confim-btn">            
                                        <button class="full-btn full-btn-3x pull-R enter" id="btn-confirm-yes">تاكيد</button>    
                                        <button class="full-btn full-btn-3x pull-L" id="btn-confirm-no">الغاء</button>  
                                    </div>    
                                </div>
                            </div>   
                        </div>
                    </div>`;
                $("body").append(contet);
                
                $("#btn-confirm-yes").click(function (){
                    $("#over_lay_alert").remove();

                });

                $("#btn-confirm-no , .close-alert ").click(function (){
                    $("#over_lay_alert").remove();
                });
                
        
    },
    
    close:function (){
        $('.close-alert').trigger('click');
    }
    
};


function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


$(document).on("click" , ".enter-server", function (){
   
    var idPlayer = Number($(this).attr("data-id-player"));
    var idServer = Number($(this).attr("data-id-server"));
    
    if(idPlayer > 0){
        
        $.ajax({
           url:"api/login.php",
           data:{
               SET_PLAYER_LAST_SERVER:true,
               id_player: idPlayer,
               id_server: idServer
           },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
    }else{
        
        alertBox.confirmDialog("عليك تسجيل الدخول اولا ");
        return false ;
        
    }
    
    
});
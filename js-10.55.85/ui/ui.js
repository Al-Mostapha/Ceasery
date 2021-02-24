Elkaisar.Ui.Select.menuList = function (list, selectedIndex){
    
    var optionList = "";
    
    for(var iii in list){
        if(Number(iii) === Number(selectedIndex)){
            optionList += `<li class="unit-option selected-op" data-title="${list[iii].title}" data-value="${list[iii].value}">${list[iii].title}</li>`;
        }else{
            optionList += `<li class="unit-option" data-title="${list[iii].title}" data-value="${list[iii].value}" data-index="${iii}">${list[iii].title}</li>`;
        }
    }
    
    return `<ul>${optionList}</ul>`;
};


Elkaisar.Ui.Select.make = function (list , selectedIndex){
    
    selectedIndex = selectedIndex || 0;
    
    
    
    return `
            <div class="select-list" data-value="${list[selectedIndex].value}" data-active="false">
                <div class="select select-input">
                    <div class="value">${list[selectedIndex].title}</div>
                </div>
                <div class="option">${this.menuList(list, selectedIndex)}</div>
            </div>`;
    
};


$(document).on("click", ".select-list .unit-option", function (){
    
    var title = $(this).attr("data-title");
    var value = $(this).attr("data-value");
    
    $(".select-list .unit-option").removeClass("selected-op");
    $(this).addClass("selected-op");
    
   $(".select-list").attr("data-value", value);
   $(".select-list .value").html(title);
    
    
});
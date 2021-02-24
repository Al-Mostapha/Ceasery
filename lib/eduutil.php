<?php

class EduUtil
{
    public static $STUDY = [
         "farming"=>[
                "ar_title"=>"الزراعة"
            ],
            "wooding"=>[
                "ar_title"=>"علم الاخشاب"
            ],
            "stoning"=>[
                "ar_title"=>"علم الاحجار"
            ],
            "mining"=>[
                "ar_title"=>"علم التعدين"
            ],
            "accounting"=>[
                "ar_title"=>"علم المحاسبة"
            ],
            "storing"=>[
                "ar_title"=>"علم التخزين"
            ],
            "building"=>[
                "ar_title"=>"الهندسة المعمارية"
            ],
            "scholership"=>[
                "ar_title"=>"المنح الدراسية"
            ],
            "maintenace"=>[
                "ar_title"=>"لم الصيانة"
            ],
            "infantry"=>[
                "ar_title"=>"المشاة"
            ],
            "riding"=>[
                "ar_title"=>"الفروسية"
            ],
            "army"=>[
                "ar_title"=>"الجيش"
            ],
            "spying"=>[
                "ar_title"=>"الاستخبارات"
            ],
            "leader"=>[
                "ar_title"=>"القيادة"
            ],
            "safe"=>[
                "ar_title"=>"الامن"
            ],
            "medicine"=>[
                "ar_title"=>"الطب"
            ],
            "logistic"=>[
                "ar_title"=>"الدعم اللوجستى"
            ],
            "navigating"=>[
                "ar_title"=>"الملاحة"
            ],
            "supplying"=>[
                "ar_title"=>"الامداد"
            ]
    ];
    public static function getResource($study_lvl , $study_type)
    {
        
        $equ_json = file_get_contents(BASE_BATH."js".JS_VERSION."/json/education.json");
        $equ_data = json_decode($equ_json , TRUE);
        
        $edu_res = $equ_data[$study_type]["lvl_req"][$study_lvl];
        $time_up = $equ_data[$study_type]["time_req"][$study_lvl];
        
        return
        
        array(
            "food" =>$edu_res["food"],
            "wood" =>$edu_res["wood"],
            "stone"=>$edu_res["stone"],
            "metal"=>$edu_res["metal"],
            "time" =>$time_up,
            "coin" =>$edu_res["coin"],
            "pop" =>0
            );
    }
    
    
    public static function afterstudyUpgrade($study , $id_player){
        
        if($study === "farming"){
            
            
            
            
        }
        
        
    }
    
}

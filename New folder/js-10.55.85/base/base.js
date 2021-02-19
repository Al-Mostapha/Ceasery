

$(document).on("PlayerReady", "html", function () {


    $.ajax({
        url: `${API_URL}/js${Elkaisar.Config.JsVersion}/json/item/${Elkaisar.Config.UserLang}.json`,
        success: function (Items, textStatus, jqXHR) {
            $.ajax({
                url: API_URL + "/js" + Elkaisar.Config.JsVersion + "/json/itemBase.json",
                success: function (data, textStatus, jqXHR) {
                    
                    Elkaisar.BaseData.Items = Items;
                    Player_profile.refreshMatrialBox();
                    
                    Elkaisar.Item.useItemFunc();
                    Elkaisar.Item.useItemBoxFunc();
                    Elkaisar.Item.useArmyBackFunc();
                   
                }
            });

        }
    });


});

Elkaisar.BaseData.HeroToCity = {
    "0" : 0,
    "1" : "army_a",
    "2" : "army_b",
    "3" : "army_c",
    "4" : "army_d",
    "5" : "army_e",
    "6" : "army_f"
};
Elkaisar.BaseData.Army = {
    "0":{
        food: 0,
        wood: 0,
        stone:0,
        metal:0,
        coin: 0,
        people:0,
        time:0,
        condetion:[
           
        ],
        ar_title:"جواسيس",
        image:"images/tech/no_army.png",
        desc:`الفرسا اسرع الفرسان مش عارف اى 
                                    ليس على كل لاعب الالتذام بذالك `,
        vit:0,
        attack:0,
        defence:0,
        damage:0,
        "break": 0,
        anti_break:0,
        strike:0,
        immunity:0,
        eating:0,
        speed:0,
        capacity:0,
        dismess:{
            food:0,
            wood:0,
            stone:0,
            metal:0
        }
    },
    "spies":{   // جواسيس
        food: 600,
        wood: 150,
        stone:0,
        metal:350,
        coin: 90,
        people:1,
        time:60,
        condetion:{
            place:BUILDING_TYPS.STABL,
            place_lvl:1,
            study:"riding",
            lvl:1
        },
        ar_title:"جواسيس",
        image:"images/items/item027.jpg",
        desc:`كانت الجواسيس هى سلاح الاستخبارت فى العصور الوسطى و كانت اهميتها تكمن فى جب الاخبار من المدن الاخرى 
            ولكن لا يمكنك الوثوق بهذه المعلومات بسسب قلة كفائة الجواسيس لديك`,
        vit:80,
        attack:10,
        defence:12,
        damage:"6-9",
        "break": 0,
        anti_break:0,
        strike:0,
        immunity:0,
        eating:6,
        speed:200,
        capacity:1,
        dismess:{
            food:180,
            wood:45,
            stone:0,
            metal:105
        }
    },
    "army_a":{     // مشاه
        food: 150,
        wood: 500,
        stone:0,
        metal:100,
        coin: 18,
        people:1,
        time:50,
        condetion:{
                place:BUILDING_TYPS.BARRACKS,
                place_lvl:1,
                study:'infantry',
                lvl:1
            },
        ar_title:"مشاه",
        image:"images/tech/soldier01.jpg",
        desc:`اكثر انواع الجيوش استعمالا اثناء الامبراطورية الرومانية 
                وذلك بسسب سهولة تدريبها  وتسليحها وتكمن قوتها  فى  الاسرار الحربية لديها`,
        vit:60,
        attack:8,
        defence:8,
        damage:"3-6",
        "break": 5,
        anti_break:4,
        strike:3,
        immunity:1,
        eating:4,
        speed:300,
        capacity:40,
        dismess:{
            food:45,
            wood:150,
            stone:0,
            metal:30
        }
    },
    "army_b":{   // اسطبل
        food: 1500,
        wood: 800,
        stone:0,
        metal:750,
        coin: 500,
        people:3,
        time: 300,
        condetion:{
            place:BUILDING_TYPS.STABL,
            place_lvl:5,
            study:"riding",
            lvl:3
        },
        ar_title:"فرسان",
        image:"images/tech/soldier02.jpg",
        desc:`سلاح الفرسان هو نموذج الفارس الممتاز في الجيش الروماني من حيث تسليحه عالي المستوى. يخيف هجوم سلاح الفرسان الخصم غير المستعدّ على الرغم من أنهم ليسوا أسرع القوات. مشكلتهم تكلفة صيانتهم لما يتوجب على من يدرّبهم من رصدٍ لطعام الفارس وفرسه.`,
        vit:250,
        attack:30,
        defence:20,
        damage:"33-38",
        "break": 10,
        anti_break:4,
        strike:1,
        immunity:2,
        eating:18,
        speed:900,
        capacity:100,
         dismess:{
            food:450,
            wood:240,
            stone:0,
            metal:225
        }
    },
    "army_c":{   // مدرعين
        food: 2000,
        wood: 500,
        stone:0,
        metal:2500,
        coin: 600,
        people:6,
        time: 500,
        condetion:{
                place:BUILDING_TYPS.BARRACKS,
                place_lvl:9,
                study:'infantry',
                lvl:6
            },
        ar_title:"مدرعين",
        image:"images/tech/soldier03.jpg",
        desc:`المدرعين هم اساس القوات الرومانية بتسليحهم المعقد وتدريباتهم المكثفة يمكن الاعتبار انها من اقوى انواع الجيوش
            يستغرق تدريب الابطال كمية كبيرة كدا من الوقت وذلك بسبب الالتزام لصنع اقوى الابطال`,
        vit:400,
        attack:25,
        defence:30,
        damage:"40-60",
        "break": 1,
        anti_break:5,
        strike:10,
        immunity:10,
        eating:36,
        speed:600,
        capacity:120,
         dismess:{
            food:600,
            wood:150,
            stone:0,
            metal:750
        }
    },
    "army_d":{  // رماه
        food: 300,
        wood: 350,
        stone:0,
        metal:300,
        coin: 30,
        people:1,
        time:120,
        condetion:{
                place:BUILDING_TYPS.BARRACKS,
                place_lvl:2,
                study:'infantry',
                lvl:2
            },
        ar_title:"رماه",
        image:"images/tech/soldier04.jpg",
        desc:`رماة السهم او  النبالين كانوا زمرة الجيش الرومانى.
                يمكنك الاعتماد عليهم فى الهجوم اما  بالنسبة الى الى الدفاع فلا يمكن ابدا الاعتماد عليهم.
                بسبب ضعف البنية الجسمانية لديهم ولكن يمكن لهذة القوات تنفيذ العديد من الاصابات البالغة  للاعداء`,
        vit:45,
        attack:9,
        defence:5,
        damage:"3-5",
        "break": 6,
        anti_break:2,
        strike:2,
        immunity:2,
        eating:5,
        speed:250,
        capacity:25,
         dismess:{
            food:90,
            wood:105,
            stone:0,
            metal:90
        }
    },
    "army_e":{  // مقاليع
        food: 1000,
        wood: 1200,
        stone:0,
        metal:800,
        coin: 120,
        people:4,
        time:180,
        condetion:{
            place:BUILDING_TYPS.WORKSHOP,
            place_lvl:3,
            study:'army',
            lvl:1
        },
        ar_title:"مقاليع",
        image:"images/tech/soldier05.jpg",
        desc:`كانت العصور الرومانية عصور ازدهار هندسى ومعمارى .
                احد الأدلة على ذلك هو  سلاح المقاليع لدى الجيوش الرمانية .
                يلحق هذا النوع ضرر كبير جدا  بالاعداء  مهما كانت قوتهم ويشتت جمعهم`,
        vit:100,
        attack:19,
        defence:25,
        damage:"18-20",
        "break": 5,
        anti_break:2,
        strike:15,
        immunity:2,
        eating:20,
        speed:150,
        capacity:35,
         dismess:{
            food:300,
            wood:360,
            stone:0,
            metal:240
        }
    },
    "army_f":{    // منجنيق
        food: 3000,
        wood: 3000,
        stone:6000,
        metal:1200,
        coin: 450,
        time:1000,
        people:8,
        condetion:{
            place:BUILDING_TYPS.WORKSHOP,
            place_lvl:7,
            study:'army',
            lvl:6
        },
        ar_title:"منجنيق",
        image:"images/tech/soldier06.jpg",
        desc:`اقوى  انوع القوات على الاطلاق .
                لا شك فى ذلك حيث ان هذه القوات مسؤلة عن هدم الاسوار والمبانى الشاهقة.
                فليس من الصعب عليها سحق  الاعداء`,
        vit:600,
        attack:40,
        defence:20,
        damage:"70-70",
        "break": 2,
        anti_break:4,
        strike:15,
        immunity:5,
        eating:150,
        speed:100,
        capacity:75,
         dismess:{
            food:900,
            wood:900,
            stone:1800,
            metal:360
        }
    },
    "wall_a":{ //كمائن
        food: 50,
        wood: 500,
        stone:100,
        metal:50,
        coin: 0,
        time:60,
        people:0,
        condetion:{
            place:BUILDING_TYPS.WALL,
            place_lvl:1,
            study:"safe",
            lvl:1
        },
        ar_title:"كمائن",
        image:"images/tech/defense01.jpg",
        desc:`يتم دس الكمائن داخ السور لعرقلة الاعداء.
                ولكن لا يمكن الاعتماد عليها  فى صد الهجمات`,
        vit:0,
        attack:0,
        defence:0,
        damage:"0-0",
        "break": 0,
        anti_break:0,
        strike:0,
        immunity:0,
        eating:0,
        speed:0,
        capacity:0,
         dismess:{
            food:15,
            wood:150,
            stone:30,
            metal:15
        },
        wall_space:1
        
    },
    "wall_b":{  // ابراج
        food: 200,
        wood: 2000,
        stone:1000,
        metal:500,
        coin: 0,
        people:0,
        time:180,
        condetion:{
            place:BUILDING_TYPS.WALL,
            place_lvl:3,
            study:"safe",
            lvl:2
        },
        ar_title:"ابراج",
        image:"images/tech/defense02.jpg",
        desc:`لا تنحصر وظيفة الابراج فى الرقابة على المدن, 
            ولكن تلعب دور هام فى الدفاع عن المدينة عند الهجوم عليها.
            تتميز الابراج بارتفاعتها الشاهقة مما يجعل منها افضلية هجومية ودفاعية ايضا`,
        vit:200,
        attack:18,
        defence:15,
        damage:"12-15",
        "break": 0,
        anti_break:0,
        strike:0,
        immunity:0,
        eating:0,
        speed:0,
        capacity:0,
        dismess:{
            food:60,
            wood:600,
            stone:300,
            metal:150
        },
        wall_space:3
    },
    "wall_c":{   // احجار  متساقطة
        food: 600,
        wood: 0,
        stone:8000,
        metal:0,
        coin: 0,
        time:600,
        people:0,
        condetion:{
            place:BUILDING_TYPS.WALL,
            place_lvl:5,
            study:"safe",
            lvl:6
        },
        ar_title:"احجار متساقطة",
        image:"images/tech/defense03.jpg",
        desc:`الاحجار المتساقطة من اقوى الاسلحة الدفاعية للمدينة .
                يمكن الاعتماد عليها بالحاق الضرر الجسيم للمعتدى`,
        vit:0,
        attack:0,
        defence:40,
        damage:"40-60",
        "break": 0,
        anti_break:0,
        strike:0,
        immunity:0,
        eating:0,
        speed:0,
        capacity:0,
        dismess:{
            food:180,
            wood:0,
            stone:2400,
            metal:0
        },
        wall_space:5
    }
    
};


Elkaisar.BaseData.PlayerStateData = {
    
        motiv:     {
            image: "images/icons/list/motiv.jpg",
            title: "خطبة تحفيزية",
            ar_title: "",
            en_title: ""
        },
        medical:     {
            image: "images/icons/list/medical.png",
            title: "تمثال الشفاء",
            ar_title: "",
            en_title: ""
        },
        wheat:     {
            image: "images/icons/list/wheat.png",
            title: "انتاح الغذاء",
            ar_title: "",
            en_title: ""
        },
        metal:     {
            image: "images/icons/list/metal.png",
            title: "زبادة انتاج الحديد",
            ar_title: "",
            en_title: ""
        },
        stone:     {
            image: "images/icons/list/stone.png",
            title: "زبادة انتاج الصخور",
            ar_title: "",
            en_title: ""
        },
        wood:     {
            image: "images/icons/list/wood.png",
            title: "زبادة انتاج الاخشاب",
            ar_title: "",
            en_title: ""
        },
        attack_10:     {
            image: "images/icons/list/attack.png",
            title: "زبادة نسبة الهجوم",
            ar_title: "",
            en_title: ""
        },
        defence_10:     {
            image: "images/icons/list/deff.png",
            title: "زبادة نسبة الدفاع",
            ar_title: "",
            en_title: ""
        },
        peace:     {
            image: "images/icons/list/peace.png",
            title: " الحماية",
            ar_title: "",
            en_title: ""
        },
        silance:     {
            image: "images/icons/list/silance.png",
            title: "الصمت",
            ar_title: "",
            en_title: ""
        } 
        
};

Elkaisar.BaseData.Edu = {
    "farming": {
        ar_title: "علم الزراعة",
        image: "images/tech/technology01.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "الحقل مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.FARM,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }


            return condtions;
        }
    },
    "wooding": {
        ar_title: "علم الاخشاب",
        image: "images/tech/technology02.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "الغابات مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.WOOD,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }



            return condtions;
        }
    },
    "stoning": {
        ar_title: " علم الاحجار",
        image: "images/tech/technology03.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "المحجر مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.STONE,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }



            return condtions;
        }
    },
    "mining": {
        ar_title: "علم التعدين",
        image: "images/tech/technology04.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "المنجم مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.MINE,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }



            return condtions;
        }
    },
    "accounting": {
        ar_title: "المحاسبة",
        image: "images/tech/technology05.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "دار المساعدة مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.WORSHIP,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }

            return condtions;
        }
    },
    "storing": {
        ar_title: "علم التخزين",
        image: "images/tech/technology06.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "المخازن مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.STORE,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }

            return condtions;
        }
    },
    "building": {
        ar_title: "الهندسة المعمارية",
        image: "images/tech/technology07.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "السور مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.WALL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }

            return condtions;
        }
    },
    "scholership": {
        ar_title: "المنح الدراسية",
        image: "images/tech/technology08.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "المسرح مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.THEATER,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }



            return condtions;
        }
    },
    "maintenace": {
        ar_title: "علم الصيانة",
        image: "images/tech/technology09.jpg",
        StudyPlace: "uni",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "السور مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.WALL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الجامعة مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.UNIVERSITY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }

            return condtions;
        }
    },
    "infantry": {
        ar_title: "المشاة",
        image: "images/tech/technology11.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "الثكنات مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.BARRACKS,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }

            return condtions;
        }
    },
    "riding": {
        ar_title: "الفروسية",
        image: "images/tech/technology12.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "الاسطبل مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.STABL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "army": {
        ar_title: "الجيش",
        image: "images/tech/technology13.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "ورشة العمل  مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.WORKSHOP,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "spying": {
        ar_title: "الاستخبارات",
        image: "images/tech/technology14.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "الاسطبل مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.STABL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "leader": {
        ar_title: "القيادة",
        image: "images/tech/technology15.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "المسرح مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.THEATER,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "safe": {
        ar_title: "الامن",
        image: "images/tech/technology16.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "البلازا  مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.HOSPITAL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "medicine": {
        ar_title: "الطب",
        image: "images/tech/technology17.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "البلازا مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.HOSPITAL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "logistic": {
        ar_title: "الدعم اللوجستى",
        image: "images/tech/technology18.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "البلازا  مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.HOSPITAL,
                building_lvl: Math.max(1, lvl)
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "navigating": {
        ar_title: "الملاحة",
        image: "images/tech/technology19.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "البلازا  مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.HOSPITAL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    },
    "supplying": {
        ar_title: "الامداد",
        image: "images/tech/technology20.jpg",
        StudyPlace: "acad",
        getCondetion: function (lvl) {
            var condtions = [];
            condtions[0] = {
                title: "البلازا مستوى " + getArabicNumbers(Math.max(1, lvl)),
                con_type: "building",
                building_type: BUILDING_TYPS.HOSPITAL,
                building_lvl: Math.max(1, lvl)
            };
            condtions[1] = {
                title: "الاكاديمية مستوى " + getArabicNumbers(Number(lvl) + 1),
                con_type: "building",
                building_type: BUILDING_TYPS.ACADEMY,
                building_lvl: Number(lvl) + 1
            };
            if (lvl >= 25) {
                condtions[2] = {
                    title: `1 x قانون رومانى`,
                    con_type: "matrial",
                    matrial: "law_3",
                    amount: 1
                };
            } else if (lvl >= 20) {

                condtions[2] = {
                    title: `1 x جدول الثانى عشر`,
                    con_type: "matrial",
                    matrial: "law_2",
                    amount: 1
                };

            } else if (lvl >= 10) {

                condtions[2] = {
                    title: ` 1 x  قانون دراكو`,
                    con_type: "matrial",
                    matrial: "law_1",
                    amount: 1
                };

            }
            return condtions;
        }
    }
};


Elkaisar.BaseData.HeroTheaterName = [
    "ماكسيموس",
    "اشرف",
    "مصطفى",
    "اليكس",
    "اليسا",
    "بطليموس",
    "كليوباترا",
    "هكس",
    "ماجد",
    "يويليوس",
    "مارس",
    "ماكس",
    "صلاح الدين",
    "سيورس",
    "سيزار",
    "اغسطس",
    "جلادياتور",
    "سما",
    "زين",
    "شادو",
    "الملك",
    "القاهر",
    "الاسد",
    "اليس",
    "حورس",
    "يورك"
];

Elkaisar.BaseData.BattelTasks = {
    BATTEL_TASK_CONQUER   :  0,
    BATTEL_TASK_DOMINATE  :  1,
    BATTEL_TASK_JOIN_ATT  :  2,
    BATTEL_TASK_JOIN_DEF  :  3,
    BATTEL_TASK_SPY       :  4,
    BATTEL_TASK_SUPPORT   :  5,
    BATTEL_TASK_HERO_TRANS:  6,
    BATTEL_TASK_SUPPLY    :  7,
    BATTEL_TASK_ENTER_CITY:  8,
    BATTEL_TASK_CHALLANGE :  10
};


Elkaisar.BaseData.Building.UpgradeBinfit = {};

Elkaisar.BaseData.Building.UpgradeBinfit[BUILDING_TYPS.STORE] = [
    8e4,     16e4,    32e4,    64e4,    128e4,   256e4,   512e4,  1024e4,  2048e4,  4096e4,
    49152e3, 51200e3, 53248e3, 55296e3, 57344e3, 59392e3, 6144e4, 63488e3, 65536e3, 67584e3,
    69632e3, 7168e4,  73728e3, 75776e3, 77824e3, 79872e3, 8192e4, 83968e3, 86016e3, 88064e3
];/* global alert_box, city_profile */



Crafty.init();
Crafty.timer.FPS(20);
Crafty.createLayer("UILayer", "Canvas", {scaleResponse: 0, xResponse: 0, yResponse: 0});


function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


$.ajaxSetup({
    data: {
        server: SERVER_ID
    }
});

function isInt(num) {
    return num % 1 === 0;
}


FAVORIT_LIST = [
    {
        id: 1,
        x_coord: 200,
        y_coord: 150,
        type: 27,
        lvl: 5,
        title: "mohamed"
    },
    {
        id: 2,
        x_coord: 458,
        y_coord: 125,
        type: 27,
        lvl: 5,
        title: "Mosta"
    },
    {
        id: 3,
        x_coord: 45,
        y_coord: 52,
        type: 27,
        lvl: 5,
        title: "morad"
    },
    {
        id: 4,
        x_coord: 45,
        y_coord: 52,
        type: 27,
        lvl: 5,
        title: "نغم"
    }
];


$(document).on("mouseenter", "#city-profile .page_content .army_type", function () {

    var army = $(this).attr("data-army");

    /*
     * 
     * ar_title: "مشاه"
     ​​
     coin: 18
     ​​
     condetion: Array []
     ​​
     food: 150
     ​​
     image: "images/tech/soldier01.jpg"
     ​​
     metal: 100
     ​​
     people: 1
     ​​
     stone: 0
     ​​
     time: 50
     */

    var tooltip = `  <div class="tooltip tooltip-army">
                        <div class="top">
                            <div class="left">
                                <div class="title">
                                    ${Elkaisar.BaseData.Army[army].ar_title}
                                </div>
                                <div class="image">
                                    <img src="${Elkaisar.BaseData.Army[army].image}"/>
                                </div>
                            </div>
                            <div class="right" >
                                <p class="desc">${Elkaisar.BaseData.Army[army].desc}</p>
                            </div>

                        </div>
                        <div class="bottom">
                            <ul>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/vitilty.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].vit}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/attack.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].attack}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/defence.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].defence}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/damage.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].damage}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/break.png" style="width:20px; height: 20px"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].break}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/anti-break.png" style="width:20px; height: 20px"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].anti_break}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/strike.png" style="width:20px; height: 20px"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].strike}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/immunity.png" style="width:20px; height: 20px"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].immunity}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/food.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].eating}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/speed.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].speed}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/capacity.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].capacity}</div>
                                </li>
                                <li>
                                    <div class="image">
                                        <img src="images/icons/army/pop.png"/>
                                    </div>
                                    <div class="value">${Elkaisar.BaseData.Army[army].people}</div>
                                </li>
                            </ul>
                        </div>
                    </div>`;

    $("#city-profile-tooltipe").html(tooltip);

});


$(document).on("mouseleave", "#city-profile .page_content .army_type", function () {
    $("#city-profile-tooltipe").html("");
});


var isMobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
}

WORLD_ALL_UNIT = Elkaisar.worldAllUnits;

$(document).on("PlayerReady", "html", function () {

    $.getJSON(
            API_URL + "/js" + Elkaisar.Config.JsVersion + "/json/worldUnitData.json", {},
            function (data, textStatus, jqXHR) {
                Elkaisar.World.UnitTypeData = data;
            }
    );

    $.ajax({
        url: API_URL + "/js" + Elkaisar.Config.JsVersion + "/json/WorldBarrary.json",
        data: {},
        type: 'GET',
        cache: true,
        beforeSend: function (xhr) {

        }, success: function (data, textStatus, jqXHR) {

            var data_array = data.split(",");
            var iii = 0;
            var end = data_array.length;
            for (; iii < end; iii++) {
                var temp = data_array[iii].split("_");

                Elkaisar.worldAllUnits[Number(temp[0]) * 500 + Number(temp[1])] = {
                    x: temp[0],
                    y: temp[1],
                    ut: temp[2],
                    l: temp[3],
                    p: temp[4],
                    t: temp[5],
                    on_map: false
                };
            }

            var xxx = 0;
            var yyy = 0;
            var crEl;

            setTimeout(function () {
                for (xxx = 0; xxx < 500; xxx++) {
                    for (yyy = 0; yyy < 500; yyy++) {



                        if (!Elkaisar.worldAllUnits[xxx * 500 + yyy]) {

                            Elkaisar.worldAllUnits[xxx * 500 + yyy] = {
                                x: xxx,
                                y: yyy,
                                t: 0,
                                ut: 0,
                                l: 0,
                                on_map: false
                            };

                        }


                    }
                }
            });
            $("#WorldCity").removeAttr("disabled");
        }, error: function (jqXHR, textStatus, errorThrown) {

        }
    });


});



function waitCursor() {
    $("body").attr("id", "wait");
}
function unwaitCursor() {
    $("body").removeAttr("id");
}


function zoomTowards(amt, posX, posY, time, easingFn) {
    var scale = Crafty.viewport._scale,
            // current viewport center
            centX = -Crafty.viewport._x + Crafty.viewport._width / 2 / scale,
            centY = -Crafty.viewport._y + Crafty.viewport._height / 2 / scale,
            // direction vector from viewport center to position
            deltaX = posX - centX,
            deltaY = posY - centY;



    var f = amt - 1;

    Crafty.viewport.zoom(amt, centX + deltaX * f, centY + deltaY * f, time, easingFn);
}

// don't restrict panning of viewport in any way
///Crafty.viewport.clampToEntities = false;

// enable panning of viewport by dragging the mouse


// enable interactive map-like zooming by scrolling the mouse
Crafty.bind("MouseWheelScroll", function (evt) {
    if (Crafty._floor !== "city")
        return;
    var scale = Crafty.viewport._scale;

    var newScale = Math.max(MAX_SCREEN_WIDTH / 2500, MAX_SCREEN_HEIGHT / 1400, scale * (1 + evt.direction * 0.05));


    Crafty.viewport.pan(0, 0, 100);


    Crafty.viewport.scale(Math.min(newScale, 2));
    // zoomTowards(1 + evt.direction/10, evt.realX, evt.realY, 5);
});




Crafty.bind("KeyDown", function (e) {
    if (e.key === Crafty.keys.ENTER) {

        if ($(".enter").last().is(":disabled")) {
            alert_box.failMessage(`لا يمكنك الهجوم على هذة الوحدة`);
            return;
        }


        $(".enter").last().click();
    }
});
/*
 $( window ).resize(function (){
 if(isMobile){
 MAX_SCREEN_WIDTH  = screen.height*2 ;
 MAX_SCREEN_HEIGHT = screen.width*2;
 
 }else{
 MAX_SCREEN_WIDTH  = $("#menu-bar").width();
 MAX_SCREEN_HEIGHT = screen.height;
 }
 
 
 });
 */



var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
const SAVE_URL = [
    "www.elkaisar.com",
    "elkaisar.com",
    "forum.elkaisar.com",
    "stackoverflow.com",
    "ar.islamway.net",
    "en.islamway.net",
    "fr.islamway.net",
    "du.islamway.net",
    "www.facebook.com",
    "www.fb.com",
    "www.anghami.com",
    "soundcloud.com",
    "www.instagram.com",
    "prnt.sc",
    "prntscr.com",
    "egy.best",
    "www.yallakora.com",
    "www.netflix.com"
];
function extractUrl(text) {
    if (!text)
        return;
    function checkBaseUrl(match, offset, string) {
        var hostName = extractHostname(match);
        return `<a rel="no-follow" href="${match}" class=" ${SAVE_URL.indexOf(hostName) > -1 ? "safe-url" : "not-safe-url"}" target="_blank">` + hostName + `</a>`;
    }
    return text.replace(uri_pattern, checkBaseUrl);
}



function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}




$(document).ready(function () {
    var ctrlDown = false,
            ctrlKey = 17,
            cmdKey = 91,
            vKey = 86,
            cKey = 67;

    $(document).keydown(function (e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey)
            ctrlDown = true;
    }).keyup(function (e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey)
            ctrlDown = false;
    });



    // Document Ctrl + C/V 
    $(document).keydown(function (e) {
        if (ctrlDown && (e.keyCode == cKey))
            document.execCommand("copy");
        if (ctrlDown && (e.keyCode == vKey))
            document.execCommand("paste");
    });


    document.onpaste = function (event) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                var blob = item.getAsFile();
                var reader = new FileReader();
                reader.onload = function (event) {

                    if (Number(USER_GROUP) < 3) {
                        alert_box.confirmMessage("هذة الخاصية متاحة فقط للادارة");
                        return;
                    }

                    var json_obj = {

                        type: "CHAT_IMAGE_PUBLIC",
                        url: "Chat/publicMsgImage",
                        data: {
                            image: event.target.result,
                            idPlayer: ID_PLAYER,
                            token: TOKEN,
                            p_name: player.name,
                            p_avatar: player.avatar,
                            userGroup: USER_GROUP
                        }
                    };

                    ws.send(JSON.stringify(json_obj));

                }; // data url!

                reader.readAsDataURL(blob);
            }
        }
    }
});

function getSelectionText() {
    var selectedText = ""
    if (window.getSelection) { // all modern browsers and IE9+
        selectedText = window.getSelection().toString();
    }
    return selectedText
}

function extractEmjoi(str) {

    if (!str)
        return;
    return  str.replace(/("[^"]+")|\S+/g, function (match, em) {

        if (Emjoi[match]) {
            return `<label class="emjoi" style="background-image: url(images/emjoi/${Emjoi[match]})"></label>`;

        }
        return match;
    });

}


var Extract = {

    coords: function (txt) {
        if (!txt)
            return;
        return txt.replace(/\[\s*\d{1,3}\s*\,\s*\d{1,3}\s*\]/g, function (match) {
            var coords = Extract.digits(match);
            return `<label class="clickable-coords font-2" data-x-coord="${coords[0]}" data-y-coord="${coords[1]}"><i>${match}</i></label>`;

        });
    },

    digits: function (txt) {
        if (!txt)
            return;
        return txt.match(/\d+/g);

    }

};







$(document).on("click", ".clickable-coords", function () {

    var coordX = Number($(this).attr("data-x-coord"));
    var coordY = Number($(this).attr("data-y-coord"));



    if ($("#WorldCity").attr("data-view") === "city") {
        $("#WorldCity").trigger("click");
    }




    $("#x_coord-input input").val(coordX);
    $("#y_coord-input input").val(coordY);
    $("#nav-btn button").click();

});





$(document).on("input keydown keyup mousedown mouseup select contextmenu drop", ".only_num", function (e) {

    var val = this.value;
    var max = $(this).attr("max") || 999999;
    var regExpVal = /^\d*$/;

    if ($(this).attr("fraction") === "true") {
        regExpVal = /^\d*[.]?\d*$/;
    }

    if ((regExpVal.test(val) && (val === "" || Number(val) <= max))) {

        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;

    } else if (Number(val) > max) {

        this.value = max;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);

    } else if (this.hasOwnProperty("oldValue")) {

        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);

    }

});


$(document).on("click", ".number-arrow-wrapper .up", function () {

    var input = $(this).parents(".number-arrow-wrapper").prev(".only_num");
    input.val(Math.min(Number(input.val() || 0) + Number(input.attr("step") || 1), Number(input.attr("max"))));
    input.trigger("keyup");

});

$(document).on("click", ".number-arrow-wrapper .down", function () {

    var input = $(this).parents(".number-arrow-wrapper").prev(".only_num");
    input.val(Math.max(Number(input.val() || 0) - Number(input.attr("step") || 1), 0));
    input.trigger("keyup");

});


<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Army {

    public static $ARMY_DATA = [
        "army_a" => [// مشاه
            "food" => 150,
            "wood" => 500,
            "stone" => 0,
            "metal" => 100,
            "coin" => 18,
            "time" => 50,
            "pop" => 1
        ], "army_b" => [// خيول
            "food" => 1500,
            "wood" => 800,
            "stone" => 0,
            "metal" => 750,
            "coin" => 500,
            "time" => 300,
            "pop" => 3
        ], "army_c" => [// مدرعين
            "food" => 2000,
            "wood" => 500,
            "stone" => 0,
            "metal" => 2500,
            "coin" => 600,
            "time" => 500,
            "pop" => 6
        ], "army_d" => [// رماة السهام
            "food" => 300,
            "wood" => 350,
            "stone" => 0,
            "metal" => 300,
            "coin" => 30,
            "time" => 120,
            "pop" => 1
        ], "army_e" => [// مقاليع
            "food" => 1000,
            "wood" => 1200,
            "stone" => 0,
            "metal" => 800,
            "coin" => 120,
            "time" => 180,
            "pop" => 4
        ], "army_f" => [// منجنيق
            "food" => 3000,
            "wood" => 3000,
            "stone" => 6000,
            "metal" => 1200,
            "coin" => 450,
            "time" => 1000,
            "pop" => 8
        ], "spies" => [// منجنيق
            "food" => 600,
            "wood" => 150,
            "stone" => 0,
            "metal" => 350,
            "coin" => 90,
            "time" => 60,
            "pop" => 1
        ], "wall_a" => [//  كمائن
            "food" => 50,
            "wood" => 500,
            "stone" => 100,
            "metal" => 50,
            "coin" => 0,
            "time" => 60,
            "pop" => 0
        ], "wall_b" => [//   ابراج
            "food" => 200,
            "wood" => 2000,
            "stone" => 1000,
            "metal" => 500,
            "coin" => 0,
            "time" => 180,
            "pop" => 0
        ], "wall_c" => [// احجار متساقطة
            "food" => 600,
            "wood" => 0,
            "stone" => 8000,
            "metal" => 0,
            "coin" => 0,
            "time" => 600,
            "pop" => 0
        ]
    ];

    public static function buildArmy($id_player , $idCity, $building_place, $amount) {

        if (!is_numeric($amount) || $amount < 1) {
            return (json_encode(["state" => "error_adding"]));
        }



        $city = new City($idCity);
        $building_lvl = $city->getOneBuildingLvl($id_player, $building_place);
        $workingCount = selectFromTable("COUNT(*)  as count", "build_army", "id_city = :idc AND place = :pl", ["pl" => $building_place, "idc" => $idCity])[0]["count"];

        if ($workingCount >= $building_lvl) {
            return(json_encode(["state" => "error_adding"]));
        }



        $resource = $city->army_data[$army_type];
        $resource["food"] *= (int) $amount;
        $resource["wood"] *= (int) $amount;
        $resource["stone"] *= (int) $amount;
        $resource["metal"] *= (int) $amount;
        $resource["coin"] *= (int) $amount;
        $resource["pop"] *= (int) $amount;

        $save_state = new SaveState($id_player);
        $save_state->saveCityState($id_city);

        $cityResource = selectFromTable("food, wood,stone,metal,coin, pop", "city", "id_city = :idc", ["idc" => $id_city])[0];

        if ($cityResource["food"] < $resource["food"] - 5000 || $cityResource["wood"] < $resource["wood"] - 5000 || $cityResource["stone"] < $resource["stone"] - 5000 || $cityResource["metal"] < $resource["metal"] - 5000 || $cityResource["coin"] < $resource["coin"] - 5000 || $cityResource["pop"] < $resource["pop"] - 1000) {



            exit($responce = [
                "state" => "error_res",
                "new_res" => selectFromTable("food,wood,stone,metal,pop,coin", "city", "id_city = :idc", ["idc" => $id_city])[0]
            ]);
        }

        $columns = [
            "food  = GREATEST(food - " . $resource["food"] . " , 0)",
            "wood  = GREATEST(wood - " . $resource["wood"] . " , 0)",
            "stone = GREATEST(stone - " . $resource["stone"] . " , 0)",
            "metal = GREATEST(metal - " . $resource["metal"] . " , 0)",
            "coin  = GREATEST(coin - " . $resource["coin"] . " , 0)",
            "pop   = GREATEST(pop - " . $resource["pop"] . " , 0)",
            "pop_state =  -1 "
        ];

        /*  get last finishing time to start after */
        $last_time = $city->getLastWorkingArmyBuilding($id_player, $building_place);

        if (is_array($last_time) && count($last_time) > 0) {

            $time_start = $last_time[0]["time_end"];
        } else {

            $time_start = time();
        }



        if ($worship_place != "false") {
            $worship_lvl = $city->getOneBuildingLvl($id_player, $worship_place);
        } else {
            $worship_lvl = 0;
        }

        $time_par_unit = $resource["time"];
        $time_par_unit -= (int) ($time_par_unit * $building_lvl * 1.5 / 100);
        $time_par_unit -= (int) ($time_par_unit * $worship_lvl * 3 / 100);

        $time_end = $time_start + ((int) ($time_par_unit * $amount));




        if ($city->updateCityColumns($id_player, $columns)) {

            $id = $city->addArmyBuild($id_player, $building_place, $army_type, $time_start, $time_end, $amount);
            $save_state->getConsoleEffect($id_city);
            $save_state->coin_inState($id_city);
            $save_state->res_inState($id_city, "food");
            $save_state->res_inState($id_city, "wood");
            $save_state->res_inState($id_city, "stone");
            $save_state->res_inState($id_city, "metal");

            $responce = [
                "state" => "ok",
                "id_work" => $id,
                "time_end" => $time_start,
                "new_res" => selectFromTable("food,wood,stone,metal,pop,coin,food_in,wood_in,stone_in,metal_in,coin_in", "city", "id_city = :idc", ["idc" => $id_city])[0],
                "duration" => $time_end - $time_start,
                "time_start" => $time_start,
                "time_end" => $time_end,
                "amount" => $amount,
                "army_type" => $army_type
            ];

            if ($id > -1) {
                echo json_encode($responce);
            } else {

                echo json_encode(["state" => "error_adding"]);
            }
        } else {

            echo json_encode(["state" => "error_res"]);
        }
    }

}

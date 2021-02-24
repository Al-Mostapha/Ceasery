<?php


class Fight
{
    private $players ;   
    private $x_coord ;   
    private $y_coord  ;  
    private $id_battal ;  
    private $side_win ;   
    private $heros ;    
    private $unit ;  
    private $round_num = 0 ;  
    private $task ;    
    private $id_attacker;
    private $totalHonor = 0;
    
    public function __construct($id_battel , $x_coord , $y_coord , $id_player , $task) 
    {
        $this->x_coord     = $x_coord;
        $this->y_coord     = $y_coord;
        $this->id_battal   = $id_battel;
        $this->unit        = $this->getUnitData();
        $this->id_attacker = $id_player ;
        $this->task        = $task ;
    }
    
    
    /*

     *  This    the  most general method 
     * 
     *  STEPS :
     *      1-> check swapped heros  (treminate  thewhile loop)
     *      2-> if  there is heros   we  will start anew heros round
     *              (  hero   round could have 3 heros in each side as  maximim of 1 as minimum)
     *  
     * {return}   no-retun
     * 
     */
    public function startFight()
    {
        
        /*
         * to prevent while     from go more than 1000 loop
         */
        $check_loop_overflow = 0; 
       
        $all_heros = $this->getHeros();
        //$this->addSpesialPower($all_heros);
        /*
         * do{} while();    TO start at least on round
         * 
         */
        do{
            
            /*
             * 
             */
            $def_heros = [];
            $attack_heros = [];
            
            foreach ($all_heros as &$hero):
                /*
                 *  CONDETIONS 
                 *          FIRST: check if this hero is  empty after last fight or not
                 *          SECOUND: make sure its in defend  side 
                 *          THIRD:   make sure the defence side has at most 3 heros
                 */
                if(!$this->checkHeroSweped($hero) && $hero["side"] == HERO_SIDE_DEFENCE && count($def_heros) <= 3){

                    $def_heros[] = &$hero;
                    

                }
                /*
                 *  CONDETIONS 
                 *          FIRST: check if this hero is  empty after last fight or not
                 *          SECOUND: make sure its in attack  side 
                 *          THIRD:   make sure the defence side has at most 3 heros
                 */
                elseif(!$this->checkHeroSweped($hero) && $hero["side"] == HERO_SIDE_ATTACK  && count($attack_heros) <= 3){

                    $attack_heros[] = &$hero;
                    
                    
                }

            endforeach;
            
             /*
              * condetion    to check if arrays contains data
              */
            if(count($attack_heros) > 0 && count($def_heros) > 0){
                
                /* icrement round number*/
                $this->round_num ++;
                /* start new round*/
                $this->roundFight($attack_heros, $def_heros);
                
            }
            
            $check_loop_overflow ++;
            
            
        }while (count($attack_heros) > 0 && count($def_heros) > 0 && $check_loop_overflow < 1000);
        
       
        
        /*
        *     AFTER THE WHILE 
        */
        $this->endFight($all_heros); 
        
        
        $this->heros = $all_heros;
        return $all_heros;
    }
    
    
    /*
     *  get attacked world unit  data from data_base
     *  @return 2D array [
     *                  "t"=>{@type int} , 
     *                  "l"=>{@type int}    
     *              ]
     */
    public function getUnitData()
    {
        global $dbh;
        $sql = $dbh->prepare("SELECT x, y, t , l FROM world  WHERE x = '$this->x_coord' AND y = '$this->y_coord'");
        $sql->execute();
       
        return  $sql->fetch(PDO::FETCH_ASSOC);
    }
    
    public function giveWinnerPrize($attacker ,$players , $heros){
        
        $prize = new Prize($this->x_coord, $this->y_coord , $this->unit , $heros);
        
        $data = [];
        $takIdes = [];
        
        foreach ($players  as $onePlayer):
            
            $honor = $this->getGainHonor($onePlayer["id_player"], SIDE_ATTACK);
            
            $prizeToSend =  array(
                "p1t" => NULL, "p1n"  => NULL, "p2t" => NULL,
                "p2n" => NULL, "p3t"  => NULL, "p3n" => NULL,
                "p4t" => NULL, "p4n"  => NULL, "p5t" => NULL,
                "p5n" => NULL, "honor"=>$honor,
                "food" =>$prize->totalResources["food"],
                "wood" =>$prize->totalResources["wood"],
                "stone"=>$prize->totalResources["stone"],
                "metal"=>$prize->totalResources["metal"],
                "coin" =>$prize->totalResources["coin"]
            );
        
            if(in_array($onePlayer["id_player"], $takIdes)){
                continue;
            }else  if((WorldUnit::isSharablePrize($this->unit["t"]) || $onePlayer["id_player"] == $attacker) && $this->side_win == $onePlayer["side"]){
                $prizeToSend = $prize->givePrize($onePlayer["id_player"] , $honor); 
            }
            
            
            $data[] = array(
                "id_player"=> $onePlayer["id_player"],
                "side"     =>$onePlayer["side"],
                "prize"    => $prizeToSend
            );
                
          
            $takIdes[] = $onePlayer["id_player"];
            
        endforeach;
        
        
        
        
        
        return $data;
              
        
        
    }


    /*
     *  this function is  called after attack finished
     *  first i get all players joind_battel
     *  then i distribute prize , honor fo each player
     */
    
    public  function getAllPlayers($attacker , $heros)
    {
        
        $players = selectFromTable("DISTINCT id_player , side , id_hero , ord ", "battel_member", "id_battel = '$this->id_battal' ORDER BY ord ASC");
        
        if(WorldUnit::isBarrary($this->unit["t"])){
            
            $ownerBarray = selectFromTable("id_player", "city_bar", "x_coord = $this->x_coord AND y_coord = $this->y_coord");
            if (count($ownerBarray) > 0):
                
                $found = FALSE;
            
                foreach ($players  as $one){
                    if($one["id_player"] == $ownerBarray[0]["id_player"]){
                        $found = TRUE;
                        break;
                        
                    }
                }
                
                if(!$found){
                    array_unshift($players, [
                        "id_player"=>$ownerBarray[0]["id_player"],
                        "side"=>SIDE_DEFANCE,
                        "id_hero"=>-1,
                        "ord"=>0
                    ]);
                }
                    
            endif;
            
        }
        else if(WorldUnit::isCity($this->unit["t"])){
            
            $cityData = selectFromTable('id_city, id_player', "city", "x = $this->x_coord AND y = $this->y_coord")[0];

            $save_state = new SaveState(0);
            $save_state->saveCityState($cityData["id_city"]);
            
            
            $found = FALSE;

            foreach ($players  as $key => $one){
                if($one["id_player"] == $cityData["id_player"]){
                    
                    $t = $one;
                    unset($players[$key]);
                    $players[] = $t;
                    $found = TRUE;
                    
                    break;

                }
            }

            if(!$found){
                array_push($players, [
                    "id_player"=>$cityData["id_player"],
                    "side"=>SIDE_DEFANCE,
                    "id_hero"=>-1,
                    "ord"=>0
                ]);
            }
        }
        
        
        return $this->giveWinnerPrize($attacker, $players, $heros);
    }
    
    
    /*
     * {multi-D-Array} $attack side (contain at most 3 heros to fight)
     * {multi-D-Array} $def_side (contain at most 3 heros to fight)
     * 
     * this function fight each hero as infront one 
     * attack side hero fight only its opposite side hero
     */
    public function roundFight(&$attack_side  ,  &$def_side)
    {
        
        /*

         *  attack side has the abality to fight first    
         */
        
        /*
         *  $attack_side = array(
         *              0=> $hero (must exist)
         *              1=> $hero (not neccesary)
         *              2=> $hero (not neccesary)
         *          );
         */
        foreach ($attack_side as $place => &$hero):
            
            
            /* if the defence side has hero in opposite cell the current hero will fight him*/
            if(isset($def_side[$place])){
                
                $this->heroFight($hero, $def_side[$place]);
                
            }
            /* if the defence side has hero in sec oppsoite cell  the current hero will fight him
             * 
             * this condetion  true if the current hero is the first or secound one
             * and false if the current is the 3rd hero
             */
            elseif (isset($def_side[$place +1])) {
                
                $this->heroFight($hero, $def_side[$place + 1]);
                
            }
            /*
             * if the side defence has hero in the third place affter the opposite to current hero
             * 
             * this condtion true if the current hero is only the first hero
             */
            elseif (isset($def_side[$place +2])) {
                
                $this->heroFight($hero, $def_side[$place + 2]);
                
            }
            
            /*
             * if the side defence has hero in the one  place before the opposite to current hero
             * 
             * this condtion true if the current hero is the secound heror or third one
             */
            elseif (isset($def_side[$place -1])) {
                
                $this->heroFight($hero, $def_side[$place - 1]);
                
            }
            /*
             * if the side defence has hero in  two  places before the opposite to current hero
             * 
             * this condtion true if the current hero is  third one
             */
            elseif (isset($def_side[$place - 2])) {
                
                $this->heroFight($hero, $def_side[$place - 2]);
                
            }
            
            
        endforeach;
        
        foreach ($def_side as $place => &$hero):
            
            
            if(isset($attack_side[$place])){
                
                $this->heroFight($hero, $attack_side[$place]);
                
            }elseif (isset($attack_side[$place +1])) {
                
                $this->heroFight($hero, $attack_side[$place + 1]);
                
            }elseif (isset($attack_side[$place +2])) {
                
                $this->heroFight($hero, $attack_side[$place + 2]);
                
            }elseif (isset($attack_side[$place -1])) {
                
                $this->heroFight($hero, $attack_side[$place - 1]);
                
            }elseif (isset($attack_side[$place - 2])) {
                
                $this->heroFight($hero, $attack_side[$place - 2]);
                
            }
            
            
        endforeach;
        
        
        /*   afetr round finish i should scane heros to remove the  dead heros */
        
        $this->scanHero($def_side);
        $this->scanHero($attack_side);
        
        //$this->addSpesialPower($def_side);
        //$this->addSpesialPower($attack_side);
        
    }
    

    
    public function getHeros()
    {
        global $dbh;
        
        
        /*  this will be copy from hero to be easy to deal with*/
        $heros = array();
        
        $first_heros = Battel::getFirstHeros($this->x_coord, $this->y_coord , $this->unit);
        
        $garrison_heros = selectFromTable("world_unit_garrison.* , hero.id_city, "
                . " hero.point_b, hero.point_b_plus, hero.point_c, hero.point_c_plus  , "
                . " hero_medal.medal_den , hero_medal.medal_leo, city.x ,city.y ", 
                
                "world_unit_garrison JOIN hero ON hero.id_hero = world_unit_garrison.id_hero "
                . " JOIN hero_medal ON hero_medal.id_hero = world_unit_garrison.id_hero"
                . " JOIN city ON city.id_city = hero.id_city",
                "world_unit_garrison.x_coord = $this->x_coord AND world_unit_garrison.y_coord = $this->y_coord ");
        

        // loop on these heros
        $id_fake = count($first_heros)*-1 - count($garrison_heros);
        
        if(is_array($first_heros) && count($first_heros) > 0){
            
            foreach ($first_heros as $hero){
               
                $heros[] = array(
                            "id_hero"=>++$id_fake, //fack id for system hero
                            "id_player"=>0,         // id_player which own the hero
                            "id_city"=>0,         // id_player which own the hero
                            "x_coord"=>0,
                            "y_coord"=>0,
                            "side" => 0,
                            "ord"=>$hero["ord"],
                            "type"=>$hero["type"],
                            "pre"=>$hero["pre"],
                            "point_atk"=>0,
                            "point_def"=>0,
                            "is_garrsion"=>FALSE,
                            "post"=>array(
                                "f_1_post" => 0,
                                "f_2_post" => 0,
                                "f_3_post" => 0,
                                "b_1_post" => 0,
                                "b_2_post" => 0,
                                "b_3_post" => 0
                            ),
                            "honor"=>0,
                            "points"=>0
                        );
            }
        }
        
        /* garison heros*/
        foreach ($garrison_heros as $one_hero){
            
            $hero_army = Battel::getPreTypeArmy($one_hero["id_hero"]);
            $now = time();
            $leo_medal_eff = $one_hero["medal_leo"] > $now ? 0.25 : 0;
            $den_medal_eff = $one_hero["medal_den"] > $now ? 0.25 : 0;
            $heros[] = array(
                "id_hero"  => $one_hero["id_hero"],
                "id_player"=> $one_hero["id_player"],
                "id_city"  => $one_hero["id_city"],
                "x_coord"  => $one_hero["x"],
                "y_coord"  => $one_hero["y"],
                "side"     => SIDE_DEFANCE,
                "ord"      => $one_hero["ord"],
                "type"     => $hero_army["type"],
                "pre"      => $hero_army["pre"],
                "is_garrsion"=>TRUE,
                "point_atk"=>$one_hero["point_b"] + $one_hero["point_b"]*$den_medal_eff + $one_hero["point_b_plus"],
                "point_def"=>$one_hero["point_c"] + $one_hero["point_c"]*$leo_medal_eff + $one_hero["point_c_plus"] ,
                "post"=>array(
                            "f_1_post" => 0,
                            "f_2_post" => 0,
                            "f_3_post" => 0,
                            "b_1_post" => 0,
                            "b_2_post" => 0,
                            "b_3_post" => 0
                        ),
                "honor"=>0,
                "points"=>0
            );
        }
        
        $sql = $dbh->prepare("SELECT  battel_member.id_hero , battel_member.id_player ,"
                . " hero.point_b, hero.point_b_plus, hero.point_c, hero.point_c_plus  , "
                . " hero_medal.medal_den , hero_medal.medal_leo , battel_member.ord , "
                . " hero.id_city  , battel_member.side , city.x, city.y FROM `battel_member` "
                . " JOIN  hero ON hero.id_hero = battel_member.id_hero JOIN hero_medal "
                . " ON hero_medal.id_hero = battel_member.id_hero JOIN city ON hero.id_city = city.id_city"
                . " WHERE battel_member.id_battel = '$this->id_battal' ORDER BY battel_member.ord ASC");
        $sql->execute();
        
        while ($fetch = $sql->fetch(PDO::FETCH_ASSOC)){
            
            /* GET army befor attack begain*/
            $hero_army = Battel::getPreTypeArmy($fetch["id_hero"]);
            $now = time();
            $leo_medal_eff = $fetch["medal_leo"] > $now ? 0.25 : 0;
            $den_medal_eff = $fetch["medal_den"] > $now ? 0.25 : 0;
            $heros[] = array(
                "id_hero"  =>$fetch["id_hero"],
                "id_player"=>$fetch["id_player"],
                "id_city"  =>$fetch["id_city"],
                "x_coord"  =>$fetch["x"],
                "y_coord"  =>$fetch["y"],
                "side"     => $fetch["side"],
                "ord"      =>$fetch["ord"],
                "type"     =>$hero_army["type"],
                "pre"      =>$hero_army["pre"],
                "is_garrsion"=>TRUE,
                "point_atk"  =>$fetch["point_b"] + $fetch["point_b"]*$den_medal_eff + $fetch["point_b_plus"],
                "point_def"  =>$fetch["point_c"] + $fetch["point_c"]*$leo_medal_eff + $fetch["point_c_plus"] ,
                "post"=>array(
                            "f_1_post" => 0,
                            "f_2_post" => 0,
                            "f_3_post" => 0,
                            "b_1_post" => 0,
                            "b_2_post" => 0,
                            "b_3_post" => 0
                        ),
                "honor"=>0,
                "points"=>0
            );
                
        }
       
        /*   this function will prepare hero object for attack*/
        $this->getHerosFightEff($heros);
        return $heros;
    }
    
    
    /*
     *  this function loop through array of heros
     *      get equipment effect
     *      get normal army equipment
     */
    
    public function getHerosFightEff(&$heros)
    {
     
        $players_array = [];
        
        foreach ($heros as &$hero):
            $id_hero   = $hero["id_hero"];
            $id_player = $hero["id_player"];
            
            $atk_percent  = 0;
            $def_percent  = 0;
            $acad_study = ["infantry"=>0,"riding"=>0,"army"=>0,"infantry"=>0,"medicine"=>0,"safe"=>0];
            
            if(array_key_exists($id_player, $players_array)){
                
                $atk_percent   = $players_array[$id_player]["atk_percent"];
                $def_percent   = $players_array[$id_player]["def_percent"];
                $acad_study    = $players_array[$id_player]["study"];
                $godGateEffect = $players_array[$id_player]["godGate"];
                
            }else{
                
                if($id_player > 0){
                    
                    $now = time();
                    $player_state  = selectFromTable("attack_10 , defence_10", "player_stat", "id_player = {$id_player}")[0];
                    $acad_study    = selectFromTable("infantry , riding, army, safe, medicine", "edu_acad", "id_player = {$id_player}")[0];
                    $atk_percent   = $player_state['attack_10']  > $now ? 0.1 : 0;
                    $def_percent   = $player_state['defence_10'] > $now ? 0.1 : 0;
                    $godGateEffect = godGate::getPlayerGateEffect($id_player, $this->unit);
                    
                    
                    $players_array[$id_player]["atk_percent"] = $atk_percent ;
                    $players_array[$id_player]["def_percent"] = $def_percent;
                    $players_array[$id_player]["study"]       = $acad_study;
                    $players_array[$id_player]["godGate"]     = $godGateEffect;
                    
                    
                }else{
                    $godGateEffect = godGate::getPlayerGateEffect($id_player, $this->unit);
                    
                    $players_array[$id_player]["atk_percent"] = 0 ;
                    $players_array[$id_player]["def_percent"] = 0;
                    $players_array[$id_player]["study"]       = ["infantry"=>0 , "riding"=>0, "army"=>0, "safe"=>0, "medicine"=>0];
                    $players_array[$id_player]["godGate"]     = $godGateEffect;
                    
                }
            }
            
            
            $hero_obj = new Hero($id_hero);
            /* add attack defence points to array */
            $hero_obj->getHeroArmyForces($hero);
            /* add equip ments points*/
            $equip_effect = Equipment::getHeroEquipEffect($id_hero, $this->unit);



            if($equip_effect != NULL){

                foreach ($hero["real_eff"] as &$one):  // increment attack and defance points  for hero
                    
                    $one["attack"]    += $hero["point_atk"];
                    $one["attack"]    += $equip_effect["attack"];
                    $one["attack"]    += $one["attack"]*Hero::studyEffectOnForces($one["army_type"], $acad_study);
                    $one["attack"]    += $atk_percent*$one["attack"];
                    $one["attack"]    += $godGateEffect["attack"];
                    $one["def"]       += $hero["point_def"];
                    $one["def"]       += $equip_effect["def"];
                    $one["def"]       += $one["def"]*$acad_study["safe"]*0.03;
                    $one["def"]       += $def_percent*$one["def"];
                    $one["def"]       += $godGateEffect["defence"];
                    $one["vit"]       += $equip_effect["vit"];
                    $one["vit"]       += $one["vit"]*$acad_study["medicine"]*0.05;
                    $one["vit"]       += $godGateEffect["vit"];
                    $one["dam"]       += $equip_effect["dam"];
                    $one["dam"]       += $godGateEffect["damage"];
                    $one["break"]     += $equip_effect["break"];
                    $one["anti_break"]+= $equip_effect["anti_break"];
                    $one["strike"]    += $equip_effect["strike"];
                    $one["immunity"]  += $equip_effect["immunity"];

                endforeach;

            }
            
        endforeach;
   
        
        
    }
    
    public function inBattelUniqeFeature($cell_attack , $cell_def)
    {
        
        if($cell_attack["army_type"] == ARMY_A){
            
            if($cell_def['army_type'] == ARMY_B){
                return $cell_attack["attack"]*1;
            }else if($cell_def['army_type'] == ARMY_F){
                return $cell_attack["attack"]*0.2;
            }
            
        }else if($cell_attack["army_type"] == ARMY_B){
            
            if($cell_def['army_type'] == ARMY_D){
                return $cell_attack["attack"]*1;
            }else if($cell_def['army_type'] == ARMY_C){
                return $cell_attack["attack"]*1;
            }
            
        }else if($cell_attack["army_type"] == ARMY_C){
            
            if($cell_def['army_type'] == ARMY_D){
                return $cell_attack["attack"]*1;
            }else if($cell_def['army_type'] == ARMY_A){
                return $cell_attack["attack"]*1;
            }
            
        }else if($cell_attack["army_type"] == ARMY_D){
            
            if($cell_def['army_type'] == ARMY_A){
                return $cell_attack["attack"]*1;
            }else if($cell_def['army_type'] == ARMY_B){
                return $cell_attack["attack"]*0.2;
            }
            
        }else if($cell_attack["army_type"] == ARMY_E){
            
            if($cell_def['army_type'] == ARMY_B){
                return $cell_attack["attack"]*1;
            }else if($cell_def['army_type'] == ARMY_C){
                return $cell_attack["attack"]*1;
            }
            
        }else if($cell_attack["army_type"] == ARMY_F){
            
            if($cell_def['army_type'] == ARMY_C){
                return $cell_attack["attack"]*0.3;
            }else if($cell_def['army_type'] == ARMY_E){
                return $cell_attack["attack"]*0.4;
            }
            
        }
        return 0;
    }

    

    /*  الفنكشن دى انا هديها الخانتين الى هيحربوا بعض
    والداتا هتتبعت  بالريفرنس 
     * انا كل الى هعملة انى هغير عدد ال وحداات الى فى كل خانة     */
    public function cellFight(&$cell_attack , &$cell_def)
    {
        
        /* trimnate condetion*/
        if($cell_attack["unit"] == 0 ){
            return;
        }
        
        $attack = $cell_attack["attack"] + $this->inBattelUniqeFeature($cell_attack, $cell_def) + $cell_attack["sp_attack"];
        $def   = $cell_def["def"] + $cell_def["sp_defence"];
        $vitality = $cell_def["vit"] + $cell_def["sp_vit"];
        //  first calculate  how many unit there defence has been broken
        $undefence_unit = ceil($cell_attack["unit"]*$attack/$def);

        //then calculate how many unit  die
        $deadUnits = ceil($cell_attack["unit"]*$cell_attack["dam"]/$vitality);

        // get the min number
        $total_dead = min($undefence_unit , $deadUnits);
        
        /* this condetion will check  if the two cells have not fight done*/
      
            
            
        $cell_def["dead_unit"]  += $total_dead;
            
        $cell_attack ["honor"]  +=  ceil($total_dead/$cell_def["def"]);
        $cell_attack ["points"] +=  ceil($total_dead);
        
    }
    
    
    /**/
    public function heroFight(&$hero_attck , &$hero_def)
    {
        /* لو البطل ششايل اكتر من ثلاثة خانات كدة انا هخلى كل خانة تضرب الخانة الى قصادها 
والخانة الى وراها         */
        
            
            foreach ($hero_attck["real_eff"] as $place => &$cell):
                
                if($cell["unit"] == 0){
                    continue;
                }
                
                /* first if i loop throght all cells */
                if(isset($hero_def["real_eff"][$place]) 
                        && $hero_def["real_eff"][$place]["unit"] > $hero_def["real_eff"][$place]["dead_unit"] ){ // fight FIRST row                                     ATTACK SIDE
                                                                                                                  //                                              
                    $this->cellFight($cell, $hero_def["real_eff"][$place]);                                       //                       +------------------------+------------------------+-------------------------+
                                                                                                                  //                       |                        |                        |                         |                
                }elseif(isset ($hero_def["real_eff"][$place + 3] )  // this will fight the back cell to him
                        && $hero_def["real_eff"][$place+3]["unit"]>$hero_def["real_eff"][$place+3]["dead_unit"] ){//                       |            4           |            5           |             6           |                
                                                                                                                  //                       |                        |                        |                         |                
                    $this->cellFight($cell, $hero_def["real_eff"][$place + 3 ]);                                  //                       |________________________|________________________|_________________________|
                                                                                                                  //                       |                        |                        |                         |               
                } elseif (isset ($hero_def["real_eff"][$place + 1] ) 
                        && $hero_def["real_eff"][$place+1]["unit"]>$hero_def["real_eff"][$place+1]["dead_unit"] ) { //                     |            1           |            2           |              3          |                
                                                                                                                  //                       |                        |                        |                         |                
                    $this->cellFight($cell, $hero_def["real_eff"][$place + 1 ]);                                  //                       +------------------------+------------------------+-------------------------+                       
                                                                                                                  //
                } elseif ( isset ($hero_def["real_eff"][$place + 4] ) 
                        && $hero_def["real_eff"][$place+4]["unit"]>$hero_def["real_eff"][$place+4]["dead_unit"] ) { //
                                                                                                                  //
                    $this->cellFight($cell, $hero_def["real_eff"][$place + 4 ]);                                  //
                                                                                                                  //
                } elseif ( isset ($hero_def["real_eff"][$place + 2] )
                        && $hero_def["real_eff"][$place+2]["unit"]>$hero_def["real_eff"][$place+2]["dead_unit"] ) { //
                                                                                                                  //_____________________________________________________________________________________________________________________________
                    $this->cellFight($cell, $hero_def["real_eff"][$place + 2 ]);                                  //
                                                                                                                  //
                } elseif ( isset ($hero_def["real_eff"][$place + 5] )
                        && $hero_def["real_eff"][$place+5]["unit"]>$hero_def["real_eff"][$place+5]["dead_unit"] ) { //
                                                                                                                  //
                    $this->cellFight($cell, $hero_def["real_eff"][$place + 5 ]);                                  //
                                                                                                                  //                       +------------------------+------------------------+-------------------------+
                } elseif ( isset ($hero_def["real_eff"][$place - 1] )
                        && $hero_def["real_eff"][$place-1]["unit"]>$hero_def["real_eff"][$place-1]["dead_unit"] ) { //                     |                        |                        |                         |
                                                                                                                  //                       |           1            |           2            |            3            |
                    $this->cellFight($cell, $hero_def["real_eff"][$place - 1 ]);                                  //                       |                        |                        |                         |
                                                                                                                  //                       |________________________|________________________|_________________________|
                }elseif(isset ($hero_def["real_eff"][$place - 4] ) 
                        && $hero_def["real_eff"][$place-4]["unit"]>$hero_def["real_eff"][$place-4]["dead_unit"] ){  //                     |                        |                        |                         |
                                                                                                                  //                       |           4            |            5           |            6            |
                    $this->cellFight($cell, $hero_def["real_eff"][$place - 4 ]);                                  //                       |                        |                        |                         |
                                                                                                                  //                       +------------------------+------------------------+-------------------------+
                } elseif (isset ($hero_def["real_eff"][$place - 5] ) 
                        && $hero_def["real_eff"][$place-5]["unit"]>$hero_def["real_eff"][$place-5]["dead_unit"] ) { //
                                                                                                                  //
                    $this->cellFight($cell, $hero_def["real_eff"][$place - 5 ]);           
                                                                                                                  //                                      
                                                                                                                  //                                        DEFENCE SIDE
                }
                
                /* this will be plus attribute if the player has only 3 cells in */
                
                /*
                 * this case will work only if  the attcker has less than 4 cells
                 *  current cell will fight the corosponding back  cell only 
                 * if the the crosponding cell has army and the back ony sure
                 */
                if(count($hero_attck["real_eff"]) <= 3){
                    
                    if(isset ($hero_def["real_eff"][$place  + 3] )  && isset ($hero_def["real_eff"][$place] ) 
                            && $hero_def["real_eff"][$place + 3]["unit"]>$hero_def["real_eff"][$place+3]["dead_unit"] ){                            //
                                                                                               
                        $this->cellFight($cell, $hero_def["real_eff"][$place + 3 ]); 
                        
                                                                                                    
                    }
                    
                }
                
            endforeach;
                    
        
    }
    
    
    /*
     * {muti d array}  $hero_arr
     * this function used  to scane hero 
     *   loop for each hero 
     *      loop for eachcell
     */
    
    
    public function scanHero(&$hero_arr)
    {
        
        foreach ($hero_arr as &$hero){ // loop  through heros
           
            foreach ( $hero["real_eff"] as &$cell){ // loop through cell in each hero
                
                /*
                 * if dead unit more than unit the  unit of this cell will be 0 
                 * else will be the reminder of unit - dead_unit
                 */
                $cell["unit"]      = max(0 , ($cell["unit"] - $cell["dead_unit"]) );
                $cell["dead_unit"] = 0;                // reset the dead_unit to secound  round
                $hero["honor"]    += $cell["honor"];      //  calculate the gained honor after round
                $hero["points"]   += $cell["points"];      //  calculate the gained honor after round
                $cell["honor"]     = 0;                    // reset the honor to zero for next round
                $cell["points"]    = 0; 
                $cell["army_type"] = $cell["unit"] > 0? $cell["army_type"] : 0;
                
            }
            
            
        }
        
    }
    
    public function addSpesialPower(&$hero_arr)
    {
        
        foreach ($hero_arr as &$hero){ // loop  through heros
           
            $ar_t_arr = array_column($hero["real_eff"], "army_type");
            foreach ( $hero["real_eff"] as &$cell){ // loop through cell in each hero

                if($cell["unit"] == 0){
                    continue;
                }


                if($cell["army_type"] == ARMY_A){
                    $cell["sp_attack"]  = array_search(ARMY_E, $ar_t_arr) ? $cell["attack"]*0.2 : 0;
                    $cell["sp_defence"] = array_search(ARMY_C, $ar_t_arr) ? $cell["def"]*0.3 : 0;
                    $cell["sp_vit"]     = array_search(ARMY_B, $ar_t_arr) ? $cell["vit"]*0.3 : 0;
                    $cell["sp_attack"] += array_search(ARMY_D, $ar_t_arr) ? $cell["attack"]*0.1 : 0;
                }
                else  if($cell["army_type"] == ARMY_B){
                    $cell["sp_attack"]  = array_search(ARMY_D, $ar_t_arr)  ? $cell["attack"]*0.1 : 0;
                    $cell["sp_attack"] += array_search(ARMY_E, $ar_t_arr) ? $cell["attack"]*0.2 : 0;
                    $cell["sp_defence"] = array_search(ARMY_B, $ar_t_arr) ? $cell["def"]*0.3 : 0;
                    $cell["sp_vit"]     = array_search(ARMY_F, $ar_t_arr) ? $cell["vit"]*0.3 : 0;
                }
                else  if($cell["army_type"] == ARMY_C){
                    $cell["sp_attack"]  = array_search(ARMY_D, $ar_t_arr) ? $cell["attack"]*0.1 : 0;
                    $cell["sp_attack"] += array_search(ARMY_E, $ar_t_arr) ? $cell["attack"]*0.6 : 0;
                    $cell["sp_defence"] = array_search(ARMY_B, $ar_t_arr) ? $cell["def"]*0.3 : 0;
                    $cell["sp_vit"]     = array_search(ARMY_F, $ar_t_arr) ? $cell["vit"]*0.5 : 0;
                }
                else  if($cell["army_type"] == ARMY_D){
                    $cell["sp_attack"]  = array_search(ARMY_B, $ar_t_arr) ? $cell["attack"]*0.1 : 0;
                    $cell["sp_attack"] += array_search(ARMY_E, $ar_t_arr) ? $cell["attack"]*0.4 : 0;
                    $cell["sp_defence"] = array_search(ARMY_B, $ar_t_arr) ? $cell["def"]*0.3 : 0;
                    $cell["sp_vit"]    += array_search(ARMY_F, $ar_t_arr) ? $cell["vit"]*0.1 : 0;
                }
                else  if($cell["army_type"] == ARMY_E){
                    $cell["sp_attack"]  = array_search(ARMY_C, $ar_t_arr) ? $cell["attack"]*0.33 : 0;
                    $cell["sp_attack"] += array_search(ARMY_A, $ar_t_arr) ? $cell["attack"]*0.2 : 0;
                    $cell["sp_defence"] = array_search(ARMY_B, $ar_t_arr) ? $cell["def"]*0.3 : 0;
                }
                else  if($cell["army_type"] == ARMY_F){
                    $cell["sp_defence"] = array_search(ARMY_C, $ar_t_arr) ? $cell["def"]*0.39 : 0;
                    $cell["sp_attack"]  = array_search(ARMY_A, $ar_t_arr) ? $cell["attack"]*0.25 : 0;
                    $cell["sp_attack"] += array_search(ARMY_B, $ar_t_arr) ? $cell["attack"]*0.39 : 0;
                    $cell["sp_vit"]     = array_search(ARMY_E, $ar_t_arr) ? $cell["vit"]*0.3 : 0;
                }

            } 
            
        }
        
       
    }
    
    

    public function checkHeroSweped($hero)
    {
       
        
        foreach ($hero["real_eff"] as $one){
            
            if ($one["unit"] != 0){
                return FALSE;
            }
            
        }
        
        return TRUE;
        
    }
    
    
    public function endFight(&$all_heros)
    {
        /*this array will contain the  value of each side 

         * 0 for defence 1 for attack         */
        $total_unit = [0,0];
        
        
        /*
         * looping through all heros to get win side
         */
        foreach ($all_heros as &$hero):
            
            /* FRIST cell in hero*/
            if(isset($hero["real_eff"][1])){
                $hero["post"]["f_1_post"] = $hero["pre"]["f_1_pre"]  -  $hero["real_eff"][1]["unit"]; // set post value of cell
                
                $total_unit[$hero["side"]] += $hero["real_eff"][1]["unit"];// increment  value to get the winner hero and dead one
            }
            
            if(isset($hero["real_eff"][2])){
                $hero["post"]["f_2_post"] = $hero["pre"]["f_2_pre"]  -  $hero["real_eff"][2]["unit"];
                
                $total_unit[$hero["side"]] += $hero["real_eff"][2]["unit"];
            }
            
            if(isset($hero["real_eff"][3])){
                $hero["post"]["f_3_post"] = $hero["pre"]["f_3_pre"]  -  $hero["real_eff"][3]["unit"];
                
                $total_unit[$hero["side"]] += $hero["real_eff"][3]["unit"];
            }
            
            if(isset($hero["real_eff"][4])){
                $hero["post"]["b_1_post"] = $hero["pre"]["b_1_pre"]  -  $hero["real_eff"][4]["unit"];
                $total_unit[$hero["side"]] += $hero["real_eff"][4]["unit"];
            }
            
            if(isset($hero["real_eff"][5])){
                $hero["post"]["b_2_post"] = $hero["pre"]["b_2_pre"]  -  $hero["real_eff"][5]["unit"];
                $total_unit[$hero["side"]] += $hero["real_eff"][5]["unit"];
            }
            
            if(isset($hero["real_eff"][6])){
                $hero["post"]["b_3_post"] = $hero["pre"]["b_3_pre"]  -  $hero["real_eff"][6]["unit"];
                $total_unit[$hero["side"]] += $hero["real_eff"][6]["unit"];
            }
            
        endforeach;
        
        
        /*    assign the winner   */
        if($total_unit[SIDE_ATTACK] != 0){
            $this->side_win = SIDE_ATTACK;
        } else {
            $this->side_win = 0;    
        }
        
    }
    
    
    public function getWinnerSide()
    {
        return $this->side_win;
    }
    
    private function getGainHonor($id_player , $side)
    {
        $total_honor = 0;
        $factor = 1;
        
        if($side == $this->side_win){
            $factor = 2;
        }
        
        foreach ($this->heros as $hero):
            
            if($hero["id_player"] == $id_player){
                
                $total_honor += $hero["honor"];
                
            }
            
        endforeach;
        //$this->totalHonor = $total_honor*$factor;
        return $total_honor*$factor;
    }
    
    
    public function return_unit()
    {
        return $this->unit;
    }
    public function return_round_num()
    {
        return $this->round_num;
    }
    
    
   
    
   
}


/*$fight = new Fight(3, 145, 163);

($fight->startFight());*/

/*$hero_1 = $fight->getHeroFight($fight->getHeros()[0]);
$hero_2 = $fight->getHeroFight($fight->getHeros()[4]);



$fight->cellFight($hero_2["real_eff"][2] , $hero_1["real_eff"][1]);
$fight->cellFight($hero_1["real_eff"][1] , $hero_2["real_eff"][2]);

print_r($hero_1["real_eff"]);
echo '---------------------------------------------------------';
print_r($hero_2["real_eff"]);*/

/*$fight = new Fight(1, 138, 161 , 1 , 0);
            
            
            
            // get all heros   oneplayer can get many heros
            $heros = $fight->startFight();
            print_r($heros);*/
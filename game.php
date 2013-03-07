<?php
  error_reporting(0);
  ob_start();
  session_start();

  $xmlroot = new SimpleXMLElement("<TuinTopia></TuinTopia>");
  $xmlroot->addChild("protocol","0.1");

  $bordering=array();
  for ($i=1; $i < 18; $i++) {
    $bordering[$i]=array();
  }
  //17==house
  $bordering[1]=array(2,5,6);
  $bordering[2]=array(17, 1, 5,6,7); 
  $bordering[3]=array(17, 4, 8,9,10); 
  $bordering[4]=array(3, 9, 10); 
  $bordering[5]=array(1,2,6,11,12); 
  $bordering[6]=array(17, 1, 2, 5, 7, 11,12,13);
  $bordering[7]=array(17, 2, 6, 8, 12,13,14);
  $bordering[8]=array(17, 3, 7, 9, 13,14,15);
  $bordering[9]=array(17, 3, 4, 8, 10,14,15,16);
  $bordering[10]=array(9,3,4,15,16);
  $bordering[11]=array(5,6,12);
  $bordering[12]=array(5,6,7,11,13);
  $bordering[13]=array(6,7,8,12,14);
  $bordering[14]=array(7,8,9,13,15);
  $bordering[15]=array(8,9,10,14,16);
  $bordering[16]=array(9,10,15);
  $bordering[17]=array(2,3,6,7,8,9);

  if (isset($_REQUEST['action'])) {
    if ($_REQUEST['action']=="newgame") {
      session_destroy();
      unset ($_SESSION);
      session_start();
    }

    if ($_REQUEST['action']=="playcard") {
      if (isset($_REQUEST['card']) && isset($_REQUEST['hand'])){
        $card = $_REQUEST['card'];
        $hand = $_REQUEST['hand'];
        if ($_SESSION['field'][$card] == "0") {
//          $_SESSION['field'][$card]=$_SESSION['hand'][$hand-1]['name'];
          $_SESSION['field'][$card]=$_SESSION['hand'][$hand-1];
          $_SESSION['hand'][$hand-1]=array_pop($_SESSION['stack']);

          $_SESSION['score']['turn']=0;

          if (isset($_SESSION['field'][$card]['in'])) foreach ($_SESSION['field'][$card]['in'] as $vergin) {
            foreach ($bordering[$card] as $vergpos) {
              if ($vergpos==17){
                $testarray=array('plantenresten','afvalwater','afdak');
              } else {
                $testarray=$_SESSION['field'][$vergpos]['out'];
              }
              if (isset($testarray)) if (in_array($vergin, $testarray))  $_SESSION['score']['turn'] +=1;  
              // now we also want score per kind
              foreach ($testarray as $kind) if($vergin==$kind)$_SESSION['score'][$vergin]+=1;                                  
            }
          }


          if (isset($_SESSION['field'][$card]['out'])) foreach ($_SESSION['field'][$card]['out'] as $vergin) {
            foreach ($bordering[$card] as $vergpos) {
              if ($vergpos==17){
                $testarray=array('voedsel','water','stroom');
              } else {
                $testarray=$_SESSION['field'][$vergpos]['in'];
              }
              if (isset($testarray)) if (in_array($vergin, $testarray))  $_SESSION['score']['turn'] +=1;  
              // now we also want score per kind
              foreach ($testarray as $kind) if($vergin==$kind)$_SESSION['score'][$vergin]+=1;     
            }
          }



          $_SESSION['score']['total'] += $_SESSION['score']['turn'];

          for ($i=1; $i<17; $i++) { // starting with 1
            if (in_array($i, $bordering[$card])) {
              if ($_SESSION['field'][$i]==-1) $_SESSION['field'][$i]=0;
            }
          }

        } else {
          // occupied or nobordering
          if ($_SESSION['field'][$card] == -1)
            $xmlroot->addChild("error","Geen aangrenzende kaart");
          else
            $xmlroot->addChild("error","Hier ligt al een kaart");
        }
      } else {
        $xmlroot->addChild("error","Ongeldig verzoek");
      }
    }
  }

  //-------------------------------------------------------------------
  // http://stackoverflow.com/questions/834875/recursive-cast-from-simplexmlobject-to-array
  //-------------------------------------------------------------------

    if (isset($_SESSION['stack']) && isset($_SESSION['hand']) ) {

    } else {

      $xmlFile = "cards.xml"; 
      $xmlStr  = file_get_contents($xmlFile);
      $xmlObj  = simplexml_load_string($xmlStr);



  //-- http://theserverpages.com/php/manual/en/ref.simplexml.php 
  function xml2php($xml)
  {
      $fils = 0;
      $tab = false;
      $array = array();
      foreach($xml->children() as $key => $value)
      {   
          $child = xml2php($value);
         
          if ($key=="in") $tab=true;         
          if ($key=="out") $tab=true;

          //Let see if the new child is not in the array
          if($tab==false && in_array($key,array_keys($array)))
          {
              //If this element is already in the array we will create an indexed array
              $tmp = $array[$key];
              $array[$key] = NULL;
              $array[$key][] = $tmp;
              $array[$key][] = $child;
              $tab = true;
          }

          elseif($tab == true)
          {
              //Add an element in an existing array
              $array[$key][] = $child;
          }
          else
          {
              //Add a simple element
              $array[$key] = $child;
          }
                 
          $fils++;       
        }
     
     
      if($fils==0)
      {
          return (string)$xml;
      }
     
      return $array;
     
  } 
  //--

      $stack=array();

      //$cards=xml2php($xmlObj)['card'];
      // not supported by php 5.3 
      // the code was originally developed on 5.4
      $xmlcards=xml2php($xmlObj);
      $cards= $xmlcards['card'];      

      foreach ($cards as $card){
        $count = $card['count'];
        for ($i=0;$i<$count;$i++) $stack[]=$card;
      }

    $shaked=array();
    while(count($stack)){
      $random=array_rand($stack);
      $shaked[]=$stack[$random];
      unset($stack[$random]);
      $stack=array_values($stack);
    }

    $_SESSION['stack']=$shaked;

    $hand[]=array_pop($_SESSION['stack']);
    $hand[]=array_pop($_SESSION['stack']);
    $hand[]=array_pop($_SESSION['stack']);
    $hand[]=array_pop($_SESSION['stack']);
    $_SESSION['hand']=$hand;

  }

  if (!(isset($_SESSION['score']))){
    $_SESSION['score']=array();
    $_SESSION['score']['total']=0;
    $_SESSION['score']['turn']=0;

    $_SESSION['score']['voedsel']=0;
    $_SESSION['score']['water']=0;
    $_SESSION['score']['mest']=0;
    $_SESSION['score']['plantenresten']=0;
    $_SESSION['score']['nectar']=0;
    $_SESSION['score']['bevruchting']=0;
    $_SESSION['score']['stro']=0;
    $_SESSION['score']['afvalwater']=0;
    $_SESSION['score']['plaagbestrijders']=0;
    $_SESSION['score']['stroom']=0;
    $_SESSION['score']['afdak']=0;


  }


  if (!(isset($_SESSION['field']))){
    $_SESSION['field']=array();
    for ($i=1; $i<17; $i++) { // starting with 1
      if (in_array($i, $bordering[17])) {
        $_SESSION['field'][$i]=0;
      } else {
        $_SESSION['field'][$i]=-1;
      }
    }

  }





  $xmlhand = $xmlroot->addChild("hand");
  $xmlhand->addChild("card1",$_SESSION['hand'][0]['name']);
  $xmlhand->addChild("card2",$_SESSION['hand'][1]['name']);
  $xmlhand->addChild("card3",$_SESSION['hand'][2]['name']);
  $xmlhand->addChild("card4",$_SESSION['hand'][3]['name']);
  $xmlscr  = $xmlroot->addChild("score");
  $xmlscr->addChild("total",$_SESSION['score']['total']);
  $xmlscr->addChild("turn",$_SESSION['score']['turn']);

  $xmlscr->addChild("voedsel",$_SESSION['score']['voedsel']);
  $xmlscr->addChild("water",$_SESSION['score']['water']);
  $xmlscr->addChild("mest",$_SESSION['score']['mest']);
  $xmlscr->addChild("plantenresten",$_SESSION['score']['plantenresten']);
  $xmlscr->addChild("nectar",$_SESSION['score']['nectar']);
  $xmlscr->addChild("bevruchting",$_SESSION['score']['bevruchting']);
  $xmlscr->addChild("stro",$_SESSION['score']['stro']);
  $xmlscr->addChild("afvalwater",$_SESSION['score']['afvalwater']);
  $xmlscr->addChild("plaagbestrijders",$_SESSION['score']['plaagbestrijders']);
  $xmlscr->addChild("stroom",$_SESSION['score']['stroom']);
  $xmlscr->addChild("afdak",$_SESSION['score']['afdak']);



  $xmlfld  = $xmlroot->addChild("field");
  for ($i=1; $i<17; $i++) {
    if (isset($_SESSION['field'][$i]['name'])){
      $xmlfld->addChild("card".$i,$_SESSION['field'][$i]['name']);
    } elseif ($_SESSION['field'][$i]==0) {
      $xmlfld->addChild("card".$i,"available");      
    } else {
      $xmlfld->addChild("card".$i,"notavailable");      
    }
  }


  // output
  header('Content-type: text/xml');

  if (isset($_SERVER['HTTP_ORIGIN'])) {
          header('Access-Control-Allow-Origin: '. $_SERVER['HTTP_ORIGIN']);
          header('Access-Control-Allow-Credentials: true');
  }


  echo $xmlroot->AsXML();
?>

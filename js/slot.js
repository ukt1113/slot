const ODDS_7 = 1000//7が揃った時のオッズ
const ODDS_OTHER = 100//7以外が揃った時のオッズ

var imgs = new Array(10);
var total = 200;//初回持ち金額
var bet;//掛金額

//各要素を取得
var start_button = document.getElementsByClassName("start")[0].firstChild;
var bet_select = document.querySelector('select[name="bet"]');

//点数の初期化
document.getElementById("total").innerHTML = total
//スロットの画像を表示
for (i=0;i<10;i++){
	imgs[i] = new Image();
	imgs[i].src = "./images/number3_" + i + ".png";
}
//各ロールの状態を初期化
var dr = new Array(3);
dr[0] = dr[1] = dr[2] = false;

//startボタンをおした時の処理
start_button.addEventListener("click",function(){
	if(!dr[0] && !dr[1] && !dr[2]){
		bet = bet_select.options[bet_select.selectedIndex].value;
		if (total < bet){
			alert("掛け金が持ち金を超えています。");
		} else {
			dr[0] = dr[1] = dr[2] = true;
			for (j=0;j<=2;j++){
				doRoll1();
				doRoll2();
				doRoll3();
			}
			bet_select.disabled = "true";
		}
	} else {
		alert("ゲーム中です");
	}
},false);

//各ロールを回す関数
var cl1 = cl2 = cl3 = 7;
var speed = 10;
function doRoll1(){
	if(dr[0]){
		cl1++;
		if(cl1 >=10){cl1 = 0;}
		document.images["img1"].src = imgs[cl1].src;
		Timer1 = setTimeout("doRoll1()",speed);
	}
}
function doRoll2(){
	if(dr[1]){
		cl2++;
		if(cl2 >=10){cl2 = 0;}
		document.images["img2"].src = imgs[cl2].src;
		Timer2 = setTimeout("doRoll2()",speed);
	}
}
function doRoll3(){
	if(dr[2]){
		cl3++;
		if(cl3 >=10){cl3 = 0;}
		document.images["img3"].src = imgs[cl3].src;
		Timer3 = setTimeout("doRoll3()",speed);
	}
}

//ストップボタンをおした時の処理
for (k=0; k<=2; k++){
	document.getElementsByClassName("stop")[k].addEventListener("click",StopRoll(k),false);
}
//ストップボタンをおした時の処理内容
function StopRoll(_n){
	return function(){
		if (dr[0]===true || dr[1]===true || dr[2]===true) {　//どれか一つでもスロットが回っていることを確認
			dr[_n] = false;	
			if(dr[0]===false && dr[1]===false && dr[2]===false) {//すべてのスロットが止まっている場合
				number_1 = document.images["img1"].src.charAt(37);//数字を切り抜く
				number_2 = document.images["img2"].src.charAt(37);
				number_3 = document.images["img3"].src.charAt(37);
				bet = bet_select.options[bet_select.selectedIndex].value;
				if(number_1===number_2 && number_2===number_3){//賞金計算
					if(number_1=="7"){
						total = bet * ODDS_7 + total;
					} else {
						total = bet * ODDS_OTHER + total;
					}
				} else {
					total = total - bet;
				}
				document.getElementById("total").innerHTML = total;
				bet_select.disabled = "";
			}
		} else {
			alert("startボタンを押してください");
		}

		//掛け金がなくなった時の処理
		if (total <=0) {
				start_button.disabled = "true";
		}
	}
}
function name_develop(name_diff) {
	//---ポケモンの名前検索---
	
	d3.csv("pokedb.csv", function(data) {
		var no = name_judge(data, name_diff);
		
		//図鑑情報と適合しなかった場合
    	if(no == "ERROR"){
			alert("そのポケモンは存在しません！");
			location.href = "index.html";
		}
		//図鑑情報と適合した場合
		else{
			
			//データ入れ込み
			var name = data[no].Name;
			var t1 = data[no].T1;
			var t2 = data[no].T2;
			var h = data[no].H;
			var a = data[no].A;
			var b = data[no].B;
			var c = data[no].C;
			var d = data[no].D;
			var s = data[no].S;
			var total = data[no].Total;
			
            //タイプによって着色
            var type = [
                ノーマル, ほのお, みず, でんき, くさ,
                こおり, かくとう, どく, じめん, ひこう,
                エスパー, むし, いわ, ゴースト, ドラゴン,
                あく, はがね, フェアリー
            ];
            var color1;
            var color2;
            
            if(t2 != null){
                switch(t1){
                    case 0 : color1 = "black";
                    case 1 : color1 = "red";
                    case 2 : color1 = "blue";
                    case 3 : color1 = "yellow";
                    case 4 : color1 = "green";
                    case 5 : color1 = "skyblue";
                    case 6 : color1 = "brown";
                }
            }
                
            
			//変数確認エリア
            /*
			alert("no:" + no);
			alert("name:" + name);
            */
			
			
			//表示
    		document.getElementById("name").innerHTML = name;
    		document.getElementById("type1").innerHTML = t1;
    		document.getElementById("type2").innerHTML = t2;
    		document.getElementById("h").innerHTML = h;
			document.getElementById("h_m").value = h;
    		document.getElementById("a").innerHTML = a;
			document.getElementById("a_m").value = a;
    		document.getElementById("b").innerHTML = b;
			document.getElementById("b_m").value = b;
    		document.getElementById("c").innerHTML = c;
			document.getElementById("c_m").value = c;
    		document.getElementById("d").innerHTML = d;
			document.getElementById("d_m").value = d;
    		document.getElementById("s").innerHTML = s;
			document.getElementById("s_m").value = s;
    		document.getElementById("total").innerHTML = total;
			document.getElementById("t_m").value = total;
			
			//画像の入れ込み
			var no = data[no].No;
			document.getElementById("img").src = "./img/"+ no + ".png";
    	}
    	
    		
	});
	
	/* エラー確認用
	console.log(d3.csv(pokedata));
	alert("after");
	*/
}

function name_judge(ary, name_diff) {
	var no = "ERROR";
	for(var i=0; i<ary.length; i++){
		if(ary[i].Name == name_diff){
            //配列のindex番号を取得
            //ポケモンのNOを取得した場合、上の処理で配列の番号を見てしまうので違う場所を参照してしまう
			no = ary.indexOf(ary[i]);
			break;
		}
	}
	return no;
}
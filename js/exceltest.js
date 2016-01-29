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
			var type = [];
			type[0] = data[no].T1;
			//タイプが2つあれば
			if(data[no].T2){
				type[1] = data[no].T2;
			}else{
				type[1] = "";
			}
			
			var h = data[no].H;
			var a = data[no].A;
			var b = data[no].B;
			var c = data[no].C;
			var d = data[no].D;
			var s = data[no].S;
			var total = data[no].Total;
            var sp1 = data[no].SP1;
            var sp2 = data[no].SP2;
            var ha = data[no].HA;
            var ad1 = data[no].AD1;
            var ad2 = data[no].AD2;
            var ad3 = data[no].AD3;
            var pkwiki_link = null;
            
            // ---メガ進化処理---
            var i=1;
            do {
                var mega1 = null;
                var mega2 = null;
                var megaName_diff;
                
                // このcsvデータはメガ"ポケモン名"ではなく、"ポケモン名"(M)という表記
                // ただしメガ進化が二つあるものに関しては(X)(Y)のような分類になる
				if(no != 796){
	                if((data[no+1].Name.lastIndexOf(")") != -1) && data[no].No != 719){
		                if(name === data[no+i].Name.substr(0, name.length)){
		                    if(i == 2){
		                        mega2 = no+i;
								link_generation("mega2", mega2);
		                    }
		                    else{
		                        mega1 = no+i;
		                    	link_generation("mega1", mega1);
		                    }
		                }
		            }else{
						if(data[no].No == 719){
							mega1 = no+1;
			                link_generation("mega1", mega1);
						}
						break;
					}
	                // ここの時点でiは2になるのでwhile文は2で評価
	                i++;
	            }else{
					break;
				}
            }while(data[no+i].Name.substr(0, name.length) === name );

            // メガ進化の場合のポケwikiリンク設定
            if(name.lastIndexOf(")") != -1){
            	pkwiki_link = name.substr(0, name.length-3);
            }else{
				pkwiki_link = name;
			}
            // ---END メガ進化処理---
            

            // ---タイプ処理---
            var type_select = [
                "ノーマル", "ほのお", "みず", "でんき", "くさ",
                "こおり", "かくとう", "どく", "じめん", "ひこう",
                "エスパー", "むし", "いわ", "ゴースト", "ドラゴン",
                "あく", "はがね", "フェアリー"
            ];
            
            //タイプによって着色
            var type_class = [
            	"normal", "flame", "water", "elect", "grass",
            	"ice", "fight", "poison", "ground", "flight",
            	"psi", "insect", "rock", "ghost", "dragon",
            	"evil", "steel", "fairy"
            ];
			
			var type_style = [];
            var i;
            var class_num;
            var count=0;
            
            do{
		    	for(i=0; i<type_select.length; i++){
					if(type_select[i] === type[count]){
						class_num = i;
						//classの名前として送る"type_style"
						//タイプによるクラス名"type_class"
						//type_selectで一致した配列番号を格納"class_num"
						//countはタイプ2があった場合
						type_style[count] = type_class[class_num];
						break;
					}
				}
				count++;
            }while(type[1] && count <= 1);
            
            // ---END タイプ処理---
            
			//表示
    		document.getElementById("name").innerHTML = name;
    		document.getElementById("type1").innerHTML = type[0];
    		document.getElementById("type1").className = type_style[0];
    		document.getElementById("type2").innerHTML = type[1];
    		document.getElementById("type2").className = type_style[1];
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
            document.getElementById("sp1").innerHTML = sp1;
            document.getElementById("sp2").innerHTML = sp2;
            document.getElementById("ha").innerHTML = ha;
            
            if(ad1 != null){
				link_generation("ad1", ad1);
				document.getElementById("ad1_span").innerHTML = "↓";
			}
	        if(ad2 != null){
				link_generation("ad2", ad2);
				document.getElementById("ad2_span").innerHTML = "↓";
				
			}
			if(ad3 != null){
				link_generation("ad3", ad3);
			}

			var link = document.getElementById("link");
            link.href = "http://wiki.ポケモン.com/wiki/" + pkwiki_link;
            
			//画像の入れ込み
			
			// メガ進化の画像は_1に、2種類あるものは_2に設定
			// img_noで図鑑番号、mega_img_noでメガ進化があった場合の指定
			var mega_img_no = "";
			var img_no = data[no].No;

			if((name.indexOf("Ｍ") > 0) || (name.indexOf("Ｘ") > 0)){
				mega_img_no = "_1";
			}else if(name.indexOf("Ｙ") > 0){
				mega_img_no = "_2";
			}

			document.getElementById("img").src = "./gif/" + img_no + mega_img_no +".gif";
    	}

    	/*
    		-指定したポケモンのリンクを出力-
			[id]に出力するidを入力
			[val]にリンクさせたいポケモンのidを入力
		*/
		function link_generation(id, val) {
			var id_link = document.getElementById(id);
			id_link.href = "detail.html?" + data[val].Name;
			document.getElementById(id).innerHTML = data[val].Name;
		}
		
	});
}

function name_judge(ary, name_diff) {
	no = "ERROR";
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


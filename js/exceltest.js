function name_develop(name_diff) {
	//---ポケモンの名前検索---
	d3.csv("pokedb.csv", function(data) {
		var no = name_judge(name_diff);
		
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
								var mega_style2 = document.getElementById('mega2');
		                    	mega_style2.style.borderWidth = "1px";
		                    	mega_style2.style.borderStyle = "solid";
		                    }
		                    else{
		                        mega1 = no+i;
		                    	link_generation("mega1", mega1);
		                    	var mega_style1 = document.getElementById('mega1');
		                    	mega_style1.style.borderWidth = "1px";
		                    	mega_style1.style.borderStyle = "solid";
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
            var type_name = [
                "ノーマル", "かくとう", "どく", "じめん", "ひこう", 
                "むし", "いわ", "ゴースト", "はがね", "ほのお", 
                "みず", "でんき", "くさ", "こおり", "エスパー", 
                "ドラゴン", "あく", "フェアリー"
            ];
            
            // タイプによって着色
            var type_class = [
            	"normal", "fight", "poison", "ground", "flight", 
            	"insect", "rock", "ghost", "steel", "flame", 
            	"water", "elect", "grass", "ice", "psi",
            	"dragon", "evil", "fairy"
            ];

            // 弱点表
			var type_week = [
					// 普,  闘, 毒, 地,  飛, 虫, 岩, 霊,  鋼, 炎, 水, 電,  草, 氷,  超, 龍, 悪, 妖
				/*普*/["1","2","1","1","1","1","1","0","1","1","1","1","1","1","1","1","1","1"],
				/*闘*/["1","1","1","1","2","0.5","0.5","1","1","1","1","1","1","1","2","1","0.5","2"],
				/*毒*/["1","0.5","0.5","2","1","0.5","1","1","1","1","1","1","0.5","1","2","1","1","0.5"],
				/*地*/["1","1","0.5","1","1","1","0.5","1","1","1","2","0","2","2","1","1","1","1"],
				/*飛*/["1","0.5","1","0","1","0.5","2","1","1","1","1","2","0.5","2","1","1","1","1"],
				/*虫*/["1","0.5","1","0.5","2","1","2","1","1","2","1","1","0.5","1","1","1","1","1"],
				/*岩*/["0.5","2","0.5","2","0.5","1","1","1","2","0.5","2","1","2","1","1","1","1","1"],
				/*霊*/["0","0","0.5","1","1","0.5","1","2","1","1","1","1","1","1","1","1","2","1"],
				/*鋼*/["0.5","2","0","2","0.5","0.5","0.5","1","0.5","2","1","1","0.5","0.5","0.5","0.5","1","0.5"],
				/*炎*/["1","1","1","2","1","0.5","2","1","0.5","0.5","2","1","0.5","0.5","1","1","1","0.5"],
				/*水*/["1","1","1","1","1","1","1","1","0.5","0.5","0.5","2","2","0.5","1","1","1","1"],
				/*電*/["1","1","1","2","0.5","1","1","1","0.5","1","1","0.5","1","1","1","1","1","1"],
				/*草*/["1","1","2","0.5","2","2","1","1","1","2","0.5","0.5","0.5","2","1","1","1","1"],
				/*氷*/["1","2","1","1","1","1","2","1","2","2","1","1","1","1","0.5","1","2","1"],
				/*超*/["1","0.5","1","1","1","2","1","2","1","1","1","1","1","1","0.5","1","2","1"],
				/*龍*/["1","2","1","1","1","1","1","1","1","0.5","0.5","0.5","0.5","2","1","2","1","2"],
				/*悪*/["1","2","1","1","1","2","1","0.5","1","1","1","1","1","1","0","1","0.5","2"],
				/*妖*/["1","0.5","2","1","1","0.5","1","1","2","1","1","1","1","1","1","0","0.5","1"]
			];

			var type_style = [];
            var count=0;
            var type_point = [];
            /*
				-タイプの名前とクラスを結び付ける-
				type = DBのタイプ名
				type_name = タイプの日本語名
				type_class = クラス名
				type_style = 適応させるクラス名
				count = 複合タイプの場合
				type_point = タイプの座標(weekに使用)
            */
            do{
		    	for(i=0; i<type_name.length; i++){
					if(type_name[i] === type[count]){
						type_style[count] = type_class[i];
						// 相性計算で使用
						type_point[count] = i;
						break;
					}
				}
				count++;
            }while(type[1] && count <= 1);
            
            /*
				・無効が最も優先される
					・2倍と半減が一緒にあると1倍になる
					・2倍が2つあると4倍になる
					・半減が2つあると1/4倍になる
						・片方が2倍だと2倍になる
						・片方が半減だと半減になる
            */
            var type_week_view = {};
            var t_w_t1 = {};
            var t_w_t2 = {};
            var len_max=0;

            // タイプ1の設定
            setWeekArray(t_w_t1, type_point[0]);
            // タイプ2の設定
            if(type[1]){
				setWeekArray(t_w_t2, type_point[1]);
			}
            // 表示する連想配列に代入
			for(var t1_key in t_w_t1){
				type_week_view[t1_key] = t_w_t1[t1_key];
			}
			for(var t2_key in t_w_t2){
				// 無効があった場合
				if(t_w_t2[t2_key] == 0){
					type_week_view[t2_key] = t_w_t2[t2_key];
				}
				// タイプ1にないタイプがあった場合
				if(type_week_view[t2_key] == undefined){
					type_week_view[t2_key] = t_w_t2[t2_key];
					t_w_t2[t2_key] = 1;
				}
				// 他の計算
				type_week_view[t2_key] = type_week_view[t2_key] * t_w_t2[t2_key];
				// 等倍があれば削除
				if(type_week_view[t2_key] == 1){
					delete type_week_view[t2_key];
				}
			}
			/*未実装
			// 名前を整理
			for(var key in type_week_view){
				alert(type_week_view[0]);
			}
			console.log(type_week_view);
			*/
            // ---END タイプ処理---
            
			//表示
			var link_type1 = document.getElementById("type1");
			var link_type2 = document.getElementById("type2");

    		document.getElementById("name").innerHTML = name;
    		link_type1.innerHTML = type[0];
    		link_type1.className = type_style[0];
    		link_type2.innerHTML = type[1];
    		link_type2.className = type_style[1];
    		link_ability("h", h);
    		link_ability("a", a);
    		link_ability("b", b);
    		link_ability("c", c);
    		link_ability("d", d);
    		link_ability("s", s);
    		link_ability("total", total);
            document.getElementById("sp1").innerHTML = sp1;
            document.getElementById("sp2").innerHTML = sp2;
            document.getElementById("ha").innerHTML = ha;
            

            // 弱点表
            var weekId = document.getElementById("week_detail");
            var weekName = null;
            var weekMeVal = null;
            var weekMeMax = 4;
            // meterの最適領域の計算は、以上では無くより大きい
			var weekMeHigh = 3.9;
			var weekMeLow = 1.9;
			var weekMeOpt = 1;

            for(key in type_week_view){
            	// リストとメータータグの用意
            	var weekLi = document.createElement('li');
            	var weekMe = document.createElement('meter');

            	// 名前の入れ込み
            	weekName = document.createTextNode(key);
            	weekMeVal = document.createTextNode(type_week_view[key]+"倍");

            	// メーターの値を代入
            	weekMe.value = type_week_view[key];
            	weekMe.max = weekMeMax;
            	weekMe.high = weekMeHigh;
            	weekMe.low = weekMeLow;
            	weekMe.optimum = weekMeOpt;

            	// リストタグに要素を代入
            	weekLi.appendChild(weekName);
            	weekLi.appendChild(document.createElement('br'));
            	weekLi.appendChild(weekMe);
            	weekLi.appendChild(document.createElement('br'));
            	weekLi.appendChild(weekMeVal);

            	/*今後使い道があれば
            	if(type_week_view[key] >= 2) {
            		weekLi.className = 'danger';
            	}
            	*/
            	// 表示するIDに代入
            	weekId.appendChild(weekLi);
            }

            // 進化の段階
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

			// ポケモンwikiへのリンク
			var link = document.getElementById("link");
            link.href = "http://wiki.ポケモン.com/wiki/" + pkwiki_link;
    	}

    	/*
			-csvファイルから名前を検索-
			[name_diff]に比較する名前を入力
    	*/
    	function name_judge(name_diff) {
			no = "ERROR";
			for(var i=0; i<data.length; i++){
				if(data[i].Name == name_diff){
		            //配列のindex番号を取得
		            //ポケモンのNOを取得した場合、上の処理で配列の番号を見てしまうので違う場所を参照してしまう
					no = data.indexOf(data[i]);
					break;
				}
			}
			return no;
		}

		/*
			-能力の数値のリンクを出力-
			[id]に出力先を入力
			[num]に数値を入力
		*/
		function link_ability(id, num){
			document.getElementById(id).innerHTML = num;
			document.getElementById(id+"_m").value = num;
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

		/*
			-弱点の配列をセット-
			[name]に変数名を入力
			[count]にフラグの入力
		*/
		function setWeekArray(name, count){
			for(i=0; i<type_week.length; i++){
				// 等倍ではなかったら
				if(type_week[count][i] != 1){
					// タイプの名前 : 倍率
					name[type_name[i]] = type_week[count][i];
				}
			}
			return name;
		}

		/*
			-キャッシュの要素数を取得-
			[ary]に連想配列を入力
		*/
		function getAryLen(ary){
			var s=0;
			for(var t in ary){
				s++;
			}
			return s;
		}
	});
}



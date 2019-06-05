let speed_of_balls	= 1000
// spdba для изменения скорости шаров. в коде не используется
let spdba = function(n){speed_of_balls = (n)
	clearInterval(go_balls)
	go_balls = setInterval(move_balls,speed_of_balls)
	//time_to_lose_Int = setInterval(time_to_lose_func,speed_of_balls)
	time_to_lose = 100000}
let speed_of_bullet	= 20
let rows 			= []
let divs			= []
let bullets			= []
let I 				= []
let crdnt_bullet 	= 0
// крч цвета = [тёмно-зелёный, красный, жёлтый, светло-зелёный, синий, светло-фиолетовый, тёмно-фиолетовый]
let clrs = ["#1e481c","#c11b1b","#e8e90e","#34eb0e","#001da6","#a6009d","#ff8200","#45006d",]
let clrs_rgb = ["rgb(30, 72, 28)","rgb(193, 27, 27)","rgb(232, 233, 14)","rgb(52, 235, 14)","rgb(0, 29, 166)","rgb(166, 0, 157)","rgb(255, 130, 0)","rgb(69, 0, 109)",]
let crdnt_plot = [4547, 4548, 4549, 4446, 4447, 4448, 4449, 4450,] //-600?
let lvl 			= 1
let way_balls 		= []
let permission		= "yep"
let divs_to_ball 	= 0
let a 				= 0
let b 				= 0
let c 				= 0
let rounds 			= {1:[10,20,30],2:[40,50,60],3:[40,55,70]}

for (let i = 0; i < 46; i++) { // создание дивов и придавание им формы
	let row = document.createElement('div');
	rows[i] = row
	document.body.appendChild(row);
	row.style.width = "100%"
	row.style.height = "17px"
	row.style.display = "flex"
	row.style.backgroundColor = ""
	for (let i2 = 0; i2 < 100; i2++) {
		let div = document.createElement('div');
		divs[i2+i*100] = div
		rows[i].appendChild(div);
		div.style.width = "17px"
		div.style.height = "17px"
		div.style.backgroundColor = ""
		div.style.border = "0px solid black"
		if (i < 44) {div.style.borderRadius = "10px"}
		div.innerHTML = ""; //Ø
	}
}
let rndm_clr = function(){
	return Math.round(Math.random()*7)
}
let clr_num 		= rndm_clr() // номер ведущего цвета
let clr 			= clrs[clr_num] // ведущий цвет
let clr_num2 		= rndm_clr() // номер вторичного цвета
let clr2 			= clrs[clr_num2] // вторичный цвет
let bullet_num		= clr_num // номер первой пули
let clr_bullet 		= clr // цвет первой пули
let clr_of_div 		= "transparent" // цвет первого дива
let radius_of_div 	= "10px" // border-radius первого дива на пути пули
let bullet = function(){
	if (permission == "nope") { // если пуля уже запущена
		
	} else { // если пули нет
		crdnt_bullet = crdnt_plot[5] - 100
		bullet_num = clr_num
		clr_bullet = clr
		I_bullet = setInterval(bullet_fly,speed_of_bullet)
		clr_num = clr_num2
		clr = clr2
		clr_num2 = rndm_clr()
		// for (let i = 0; i < 50; i++) {
		// 	if (clrs_in[clr_num2] < 1) {clr_num2 = rndm_clr()} else {break} // эта фигня пока лагает, так что сейчас лучше будет замьючена
		// }
		clr2 = clrs[clr_num2]
		divs[crdnt_plot[5]].style.backgroundColor = clr
		divs[crdnt_plot[0]].style.backgroundColor = clr2
		divs[crdnt_plot[2]].style.backgroundColor = clr2
		permission = "nope"
	}
	
}
let row_balls = 0 // кол-во одинаковых шаров для удаления
let crdnt_start_row = 0 // координаты начала цепи одинаковых шаров для удаления
let levie_crdnt = 0 // используется в случае попадания в недвижущийся ряд чтоб посчитать сколько в нём примерно шаров
let bullet_fly = function(){
	if (a > 0) { // ecли перед пулей был найден шар
		if (a == 2) {  // считает кол-во одинаковых шаров и убирает их 
			round_balls[round] += 1
			clearInterval(I_bullet)
			row_balls = 0
			a = 0
			clr_del = clr_bullet
			way_balls[way_balls_reverse[crdnt_bullet]].style.backgroundColor = clr_bullet
			crdnt_start_row = 0
			clrs_in[bullet_num] += 1
			if (way_balls_reverse[crdnt_bullet] < crdnt_wave2[round]) { // если пуля попала в движущийся ряд шаров
				crdnt_wave2[round] += 1
				for (let i = way_balls_reverse[crdnt_bullet]; i <  crdnt_wave2[round]+1; i+=1) { // считает кол-во одинаковых шаров  вправо
					if (way_balls[i].style.backgroundColor == clrs_rgb[bullet_num]) {row_balls+=1} else {
						break}
				}
				for (let i = way_balls_reverse[crdnt_bullet]-1; i >  crdnt_wave1[round]-1; i-=1) {// считает кол-во одинаковых шаров  влево
					if (way_balls[i].style.backgroundColor == clrs_rgb[bullet_num]) {
						row_balls += 1
						crdnt_start_row += 1
					} else {
						break
					}
				} 
				if (row_balls > 2) { // при ряду больше трёх - убирает шары, смещает конец ряда, добавляет очки и время
					time_to_lose += row_balls*2
					crdnt_start_row = way_balls_reverse[crdnt_bullet] - crdnt_start_row
					if (crdnt_wave1[round] == crdnt_start_row) { //если удалились первые шары, то смещается не конец ряда, а его начало
						crdnt_wave1[round] += row_balls
					} else {
						crdnt_wave2[round] = crdnt_start_row
					}
					for (let i = 0; i < row_balls; i++) {
						way_balls[crdnt_start_row+i].style.backgroundColor = "transparent"
						document.querySelector(".score").innerHTML = Number(document.querySelector(".score").innerHTML) + 100
					}
					clrs_in[bullet_num] -= row_balls
					round_balls[round] -= row_balls
				}
			} else { // пуля попала в недвижущийся ряд шаров
				for (let i = way_balls_reverse[crdnt_bullet]; i < way_balls_reverse[crdnt_bullet]+levie_crdnt+1; i+=1) { // считает кол-во одинаковых шаров  вправо
					if (way_balls[i].style.backgroundColor == clrs_rgb[bullet_num]) {row_balls+=1} else {
						break}
				}
				for (let i = way_balls_reverse[crdnt_bullet]-1; i >  crdnt_wave2[round]; i-=1) {// считает кол-во одинаковых шаров  влево
					if (way_balls[i].style.backgroundColor == clrs_rgb[bullet_num]) {
						row_balls += 1
						crdnt_start_row += 1
					} else {
						break
					}
				} 
				if (row_balls > 2) { // при ряду больше трёх - убирает шары, добавляет очки и время
					time_to_lose += row_balls*2
					crdnt_start_row = way_balls_reverse[crdnt_bullet] - crdnt_start_row
					for (let i = 0; i < row_balls; i++) {
						way_balls[crdnt_start_row+i].style.backgroundColor = "transparent"
						document.querySelector(".score").innerHTML = Number(document.querySelector(".score").innerHTML) + 100
						//clrs_in[bullet_num] -= 1
					}
					clrs_in[bullet_num] -= row_balls
					round_balls[round] -= row_balls
				}
			}
			permission = "yep" // разрешение на запуск пули
			divs[crdnt_bullet+100].style.borderRadius = radius_of_div
			divs[crdnt_bullet+100].style.backgroundColor = clr_of_div
			radius_of_div = "10px"
			clr_of_div = null
		} else { // срабатывает после того, как перед пулей был обнаружен шар. нужен чтоб вставить шар в ряд и все шары перед ним прогнать на позицию вперёд
			if (way_balls_reverse[crdnt_bullet-100] < crdnt_wave2[round]) { // если пуля попала в движущийся ряд шаров
				for (let i = crdnt_wave2[round]+1; i > way_balls_reverse[crdnt_bullet-100]; i-=1) { // сдвиг шаров вправо
					way_balls[i].style.backgroundColor = way_balls[i-1].style.backgroundColor
				}
			} else { // пуля попала в недвижущийся ряд шаров
				levie_crdnt = 0
				for (let i = way_balls_reverse[crdnt_bullet-100]; i < 200; i+=1) { // считает кол-во шаров до конца недвижущегося ряда
					if (way_balls[i].style.backgroundColor == "rgb(196, 196, 196)" || way_balls[i].style.backgroundColor == "transparent" || way_balls[i].style.backgroundColor == "") {break}
					levie_crdnt += 1
				}
				for (let i = way_balls_reverse[crdnt_bullet-100]+levie_crdnt+1; i > way_balls_reverse[crdnt_bullet-100]; i-=1) { // сдвиг шаров вправо
					way_balls[i].style.backgroundColor = way_balls[i-1].style.backgroundColor
				}
			}
			crdnt_bullet -= 100
			a += 1
		}		
	} else { // если у ближайших клеток серый цвет или никакого
		if (crdnt_bullet < 100) { // убирает пулю если она достигла крайней точки сверху
			clearInterval(I_bullet)
			divs[crdnt_bullet].style.backgroundColor = "transparent"
			permission = "yep"
		} else { // продолжает спокойно "лететь"
			divs[crdnt_bullet].style.borderRadius = radius_of_div
			divs[crdnt_bullet].style.backgroundColor = clr_of_div
			if (crdnt_bullet > 200) {
				for (let i = 0; i < clrs.length; i++) { // узнаёт, есть ли перед пулей цветные дивы
					if (divs[crdnt_bullet-200].style.backgroundColor == clrs_rgb[i]) {
						a+=1
						break
					}
				}
			}
			crdnt_bullet -= 100
			radius_of_div = divs[crdnt_bullet].style.borderRadius
			clr_of_div = divs[crdnt_bullet].style.backgroundColor
			divs[crdnt_bullet].style.backgroundColor = clr_bullet
			divs[crdnt_bullet].style.borderRadius = "10px"
		}
	}
}
// раскраска дивов, из которых состоит плот
divs[crdnt_plot[0]].style.backgroundColor = clr2
divs[crdnt_plot[0]].style.borderRadius = "10px"
divs[crdnt_plot[1]].style.backgroundColor = "#555555"
divs[crdnt_plot[1]].style.borderRadius = "0px 0px 10px 10px"
divs[crdnt_plot[2]].style.backgroundColor = clr2
divs[crdnt_plot[2]].style.borderRadius = "10px"
divs[crdnt_plot[3]].style.backgroundColor = "#555555"
divs[crdnt_plot[3]].style.borderRadius = "0px 0px 0px 20px"
divs[crdnt_plot[4]].style.backgroundColor = "#555555"
divs[crdnt_plot[4]].style.borderRadius = "0px 10px 0px 0px"
divs[crdnt_plot[5]].style.backgroundColor = clr
divs[crdnt_plot[5]].style.borderRadius = "10px"
divs[crdnt_plot[6]].style.backgroundColor = "#555555"
divs[crdnt_plot[6]].style.borderRadius = "10px 0px 0px 0px"
divs[crdnt_plot[7]].style.backgroundColor = "#555555"
divs[crdnt_plot[7]].style.borderRadius = "0px 0px 20px 0px"
if (lvl == 1) { 
	// объявление дорожки для движения шаров, раскраска бордюров с помощью циклов
	for (let i=0; i<35; i++) {
		way_balls[i] = 800+i
		divs[800+i].style.backgroundColor = ""
		if (i<33) {divs[864+i].style.backgroundColor = ""
		if (i<33) {way_balls[i+245] = 865+i}
		divs[765+i].style.backgroundColor = "#c4c4c4"
		divs[765+i].style.borderRadius = "0px"}
		if (i<31) {divs[966+i].style.backgroundColor = "#c4c4c4"
		divs[966+i].style.borderRadius = "0px"}
		if (i<34) {divs[900+i].style.backgroundColor = "#c4c4c4"
		divs[900+i].style.borderRadius = "0px"}
		divs[700+i].style.backgroundColor = "#c4c4c4"
		divs[700+i].style.borderRadius = "0px"
	}
	for (let i=0; i<10; i++) {
		divs[934+i*100].style.backgroundColor = ""
		way_balls[i+35] = 934+i*100
		divs[1909+i*100].style.backgroundColor = ""
		way_balls[i+70] = 1909+i*100
		divs[2890-i*100].style.backgroundColor = ""
		way_balls[i+200] = 2890-i*100
		divs[1865-i*100].style.backgroundColor = ""
		way_balls[i+235] = 1865-i*100
		divs[935+i*100].style.backgroundColor = "#c4c4c4"
		divs[935+i*100].style.borderRadius = "0px"
		if (i<8) {divs[933+i*100].style.backgroundColor = "#c4c4c4"
		divs[933+i*100].style.borderRadius = "0px"}
		divs[964+i*100].style.backgroundColor = "#c4c4c4"
		divs[964+i*100].style.borderRadius = "0px"
		if (i<8) {divs[966+i*100].style.backgroundColor = "#c4c4c4"
		divs[966+i*100].style.borderRadius = "0px"}
		divs[1908+i*100].style.backgroundColor = "#c4c4c4"
		divs[1908+i*100].style.borderRadius = "0px"
		if (i<8) {divs[1910+i*100].style.backgroundColor = "#c4c4c4"
		divs[1910+i*100].style.borderRadius = "0px"}
		divs[1991+i*100].style.backgroundColor = "#c4c4c4"
		divs[1991+i*100].style.borderRadius = "0px"
		if (i<8) {divs[1989+i*100].style.backgroundColor = "#c4c4c4"
		divs[1989+i*100].style.borderRadius = "0px"}	
	}
	for (let i=0; i<25; i++) {
		divs[1833-i].style.backgroundColor = ""
		way_balls[i+45] = 1833-i
		divs[1890-i].style.backgroundColor = ""
		way_balls[i+210] = 1890-i
		divs[1989-i].style.backgroundColor = "#c4c4c4"
		divs[1989-i].style.borderRadius = "0px"
		divs[1790-i].style.backgroundColor = "#c4c4c4"
		divs[1790-i].style.borderRadius = "0px"
		divs[1910+i].style.backgroundColor = "#c4c4c4"
		divs[1910+i].style.borderRadius = "0px"
		divs[1709+i].style.backgroundColor = "#c4c4c4"
		divs[1709+i].style.borderRadius = "0px"
	}
	for (let i=0; i<34; i++) {
		divs[2810+i].style.backgroundColor = ""
		way_balls[i+80] = 2810+i
		divs[2856+i].style.backgroundColor = ""
		way_balls[i+166] = 2856+i
		divs[2910+i].style.backgroundColor = "#c4c4c4"
		divs[2910+i].style.borderRadius = "0px"
		divs[2710+i].style.backgroundColor = "#c4c4c4"
		divs[2710+i].style.borderRadius = "0px"
		divs[2789-i].style.backgroundColor = "#c4c4c4"
		divs[2789-i].style.borderRadius = "0px"
		divs[2989-i].style.backgroundColor = "#c4c4c4"
		divs[2989-i].style.borderRadius = "0px"
	}
	for (let i=0; i<21; i++) {
		divs[2844-i*100].style.backgroundColor = ""
		way_balls[i+114] = 2844-i*100
		divs[855+i*100].style.backgroundColor = ""
		way_balls[i+145] = 855+i*100
		divs[2945-i*100].style.backgroundColor = "#c4c4c4"
		divs[2945-i*100].style.borderRadius = "0px"
		divs[2743-i*100].style.backgroundColor = "#c4c4c4"
		divs[2743-i*100].style.borderRadius = "0px"
		divs[2954-i*100].style.backgroundColor = "#c4c4c4"
		divs[2954-i*100].style.borderRadius = "0px"
		divs[2756-i*100].style.backgroundColor = "#c4c4c4"
		divs[2756-i*100].style.borderRadius = "0px"

	}
	for (let i=0; i<10; i++) {
		divs[845+i].style.backgroundColor = ""
		way_balls[i+135] = 845+i
		divs[945+i].style.backgroundColor = "#c4c4c4"
		divs[945+i].style.borderRadius = "0px"
		divs[745+i].style.backgroundColor = "#c4c4c4"
		divs[745+i].style.borderRadius = "0px"
	}
	// раскраска отдельных дивов, которые нее получилось покрасить циклами (и где-то там ещё раскраска конечной точки для шаров("храма"))
	divs[735].style.backgroundColor = "#c4c4c4"
	divs[735].style.borderRadius = "0px"
	divs[744].style.backgroundColor = "#c4c4c4"
	divs[744].style.borderRadius = "0px"
	divs[755].style.backgroundColor = "#c4c4c4"
	divs[755].style.borderRadius = "0px"
	divs[764].style.backgroundColor = "#c4c4c4"
	divs[764].style.borderRadius = "0px"
	divs[835].style.backgroundColor = "#c4c4c4"
	divs[835].style.borderRadius = "0px"
	divs[864].style.backgroundColor = "#c4c4c4"
	divs[864].style.borderRadius = "0px"
	divs[1935].style.backgroundColor = "#c4c4c4"
	divs[1935].style.borderRadius = "0px"
	divs[1964].style.backgroundColor = "#c4c4c4"
	divs[1964].style.borderRadius = "0px"
	divs[1708].style.backgroundColor = "#c4c4c4"
	divs[1708].style.borderRadius = "0px"
	divs[1791].style.backgroundColor = "#c4c4c4"
	divs[1791].style.borderRadius = "0px"
	divs[1808].style.backgroundColor = "#c4c4c4"
	divs[1808].style.borderRadius = "0px"
	divs[1891].style.backgroundColor = "#c4c4c4"
	divs[1891].style.borderRadius = "0px"
	divs[2908].style.backgroundColor = "#c4c4c4"
	divs[2908].style.borderRadius = "0px"
	divs[2909].style.backgroundColor = "#c4c4c4"
	divs[2909].style.borderRadius = "0px"
	divs[2944].style.backgroundColor = "#c4c4c4"
	divs[2944].style.borderRadius = "0px"
	divs[2955].style.backgroundColor = "#c4c4c4"
	divs[2955].style.borderRadius = "0px"
	divs[2990].style.backgroundColor = "#c4c4c4"
	divs[2990].style.borderRadius = "0px"
	divs[2991].style.backgroundColor = "#c4c4c4"
	divs[2991].style.borderRadius = "0px"
	divs[799].style.backgroundColor = "#555555"
	divs[799].style.borderRadius = "0px"
	divs[798].style.backgroundColor = "#555555"
	divs[798].style.borderRadius = "0px"
	divs[797].style.backgroundColor = "#555555"
	divs[797].style.borderRadius = "0px"
	divs[899].style.backgroundColor = "#555555"
	divs[899].style.borderRadius = "0px"
	divs[898].style.backgroundColor = "#555555"
	divs[898].style.borderRadius = "0px"
	divs[897].style.backgroundColor = "#e6c830"
	divs[897].style.borderRadius = "0px"
	divs[999].style.backgroundColor = "#555555"
	divs[999].style.borderRadius = "0px"
	divs[998].style.backgroundColor = "#555555"
	divs[998].style.borderRadius = "0px"
	divs[997].style.backgroundColor = "#555555"
	divs[997].style.borderRadius = "0px"
}
let way_balls_reverse = [] 
for (let i = 0; i < way_balls.length; i++) {
	way_balls_reverse[way_balls[i]] = i // номер в дорожке для шаров = way_balls_reverse[номер из всех дивов]
	way_balls[i] = divs[way_balls[i]] // присвоение дивов, а не чисел
}
let round 			= 0
let round_balls 	= [10,20,30] // подсчёт шаров
let crdnt_wave1 	= [0,0,0] // координаты начала ряда шаров (массив - для последующего расширения игры, которого сейчас нет)
let crdnt_wave2 	= [0,0,0] // координаты конца ряда шаров
let spawned         = [0,0,0] // кол-во заспавненых шаров
let clr_ball
let clr_ball_num 	= 0
let clrs_in 		= [0,0,0,0,0,0,0,0] // подсчёт количества шаров каждого цвета в ряду, но он почему-то криво работает
let aim1 = function(){ // эта и следующая функции нужны для прицеливания
	for (let i = 1; i < divs_to_ball+1; i++) {
		if (divs[crdnt_plot[5]-i*100].style.backgroundColor == "rgb(223, 223, 223)") {divs[crdnt_plot[5]-i*100].style.backgroundColor = "transparent"}
	}
	divs_to_ball = 0
	c = 0
}
let aim2 = function(){
	b = crdnt_plot[5] - 100
	for (let i = 0; i < 43; i++) {
		if (divs[b].style.backgroundColor == "rgb(196, 196, 196)" || divs[b].style.backgroundColor == "" || divs[b].style.backgroundColor == "transparent") {divs_to_ball += 1}
		for (let i = 0; i < clrs.length; i++) {
			if (divs[b].style.backgroundColor == clrs_rgb[i]) {
				c+=1
				break
			}
		}
		if (c>0) {break}
		b -= 100
	}
	for (let i = 1; i < divs_to_ball+1; i++) {
		if (divs[crdnt_plot[5]-i*100].style.backgroundColor == "" || divs[crdnt_plot[5]-i*100].style.backgroundColor == "transparent") {divs[crdnt_plot[5]-i*100].style.backgroundColor = "#dfdfdf"}
	}
}
let lose
let lose_delete_balls = function(){ // запускается при достигании шарами конечной точки ("храма")
	for (let i = crdnt_wave2[round]-1; i > crdnt_wave1[round]; i-=1) {
		way_balls[crdnt_wave1[round]].style.backgroundColor = "transparent"
		way_balls[i].style.backgroundColor = way_balls[i-1].style.backgroundColor
	}
	crdnt_wave1[round] += 1
	if (crdnt_wave1[round] == crdnt_wave2[round]) {
		clearInterval(lose)
		for (let i = 0; i < divs.length; i++) {
			divs[i].style.display = "none"
		}
		document.querySelector(".lose").style.display = "block"
	}
}
let row_balls_reunion = 0
let crdnt_start_row_reunion = 0
let move_balls = function(){ // движение шаров
	for (let i = crdnt_wave2[round]; i > crdnt_wave1[round]; i-=1) { // сдвиг вправо
		way_balls[i].style.backgroundColor = way_balls[i-1].style.backgroundColor
	}
	if (spawned[round] >= rounds[lvl][round]) {way_balls[crdnt_wave1[round]].style.backgroundColor = "transparent"} // если заспавнено достаточно, то новые уже не спавнятся
	clr_ball_num = rndm_clr()
	clr_ball = clrs[clr_ball_num]
	crdnt_wave2[round] += 1
	if (spawned[round] < rounds[lvl][round]) { // если заспавнено недостаточно, то спавнятся новые шары. в противном случае координаты начала ряда увеличиваются
		way_balls[0].style.backgroundColor = clr_ball
		spawned[round] += 1
		clrs_in[clr_ball_num]+=1 // добавление цвета в тот самый массив (см. строку 380) // да-да который не работает
	} else {
		crdnt_wave1[round] += 1
	}
	if (crdnt_wave2[round] == way_balls.length-1) { // при достигании "храма" запускается функция проигрыша
		clearInterval(go_balls)
		lose = setInterval(lose_delete_balls,10)
	} else if (way_balls[crdnt_wave2[round]].style.backgroundColor != "transparent" && way_balls[crdnt_wave2[round]].style.backgroundColor != "" && way_balls[crdnt_wave2[round]].style.backgroundColor != "rgb(223, 223, 223)") {
		// если видит цветной див перед рядом шаров, считает его длину и добавляет к основному ряду
		//if (way_balls[crdnt_wave2[round]].style.backgroundColor == way_balls[crdnt_wave2[round]-1].style.backgroundColor) { // если соединившиеся шары одного цвета


			/*row_balls_reunion = 0
			crdnt_start_row_reunion = 0
			for (let i = crdnt_wave2[round]; i < 200; i+=1) { // считает кол-во одинаковых шаров  вправо
				if (way_balls[i].style.backgroundColor == way_balls[crdnt_wave2[round]].style.backgroundColor) {
					row_balls_reunion+=1
				} else {
					break
				}
			}
			for (let i = crdnt_wave2[round]-1; i > crdnt_wave1[round]; i-=1) {// считает кол-во одинаковых шаров  влево
				if (way_balls[i].style.backgroundColor == clrs_rgb[bullet_num]) {
					row_balls_reunion += 1
					crdnt_start_row_reunion += 1
				} else {
					break
				}
			}
			if (row_balls_reunion > 2) {
				time_to_lose += row_balls*2
				crdnt_wave2[round] = crdnt_wave2[round] - crdnt_start_row_reunion
				for (let i = 0; i < row_balls; i++) {
					way_balls[crdnt_start_row+i].style.backgroundColor = "transparent"
					document.querySelector(".score").innerHTML = Number(document.querySelector(".score").innerHTML) + 100
				}
				clrs_in[bullet_num] -= row_balls
				round_balls[round] -= row_balls
			}*/


		//} else {
			crdnt_wave2[round] += 1
			for (let i = 0; i < 200; i++) {
				if (way_balls[crdnt_wave2[round]].style.backgroundColor == "transparent" || way_balls[crdnt_wave2[round]].style.backgroundColor == "" || way_balls[crdnt_wave2[round]].style.backgroundColor == "rgb(223, 223, 223)") {
					break
				}
				crdnt_wave2[round] += 1
			}
		//}
	}
	if (round_balls[round] < 1) { // условие победы в раунде и общей победе
		time_to_lose += 60
		round+=1
		document.querySelector(".round").innerHTML = Number(document.querySelector(".round").innerHTML) + 1
		if (round > 2) {
			clearInterval(go_balls)
			for (let i = 0; i < divs.length; i++) {
				divs[i].style.display = "none"
			}
			document.querySelector(".win").style.display = "block"
		}
	}
	aim1()
	aim2()

}

let go_balls = setInterval(move_balls,speed_of_balls)
let time_to_lose = 60 
// let time_to_lose_func = function(){ // таймер и условие проигрыша при истекании времени. я его замьютил т.к. он мне не нравится
// 	time_to_lose -= 1
// 	document.querySelector(".time").innerHTML = time_to_lose

// 	if (time_to_lose == 0) {
// 		clearInterval(lose)
// 		clearInterval(time_to_lose_Int)
// 		for (let i = 0; i < divs.length; i++) {
// 			divs[i].style.display = "none"
// 		}
// 		document.querySelector(".lose").style.display = "block"
// 	}
// }
// let time_to_lose_Int = setInterval(time_to_lose_func,speed_of_balls)
document.body.onkeydown = function(e){ // отключение прокрутки страницы по стрелкам
e = e || window.event;
var c = e.keyCode;
if(c>36 && c<41 || c>32 && c<37) return false;
}

addEventListener("keydown", function(event) { // нажатие на стрелки
    if (event.keyCode == 38) { // запуск алгоритма стрельбы
        bullet()
    } else if (event.keyCode == 40) { // изменение цвета
    	c = clr_num2
    	clr_num2 = clr_num
    	clr_num = c
    	clr = divs[crdnt_plot[0]].style.backgroundColor
    	clr2 = divs[crdnt_plot[5]].style.backgroundColor
    	divs[crdnt_plot[0]].style.backgroundColor = divs[crdnt_plot[5]].style.backgroundColor
    	divs[crdnt_plot[5]].style.backgroundColor = divs[crdnt_plot[2]].style.backgroundColor
    	divs[crdnt_plot[2]].style.backgroundColor = divs[crdnt_plot[0]].style.backgroundColor
    } else if (event.keyCode == 37) { // движение влево
    	if (crdnt_plot[3] > 4400) {
    		aim1()
	        for (let i = 0; i < 8; i++) {
	        	divs[crdnt_plot[i]].style.backgroundColor = "transparent"
	        	crdnt_plot[i]-=1
	        }
	        divs[crdnt_plot[0]].style.backgroundColor = clr2
			divs[crdnt_plot[0]].style.borderRadius = "10px"
			divs[crdnt_plot[1]].style.backgroundColor = "#555555"
			divs[crdnt_plot[1]].style.borderRadius = "0px 0px 10px 10px"
			divs[crdnt_plot[2]].style.backgroundColor = clr2
			divs[crdnt_plot[2]].style.borderRadius = "10px"
			divs[crdnt_plot[3]].style.backgroundColor = "#555555"
			divs[crdnt_plot[3]].style.borderRadius = "0px 0px 0px 20px"
			divs[crdnt_plot[4]].style.backgroundColor = "#555555"
			divs[crdnt_plot[4]].style.borderRadius = "0px 10px 0px 0px"
			divs[crdnt_plot[5]].style.backgroundColor = clr
			divs[crdnt_plot[5]].style.borderRadius = "10px"
			divs[crdnt_plot[6]].style.backgroundColor = "#555555"
			divs[crdnt_plot[6]].style.borderRadius = "10px 0px 0px 0px"
			divs[crdnt_plot[7]].style.backgroundColor = "#555555"
			divs[crdnt_plot[7]].style.borderRadius = "0px 0px 20px 0px"
			aim2()
    	}
    } else if (event.keyCode == 39) {
    	if (crdnt_plot[7] < 4499) { // движение вправо
    		aim1()
	        for (let i = 0; i < 8; i++) {
	        	divs[crdnt_plot[i]].style.backgroundColor = "transparent"
	        	crdnt_plot[i]+=1
	        }
	        divs[crdnt_plot[0]].style.backgroundColor = clr2
			divs[crdnt_plot[0]].style.borderRadius = "10px"
			divs[crdnt_plot[1]].style.backgroundColor = "#555555"
			divs[crdnt_plot[1]].style.borderRadius = "0px 0px 10px 10px"
			divs[crdnt_plot[2]].style.backgroundColor = clr2
			divs[crdnt_plot[2]].style.borderRadius = "10px"
			divs[crdnt_plot[3]].style.backgroundColor = "#555555"
			divs[crdnt_plot[3]].style.borderRadius = "0px 0px 0px 20px"
			divs[crdnt_plot[4]].style.backgroundColor = "#555555"
			divs[crdnt_plot[4]].style.borderRadius = "0px 10px 0px 0px"
			divs[crdnt_plot[5]].style.backgroundColor = clr
			divs[crdnt_plot[5]].style.borderRadius = "10px"
			divs[crdnt_plot[6]].style.backgroundColor = "#555555"
			divs[crdnt_plot[6]].style.borderRadius = "10px 0px 0px 0px"
			divs[crdnt_plot[7]].style.backgroundColor = "#555555"
			divs[crdnt_plot[7]].style.borderRadius = "0px 0px 20px 0px"
			aim2()
		}
    }
})


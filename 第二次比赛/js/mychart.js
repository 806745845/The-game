	
	/*
	 * 功能：改变表格数据
	 * 参数：arrNum: 数据数组  arrText: 名称数组  tabID: table的ID名
	 * 负责人：吴肖琪
	 * demo：tab(dataNum, dataText, "tab");
	 */
	function tab(arrNum, arrText, tabID) {

		var dataNum = arrNum;
		var dataText = arrText;
		var tab = document.getElementById(tabID);
		var th = tab.getElementsByTagName("tr")[0].getElementsByTagName('th');
		var td = tab.getElementsByTagName("tr")[1].getElementsByTagName('td');
    var sum = 0;
		for (var i = 0; i < dataText.length; i++) {
			th[i].innerHTML = dataText[i];
		}
		for (var i = 0; i < dataNum.length; i++) {
			td[i].innerHTML = dataNum[i];
		}
	}

	/*
	 * 功能：画折线图
	 * 参数：arrNum: 数据数组  arrText: 名称数组  canvasID: canvas的ID名  jumpNum: 单位间隔
	 * color1: 起始颜色  color2: 结束颜色
	 * demo: drawLine(dataNum, dataText, "gan", 200, "white", "black");
	 * 负责人：吴肖琪
	 */	
	function drawLine (arrNum, arrText, canvasID, jumpNum, color1, color2) {

		var dataNum = arrNum;
		var dataText = arrText;
		var draw = document.getElementById(canvasID);
		var fox = draw.getContext("2d");
		draw.width = draw.parentNode.clientWidth;
		draw.height =  draw.parentNode.clientHeight;
		// 画横线
		fox.moveTo(25, draw.height - 20);
		fox.lineTo(draw.width, draw.height - 20);
		fox.strokeStyle = "skyblue";
		fox.lineWidth = 2;
		fox.stroke();
		// 画竖线
		fox.moveTo(25, draw.height - 20);
		fox.lineTo(25, 0);
		fox.strokeStyle = "skyblue";
		fox.lineWidth = 2;
		fox.stroke();
		// 定原点数字
		fox.fillText( "0", 10, draw.height - 15, 20);
		// 定竖坐标数字
		for (var i = 1; i <= 5; i++) {
			fox.beginPath();
			fox.fillText( "" + i * jumpNum + "", 0, draw.height - 15 - (40 * i));
			fox.moveTo(25, draw.height - 20 - (40 * i));
			fox.lineTo(draw.width, draw.height - 20 - (40 * i));
			fox.strokeStyle = "#ccc";
			fox.lineWidth = 1;
			fox.stroke();
		}
		// 定横坐标内容
		for (var i = 1; i <= dataText.length; i++) {
			fox.beginPath();
			fox.fillText( "" + dataText[i - 1] + "",  i * 50, draw.height - 5);
		}
		var timer = setInterval(change, 500);
		var mark = 0;
		function change() {
			if (mark + 1 < dataNum.length) {				
				fox.beginPath();
				fox.moveTo((mark + 1) * 48 + 25, draw.height - 20 - dataNum[mark] / jumpNum * 40);
				fox.lineTo((mark + 2) * 48 + 25, draw.height - 20 - dataNum[mark + 1] / jumpNum * 40);
				var grd = fox.createLinearGradient((mark + 1) * 48 + 25, draw.height - 20 - dataNum[mark] / jumpNum * 40, (mark + 2) * 48 + 25, draw.height - 20 - dataNum[mark + 1] / jumpNum * 40);
				grd.addColorStop(0, color1);
				grd.addColorStop(1, color2);
				fox.strokeStyle = grd;
				fox.lineWidth = 1;
				fox.stroke();
				mark++;
			} else {
				clearInterval(timer);
				// 折线连接的小圆点
				for (var i = 1; i < dataNum.length - 1; i++) {
					fox.beginPath();
					fox.arc((i + 1) * 48 + 25, draw.height - 20 - dataNum[i] / jumpNum * 40, 3, 0,Math.PI * 2, true);
					fox.fillStyle = "white";
					fox.fill();
					fox.strokeStyle = "black";
					fox.stroke();
				} 
			}	
		} 
	}

	/*
	 * 功能：画柱形图
	 * 参数：value：数据  day：天数  id：canvasID
	 * demo: DataShow(data, infor,'myCanvas');
	 * 负责人：陈少伟
	 */
	 function DataShow(value,day,id) {       
          var canvas = document.getElementById(id);    
          var context = canvas.getContext("2d"); 
          var graTimer = null; 
          var textTimer = null;  
          context.fillStyle = "#cfc";
          //方位，大小 
          context.fillRect(0, 0, canvas.width, canvas.height);     
          var realheight = canvas.height - 20;    
          var realwidth = canvas.width - 34;    
          // 描绘边框    
          var grid_cols = value.length + 1;      
          var widthX = realwidth / grid_cols;
          var heightY = realheight;         
          //x轴和y轴 开始进行描绘
          context.beginPath();    
          //起始坐标
          context.moveTo(0,realheight); 
          //终点坐标   
          context.lineTo(realwidth,realheight); 
          context.lineWidth = 2;
          context.strokeStyle = "#000";   
          context.stroke();       
          //y轴 
          context.beginPath();    
          context.moveTo(1,20);    
          context.lineTo(1,realheight);    
          context.lineWidth = 2;    
          context.strokeStyle = "#000";  
          context.stroke();  
          var max_num = 0;              
          for(var i = 0; i < value.length; i++) {
            if (value[i] > max_num) {
              max_num = value[i];
            }
          }
          // 将数据转换为坐标值  
          var data_con = [];    
          for(var i = 0; i < value.length; i++) {    
            var v = value[i]; 
            var px = widthX * (i + 1); 
            var py = realheight - realheight * (v / max_num * 0.8);  
            data_con.push({
              "x" : px,
              "y" : py
            }); 
          } 
          //绘制坐标图形            
          var graShow = 0; 
          var show;
          function graDis() {
            graShow++;
            if (graShow >= value.length) {
              clearInterval(graTimer);
            }
            show = data_con[graShow - 1];    
            context.beginPath();    
            context.fillStyle = "red";  
            context.fillRect(show.x + 8, show.y, 30, realheight - show.y);
            context.fill(); 
          }
          graTimer = setInterval(graDis, 50);
          //添加文字    
          var graText = 0;
          var p;  
          function textShow() {
            if (graText >= value.length - 1) {
              clearInterval(textTimer);
            }
            p = data_con[graText];    
            context.beginPath();    
            context.fillStyle="black";
            //横纵坐标的内容； 
            context.fillText('天数',realwidth + 2,realheight + 10);    
            context.fillText('销售量', 4, 15);      
            context.fillText(value[graText], p.x + 6, p.y - 6);    
            context.fillText(day[graText],p.x,realheight + 12);
            graText++;
          } 
          textTimer = setInterval(textShow, 50);         
    } 

    /*
     * 功能：将从表单获取的数据，自动生成一个饼状图
     * 参数：canvasId: canvas的ID名,
     *       dataArr: 存储数据的数组,
     *        colorArr: 存储相应每一天比例的颜色,
     *        textArr: 饼状图颜色注释
     * 负责人：刘朝岳
     */
    function drawCircle(canvasId, dataArr, colorArr, textArr) {  
        var canvas = document.getElementById(canvasId);   
        var canvastx = canvas.getContext("2d");
        var radius = canvas.height / 2 - 18; // 半径  
        var ox = radius + 20, 
        	  oy = radius + 20; // 圆心  
        var width  = 30,
            height = 8; // 图例宽和高 
        var posX = ox * 2 + 20, 
        	  posY = 30;     
        var textX = posX + width + 5,
        	  textY = posY + 8;  
        var startAngle = 0; // 起始弧度  
        var endAngle = 0;   // 结束弧度  
        for (var i = 0; i < dataArr.length; i++) {  
            // 绘制饼图  
            endAngle = endAngle + dataArr[i] * Math.PI * 2; // 结束弧度  
            canvastx.fillStyle = colorArr[i];  
            canvastx.beginPath();  
            canvastx.moveTo(ox, oy); // 移动到到圆心  
            canvastx.arc(ox, oy, radius, startAngle, endAngle, false);  
            canvastx.closePath();  
            canvastx.fill();
            startAngle = endAngle; // 设置起始弧度  
            // 绘制比例图及文字  
            canvastx.fillStyle = colorArr[i];  
            canvastx.fillRect(posX, posY + 18 * i, width, height);  
            canvastx.moveTo(posX, posY + 18 * i);  
            canvastx.font = 'bold 12px 微软雅黑'; 
            canvastx.fillStyle = colorArr[i];
            var percent = textArr[i] + "：" + parseFloat((100 * dataArr[i]).toFixed(2)) + "%";  
            canvastx.fillText(percent, textX, textY + 18 * i);  
        }  
    }  

var visibleArea={"width":0,"height":0,"top":VIEW_OFFSET_TOP,"left":VIEW_OFFSET_LEFT,"right":0,"bottom":0,"xRacio":1,"yRacio":1};
function getCurrentVisibleArea(){
	var viewWidth =document.documentElement.clientWidth;
	var viewHeight =document.documentElement.clientHeight;
	var scrollTop =window.pageYOffset;//document.body.scrollTop;
	var scrollLeft =window.pageXOffset;//document.body.scrollLeft;
	scrollTop = scrollTop>VIEW_OFFSET_TOP ? scrollTop : VIEW_OFFSET_TOP;
	scrollLeft = scrollLeft>VIEW_OFFSET_LEFT?scrollLeft : VIEW_OFFSET_LEFT;
	visibleArea.width=viewWidth;
	visibleArea.height=viewHeight;
	visibleArea.top=scrollTop;
	visibleArea.left=scrollLeft;
	visibleArea.right=scrollLeft+viewWidth;
	visibleArea.bottom=scrollTop+viewHeight;
	var condition=currentWday+currentMap;
	visibleArea.xRacio = ComiketMapImagePath[condition+MAP_WIDTH_SD]/mapSizeWidth;
	visibleArea.yRacio = ComiketMapImagePath[condition+MAP_HEIGHT_SD]/mapSizeHeight;
	
	return visibleArea;
}
var timeLoading;
function changeView(event){
	nowLoadingDiv.css("display","block");
	currentWday = event.data.wday===undefined?currentWday:event.data.wday;
	currentMap = event.data.map===undefined?currentMap:event.data.map;
	var index = event.data.index;
	if(event.data.map===undefined){
		for(var j=1;j<=dayCount;j++){
			doUnselectedWday($("#wday"+j));
		}
		doSelectedWday($("#wday"+index));
	}else{
		for(var i=1;i<=mapCount;i++){
			doUnselectedArea($("#area"+i));
		}
		doSelectedArea($("#area"+index));
	}
	$(".selectCircle").css("display","none");
	var condition=currentWday+currentMap;
	timeLoading = window.setInterval ( "viewInitMap('"+condition+"')", 100 );
}

function doSelectedWday(self){
	self.removeClass("wdayChildren");
	self.addClass("wdayChildren Selected");
}
function doUnselectedWday(self){
	self.removeClass("wdayChildren Selected");
	self.addClass("wdayChildren");
}

function doSelectedArea(self){
	self.removeClass("areasChiled");
	self.addClass("areasChiled Selected");
}
function doUnselectedArea(self){
	self.removeClass("areasChiled Selected");
	self.addClass("areasChiled");
}
function setDayString(){
	currentWday+currentMap;
}

function nowLoading(){
	//アニメーションスピード
	var scrollSpeed = 1;
	//画像サイズ
	var imgWidth = 500;
	//画像の位置
	var posX = 0;
	//ループ処理
	nowLoadingTimer = setInterval(
		function(){
		//画像のサイズまで移動したら0に戻る。
		if (posX >= imgWidth){
			posX= 0;
		}
		posX += scrollSpeed;
		$('body').css("background-position",posX+"px 0");
	}, 1);
}

var ViewCurrentMap = function(){
	this.isVisible=false;
	this.isBuilted=false;
	this.map=$("#currentMapView");
	this.top	=(this.map.css("top").match(/([0-9]+)[a-zA-Z]*/)||[])[1];
	this.left	=(this.map.css("left").match(/([0-9]+)[a-zA-Z]*/)||[])[1];
	this.map.attr("firstTop",this.top);
	this.map.attr("firstLeft",this.left);
}
ViewCurrentMap.prototype={
	toggleView:function(event){
		var self= event.data.self;
		var button= event.data.button;
		if(self.isBuilted){
			if(self.isVisible){
				self.toInvisible(self,button);
			}else{
				self.toVisible(self,button);
			}
		}else{
			self.builtView(self,button);
			self.toVisible(self,button);
		}
	},
	builtView:function(self){
		var condition=currentWday+currentMap;
		var width = ComiketMapImagePath[condition+MAP_WIDTH_SD];
		var height = ComiketMapImagePath[condition+MAP_HEIGHT_SD];
		var path1 = ComiketMapImagePath[condition+MAP_PREFIX_LD];
		var path2 = ComiketMapImagePath[condition+MAP_PREFIX_GENRE_LD];
		//alert(condition);
		var currentMapObj =self.map.append("<img src='"+path2+"' width='"+width+"' height='"+height+"'><img src='"+path1+"' width='"+width+"' height='"+height+"'><div id='viewaAreaSquare' />")
			.css("width",width).css("height",height).css("right",0);
		currentMapObj.children("img:last").css("top",-1*height-MAP_VIEW_ADJUST_Y_PX);
		currentMapObj.unbind("click");
		currentMapObj.children().unbind("click");
		self.isBuilted=true;
		self.isVisible=true;
		self.showViewArea({"data":{"self":self}});
		currentMapObj.unbind("click");
		currentMapObj.bind("click",{"self":self},self.geToTheClickPoint);
	},
	changePlace:function(event){
		var self= event.data.self;
		
		self.map.children("img").remove();
		self.map.children("div").remove();
		self.isBuilted=false;
		self.builtView(self);
		self.showViewArea(event);
	},
	showViewArea:function(event){
		var self= event.data.self;
		var viewArea = getCurrentVisibleArea();
		if(self.isVisible){
			var condition=currentWday+currentMap;
			var heightMap = ComiketMapImagePath[condition+MAP_HEIGHT_SD];
			var target = self.map.children("div");
			var width=viewArea.width*viewArea.xRacio;
			var height=viewArea.height*viewArea.yRacio;
			var top=viewArea.top*viewArea.yRacio;
			var left=viewArea.left*viewArea.xRacio;
			target.css("width",width).css("height",height).css("top",top-(2*heightMap)-MAP_VIEW_ADJUST_Y_PX*2).css("left",left);
		}
	},
	toVisible:function(self,button){
		button.removeClass("mapChild");
		button.addClass("mapChild Selected");
		self.map.css("display","block");
		//alert("toVisible");
		self.isVisible=true;
		self.showViewArea({"data":{"self":self}});
	},
	toInvisible:function(self,button){
		button.removeClass("mapChild Selected");
		button.addClass("mapChild");
		self.map.css("display","none");
		//alert("toInvisible");
		self.isVisible=false;
	},
	geToTheClickPoint:function(event){
		var self= event.data.self;
		var hx = event.clientX;
        var hy = event.clientY;
		var viewArea = getCurrentVisibleArea();
        var p = self.map.position();
        var top = (hy - self.top)/viewArea.yRacio-(visibleArea.height)/2;
        var left = (hx - self.left)/viewArea.xRacio-(visibleArea.width)/2;
        $('html,body').animate({ scrollTop: top ,scrollLeft: left}, 'fast');
	}
}

var ViewCircleDetail=function(circleDetailObj){
	this.circleDetailObj=circleDetailObj;
	this.isVisible=false;
	this.detailDay=$("#detailDay");
	this.detailSpace=$("#detailSpace");
	this.detailCName=$("#detailCName");
	this.detailPronouce=$("#detailPronouce");
	this.detailPN=$("#detailPN");
	this.detailBook=$("#detailBook");
	this.detailPR=$("#detailPR");
	this.detailURL=$("#detailURL");
	this.detailMail=$("#detailMail");
	this.detailURLsale=$("#detailURLsale");
	this.detailURLcm=$("#detailURLcm");
	this.currentDetail=$("#currentDetail");
	this.selectCircle=$("#selectCircle").css("width",CUT_WIDTH_LD).css("height",CUT_HEIGHT_LD);
	this.isBuilded=false;
}
ViewCircleDetail.prototype={
	setDetail:function(event){
		var self = event.data.self;
		var cObj = event.data.cObj;
		addViewDetailHistory(cObj);
		if(cObj.vdhlObj.isVisible==true ){
			cObj.vdhlObj.setDetail({"data":{"self":cObj.vdhlObj,"cObj":cObj}});
		}
		circleDetailObj.children("img").attr("src",cObj.getHDfileName(cObj));
		self.detailDay.text(cObj.getAreaCondition());
		self.detailSpace.html(cObj.getAddress()+"<br />"+cObj.getAB());
		self.detailCName.text(cObj.getName());
		self.detailPronouce.text(cObj.getNameKana());
		self.detailPN.text(cObj.getTop());
		self.detailBook.text(cObj.getBook());
		self.detailPR.text(cObj.getDetail());
		self.tolggeIconEnable(self.detailURL,cObj.getURL());
		self.tolggeIconEnable(self.detailMail,cObj.getMail());
		self.tolggeIconEnable(self.detailURLsale,cObj.getBayURL());
		self.tolggeIconEnable(self.detailURLcm,cObj.getCmURL());
		var borderWidth=2;
		var top=VIEW_OFFSET_TOP+cObj.getPosition().getTop()-borderWidth;
		var left=VIEW_OFFSET_LEFT+cObj.getPosition().getLeft()* MAP_RACIO_LD_X-20-borderWidth;
		self.selectCircle.css("top",top).css("left",left+cObj.getABOffset(cObj)).css("border-width",borderWidth);
		self.isBuilded=true;
		circleDetailObj.children("img").unbind("click");
		circleDetailObj.children("img").bind("click",{"cObj":cObj},goToTheCircleSpace);
		self.beVisible(event);
	},
	tolggeIconEnable:function(iconObj,data){
		if(data!==undefined && data.length >0){
			var text=iconObj.text();
			iconObj.unbind("click");
			iconObj.bind("click",function(){if(data.match(/.+@.+/)){window.open("mailto:"+data	)}else{window.open(data);}});
			iconObj.removeClass("cap1icon");
			iconObj.addClass("cap1icon enable");
		}else{
			iconObj.unbind("click");
			iconObj.removeClass("cap1icon enable");
			iconObj.addClass("cap1icon");
		}
	},
	tolggeVisibility:function(event){
		var self = event.data.self;
		if(self.isVisible==false && self.isBuilded==true){
			self.beVisible(event);
		}else{
			self.beInvisible(event);
		}
	},
	beVisible:function(event){
		var self = event.data.self;
		self.circleDetailObj.css("display","block");
		self.selectCircle.css("display","block");
		self.isVisible=true;
		self.currentDetail.removeClass("mapChild");
		self.currentDetail.addClass("mapChild Selected");
	},
	beInvisible:function(event){
		var self = event.data.self;
		self.circleDetailObj.css("display","none");
		self.selectCircle.css("display","none");
		self.isVisible=false;
		self.currentDetail.removeClass("mapChild Selected");
		self.currentDetail.addClass("mapChild");
	}
}

function goToTheCircleSpace(event){
	var cObj = event.data.cObj;
	var vdhlObj = event.data.vdhlObj;
	var condition = cObj.getAreaCondition();
	if(currentWday+currentMap!=cObj.getAreaCondition()){
		nowLoadingDiv.css("display","block");
		var day = condition.substr(0,1);
		var area = condition.substr(1);
		for(var j=1;j<=dayCount;j++){
			var wdayObj = $("#wday"+j);
			doUnselectedWday(wdayObj);
			if(wdayObj.text()==day){
				doSelectedWday(wdayObj);
			}
		}
		for(var i=1;i<=mapCount;i++){
			var mapObj = $("#area"+i);
			doUnselectedArea(mapObj);
			if(mapObj.text()==area){
				doSelectedArea(mapObj);
			}
		}
		currentWday=day;
		currentMap=area;
		viewInitMap(cObj.getAreaCondition(),goToTheCircleSpaceExec,event);
		cObj.getVcm().changePlace({"data":{"self":cObj.getVcm()}});
	}else{
		goToTheCircleSpaceExec(event);
	}
	ViewCircleDetailObj.setDetail({"data":{"self":ViewCircleDetailObj,"cObj":cObj}});
}
function goToTheCircleSpaceExec(event){
	var map = $("#currentMapView");
	var mapRight=0;
	var mapBottom=0;
	var viewArea = getCurrentVisibleArea();
	var cObj = event.data.cObj;
	var hy=VIEW_OFFSET_TOP+cObj.getPosition().getTop();
	var hx=VIEW_OFFSET_LEFT+cObj.getPosition().getLeft()* MAP_RACIO_LD_X;
    var top = hy -(visibleArea.height )/2 + CUT_HEIGHT_LD;
    var left = hx -(visibleArea.width )/2 + CUT_WIDTH_LD + cObj.getABOffset(cObj);
    
	if(map.css("display")==="block"){
		mapBottom=map.attr("firstTop")*1+(map.css("height").match(/([0-9]+)[a-zA-Z]*/)||[0])[1]*1 + hy -(visibleArea.height )/2 + CUT_HEIGHT_LD;
		mapRight=map.attr("firstLeft")*1+(map.css("width").match(/([0-9]+)[a-zA-Z]*/)||[0])[1]*1 + hx -(visibleArea.width )/2 + CUT_WIDTH_LD + cObj.getABOffset(cObj);
	}
    top = mapBottom>top ? hy -(mapBottom - top)-5:top;
    left = mapRight>left ? hx -(mapRight -left)+ cObj.getABOffset(cObj):left;
    $('html,body').animate({ scrollTop: top ,scrollLeft: left}, 'fast');
}

var GenreTips=function(){
}
GenreTips.prototype={
	beVisible:function(event){
		var trunc = event.data.trunc;
		var target = event.data.target;
		var cObj = event.data.cObj;
		var viewArea = getCurrentVisibleArea();
		var index= 	Wdays[cObj.getWday()+INDEX];
		var item = TITLE_BASE.replace(/YYYYMMDD/,Wdays["wdayFull"+index]).replace(/X/,index).replace(/SPACE/,cObj.getAreaCondition().substr(1))+"<br />"+cObj.getGenreCD() +"<br /><span>"+cObj.getGenreName()+"</span>";//名称、開催日、曜日、エリア
		target.html(item);
		var bottom =(trunc.parent().css("height").match(/([0-9]+)[a-zA-Z]*/)||[0])[1]*1+4;
		var height =(target.css("height").match(/([0-9]+)[a-zA-Z]*/)||[0])[1];
		var width =(target.css("width").match(/([0-9]+)[a-zA-Z]*/)||[0])[1];
		var left =trunc.position().left;
		var currentRight=width*1+left*1;
		//alert("currentRight:"+currentRight+"/viewArea.width:"+viewArea.width);
		if(currentRight > viewArea.width*1){
			target.css("left",visibleArea.right+"px");
		}else{
			target.css("left",(visibleArea.left+left)+"px");
		}
		target.css("top",(visibleArea.bottom-bottom-height*1)+"px");
		target.css("display","block");
	},
	beInvisible:function(event){
		var trunc = event.data.trunc;
		var target = event.data.target;
		var cObj = event.data.cObj;
		target.css("display","none");
	}
};
function searchExec(event){
	var input=event.data.input;
	var word= input.val();
	var re = new RegExp(""+word+"", "i");
	for(var key in Circles){
		var cObj = Circles[key];
		if(cObj.getSpace(cObj).match(re)){
			//alert("space:"+cObj.getSpace(cObj)+"/word:"+word+"/isMatch:"+cObj.getSpace(cObj).match(re));
			goToTheCircleSpace({"data":{"cObj":cObj}});
			return true;
		}
		if(cObj.getDetail(cObj).match(re)){
			//alert("pr:"+cObj.getDetail(cObj)+"/word:"+word+"/isMatch:"+cObj.getSpace(cObj).match(re));
			goToTheCircleSpace({"data":{"cObj":cObj}});
			return true;
		}
		if(cObj.getTop(cObj).match(re)){
			//alert("top:"+cObj.getTop(cObj)+"/word:"+word+"/isMatch:"+cObj.getSpace(cObj).match(re));
			goToTheCircleSpace({"data":{"cObj":cObj}});
			return true;
		}
		if(cObj.getName(cObj).match(re)){
			//alert("name:"+cObj.getName(cObj)+"/word:"+word+"/isMatch:"+cObj.getSpace(cObj).match(re));
			goToTheCircleSpace({"data":{"cObj":cObj}});
			return true;
		}
	}
	alert(MSG_FIND_NOT_FOUND);
	input.css("background-color","red");
}

function addViewDetailHistory(cObj){
	var tempArray=[];
	var d = new Date();
	var YYYY = d.getYear();
	var MM = ((d.getMonth()+101)+"").substr(1);
	var DD = ((d.getDate()+100)+"").substr(1);
	var hh = ((d.getHours()+100)+"").substr(1);
	var mm = ((d.getMinutes()+100)+"").substr(1);
	var ss = ((d.getSeconds()+100)+"").substr(1);
	tempArray.push({"cObj":cObj,"time":VIEW_DETAIL_TIME.replace(/YYYY/,YYYY).replace(/MM/,MM).replace(/DD/,DD).replace(/hh/,hh).replace(/mm/,mm).replace(/ss/,ss)});
	for(var i=0;i<viewDetailHistory.length && i<MAX_VIEW_DETAIL_HISTRY_COUNT;i++){
		var vdh=viewDetailHistory[i];
		if(vdh.cObj.getCutId()==cObj.getCutId()){
			continue;
		}
		tempArray.push(vdh);
	}
	viewDetailHistory=tempArray;
}

var ViewDetailHistoyList=function(viewDetailHistoryObj,checkList){
	this.viewDetailHistoryObj=viewDetailHistoryObj;
	this.checkList=checkList;
	this.isVisible=false;
}
ViewDetailHistoyList.prototype={
	setDetail:function(event){
		var self = event.data.self;
		var cObj = event.data.cObj;
		var body = self.viewDetailHistoryObj.children(".viewDetailHistoryBody");
		body.children().remove();
		//alert("viewDetailHistory.length:"+viewDetailHistory.length);
		for(var i=0;i<viewDetailHistory.length ;i++){
			var vdh=viewDetailHistory[i];
			self.builtRow(self,vdh,body);
		}
		self.beVisible(event);
	},
	builtRow:function(self,row,body){
		var cObj=row.cObj;
		var time=row.time;
		var item = VIEW_DETAIL_HISTORY.replace(/TIME/,time).replace(/SPACE/,cObj.getSpace(cObj)).replace(/CNAME/,cObj.getName()).replace(/CTOP/,cObj.getTop());
		body.append($("<div class='viewDetailHistoryRow'></div>").html(item).bind("click",{"cObj":cObj,"vdhlObj":self},goToTheCircleSpace));
	},
	tolggeVisibility:function(event){
		var self = event.data.self;
		if(self.isVisible==false ){
			self.setDetail(event);
		}else{
			self.beInvisible(event);
		}
	},
	beVisible:function(event){
		var self = event.data.self;
		self.viewDetailHistoryObj.css("display","block");
		self.isVisible=true;
		self.checkList.removeClass("mapChild");
		self.checkList.addClass("mapChild Selected");
	},
	beInvisible:function(event){
		var self = event.data.self;
		self.viewDetailHistoryObj.css("display","none");
		self.isVisible=false;
		self.checkList.removeClass("mapChild Selected");
		self.checkList.addClass("mapChild");
	}
}
//-------------------------------------------------------------------
var inputfiles, fileinfotext;
var nowComike ="00";

function init()
{
    inputfiles = document.getElementById("inputfiles").files;
    fileinfotext = document.getElementById("fileinfotext");
    document.getElementById("submit").addEventListener("click", printFilesList, true);
}

var resultMain = '{"main":"main"'+"\n";
var resultMap = '{"map":"mao"'+"\n";
var resultDef = '{"def":"def"'+"\n";

var filesMap = {};
function printFilesList()
{
    convert(inputfiles);
}
var nowFname = "";
var rowCount = 0;
function convert(files) {
    var buffer = "";
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
		//alert("here we are:"+file.name+"/i:"+i);
		//alert("here we are:"+filesMap[file.name]+"/i:"+i);
        if(filesMap[file.name] === undefined){
	        filesMap[file.name] = file;
	        buffer += "ファイル名: " + file.name + "<br />タイプ: " + file.type + "<br />サイズ: " + file.size + "<hr />";
	        fileToText(file,covertByFile,files.length,i==(files.length -1),file.name);
        }
    }
    fileinfotext.innerHTML = buffer;
}
function fileToText(file,func,count,isLast,fname){
    var reader = new FileReader();
    reader.onload = function(e) {
        func(e.target.result,count,isLast,fname);
    };
    reader.readAsText(file);
}
var fileCount=0;
function covertByFile(text,fcount,isLast,fname){
	//alert(text.substring(0,100));
	var counter = 0;
	var allLength = text.length;
	text.split("\n").map(
		function(e){
			var line = "";
			var lineLength = e.length+1;
			counter++;
			if(counter < CIRCLE_COUNT_MAX){
				if(fname.match(new RegExp(nameFormatMain))){
					resultMain += convertMainToJSONProw(e);
				}else if(fname.match(new RegExp(nameFormatMap))){
					resultMap += convertMapToJSONProw(e);
				}else if(fname.match(new RegExp(nameFormatDef))){
					resultDef += convertDefToJSONProw(e);
				}else{
					line+="";
				}
				rowCount++;
			}
			if(counter>0){
				allLength-=lineLength;
			}
			if(allLength< 0 ){
				doLast(fname,fcount);
			}
		});
}
var fileMap = {};
function doLast(fname,fCount){
	if(fileMap[fname]===undefined){
		fileMap[fname]="done";
		fileCount++;
		nowFname+="\n"+fileCount+":"+fname+" row:"+ rowCount;
	}
	if(fileCount==fCount){
		textToFileDownload();
		alert("処理が終わりました！"+"\n"+nowFname+"\n　累計読込行数:"+fCount);
		$("#result").css("opacity","1");
		$("#download").css("display","block");
	}
}
function textToFileDownload(){
	var resultAll ="";
	resultAll+= "var main="+resultMain+"};\n";
	resultAll+= "var map="+resultMap+"};\n";
	resultAll+= "var def="+resultDef+"]}};\n";
	makeMozBlob(resultAll);
}
var indexAddress="";
var indexNameCircle="";
var indexNameKana="";
var indexNameAuthor="";
var indexDetail="";
var indexMail="";
var indexUrl="";
var indexRSS="";
var indexCirclem="";
var preAddress = "";// ab振り分け用
function convertMainToJSONProw(row){
	//alert(row.substring(0,100));
	var rowArray = row.split("\t");
	//alert("rowArray.length:"+rowArray.length);
	if(rowArray.length < 1){
		return "";
	}
	var delimiter = ",";
	var arrayEscaped = [];
	var mapKey = rowArray[5]+rowArray[6];
	var dataString ='["'+mapKey+'"';
	for (var i=0;i<rowArray.length ;i++){
		var escaped = rowArray[i].replace(/\"/ig,"\\\"").replace(/\r|\n|\r\n/ig,"") ;
		dataString += delimiter + '"' + escaped + '"';
		arrayEscaped[i] = escaped;
	}
	indexAddress += delimiter + '"' + rowArray[6]+rowArray[6]+rowArray[6]+rowArray[7] + '":"'+rowArray[0] + '"';
	indexNameCircle += delimiter + '"' + rowArray[7] + '":"'+rowArray[0] + '"';
	indexNameKana += delimiter + '"' + rowArray[8]  + '":"'+rowArray[0] + '"';
	indexNameAuthor += delimiter + '"' + rowArray[9] + '":"'+rowArray[0] + '"';
	indexUrl += delimiter + '"' + rowArray[10] + '":"'+rowArray[0] + '"';
	indexMail += delimiter + '"' + rowArray[11] + '":"'+rowArray[0] + '"';
	indexDetail += delimiter + '"' + rowArray[12] + '":"'+rowArray[0] + '"';
	indexRSS += delimiter + '"' + rowArray[13] + '":"'+rowArray[0] + '"';
	indexCirclem += delimiter + '"' + rowArray[14] + '":"'+rowArray[0] + '"';
	if (rowArray[0].length <1){
		return "";
	}
	return ',"' + rowArray[0] + '":' + dataString + "]\n";//サークルカット番号がキー
}

function convertMapToJSONProw(row){
	var rowArray = row.split("\t");
	if(rowArray.length < 1){
		return "";
	}
	var delimiter = ",";
	var mapKey = ""+rowArray[0]+((rowArray[1]*1+100)+"").substring(1,3);
	var dataString ='["'+mapKey+'"';
	for (var i=0;i<rowArray.length ;i++){
		dataString += delimiter + '"' + rowArray[i].replace(/\"/ig,"\\\"").replace(/\r|\n|\r\n/ig,"") + '"';
	}
	if(mapKey=="undefined"||mapKey===undefined){
		return "";
	}
	return ',"' + mapKey + '":' + dataString + "]\n";//マップ番号がキー
}
var defKey="";
var keyCount = 0;
var defDetail="defDetail";
var defHeader="defHeader";
var close="";
var defDelimiter ="";
var dataDef="dataDef";
var reDefComment = new RegExp('^#.+|^\s+$'); //こめんよ
var reDefKey = new RegExp('^\\*[0-9a-zA-Z]+'); //きー

function convertDefToJSONProw(row){
	var retString = "";
	if(row.match(reDefKey)){
		defKey=row.substring(1,row.length);
		keyCount =0;
		retString = close+'\n,"'+defKey.replace(/\r|\n|\r\n/,"")+'":{'
		close="]}";
	}else if(row.match(reDefComment) && keyCount <2){
		//スルー
		if(keyCount < 1 ){
			retString='\n"'+defDetail+'":"'+row.substring(2,row.length).replace(/\r|\n|\r\n/,"")+'"';
		}
		if(keyCount > 0 ){
			var array=row.substring(2,row.length).split(",");
			var dataString = "";
			var dataDelimit = "";
			for(var i=0;i< array.length;i++){
				dataString+= dataDelimit+'"'+array[i].replace(/\r|\n|\r\n/,"")+'"';
				dataDelimit=",";
			}
			retString=',\n"'+defHeader+'":['+dataString+'],\n"'+dataDef+'":['+"\n";
		}
		defDelimiter="";
		keyCount++;
	}else{
		var array=row.substring(0,row.length).split("\t");
		var dataString = "";
		var dataDelimit = "";
		for(var i=0;i< array.length;i++){
			dataString+= dataDelimit+'"'+array[i].replace(/\r|\n|\r\n/,"")+'"';
			dataDelimit=",";
		}
		if(dataString.length >2){
			retString=defDelimiter+'['+dataString+']'+"\n";
		}
		defDelimiter=",";
	}
	if(defKey==""){//コメントは虫
		return "";
	}
	return retString;
}
function makeMozBlob(text) {
	var blobBuilder = new MozBlobBuilder();
	blobBuilder.append(text);
	var a = document.getElementById('download');
	a.setAttribute('href', window.URL.createObjectURL(blobBuilder.getBlob()));
}

//window.addEventListener("load", init, true);

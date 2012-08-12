var ComiketGenres={};
var ComiketGenresKeys=[];
var ComiketAreas={};
var ComiketMapImagePath={};
var ComiketAreaDetails={};
var ComiketAreaDetailsParBlock={};
var ComiketAreaParBlock={};
var Wdays ={};
var Comiket="";
var ComiketNo="";
var ComiketYear="";
var circleCutHeightLD=0;
var circleCutWidthLD=0;
var circleCutHeightHD=0;
var Circles ={};
var CCZHDdir="";
var CCZLDdir="";
var circleCutWidthHD=0;
var mapWidthPixcel=0;
var mapHeightPixcel=0;
var dayCount=0;
var mapCount=0;
var Cprefx=1000;
var MapResioLDy=1;
var MapResioHDy=1;
var MapResioLDx=1;
var MapResioHDx=1;
var indexViewDay=0;
var indexViewMap=0;
var currentWday="";
var currentMap="";
var nowLoadingDiv= $("#nowLoading");
var mapSizeWidth=0;
var mapSizeHeight=0;
var circleDetailObj ;
var circleCutWidthLDHalfPlus=0;
var circleCutWidthLDHalfMinus=0;
var ViewCircleDetailObj;
var blockList ={};
var genreList ={};
var siteList =[];
var siteColorList ={};
var viewDetailHistory=[];
var initStateUtils={};

$(document).ready(function(){
	try{
		if(main === undefined || map.map===undefined || "mao" !=map.map){
			//alert("please give me the comikeData.js!");
			$("#BuildDataFile").css("display","block");
			return;
		}
	}catch( e ){
		$("#nowLoading").css("display","none");
		$("#BuildDataFile").css("display","block");
		//alert( e ); 
		return;
	}finally{
	}
	maindo();
});

function maindo(){
	cvInit();
	viewInit();
}

function cvInit(){
	nowLoadingDiv= $("#nowLoading");
	nowLoadingDiv.css("display","block");
	circleDetailObj=$("#circleDetail");
	circleDetailObj.children("img").attr("width",CUT_WIDTH_HD).attr("height",CUT_HEIGHT_HD);
	if(IS_VISIBLE_BACKGROUND_IMAGE == false){
		$("#isNoShowBackgroundMap").attr('checked','checked');
	}
	ViewCircleDetailObj=new ViewCircleDetail(circleDetailObj);
	$("#currentDetail").bind("click",{"self":ViewCircleDetailObj},ViewCircleDetailObj.tolggeVisibility);
	if(def!==undefined || def.def=="def"){
		//-------------------
		ComiketNo = def.Comiket.dataDef[0][0];
		Comiket = def.Comiket.dataDef[0][1];
		//-------------------
		
		circleCutWidthHD = def.cutInfo.dataDef[0][0];
		circleCutHeightHD = def.cutInfo.dataDef[0][1];
		circleCutWidthLD = CUT_WIDTH_LD;
		circleCutWidthLDHalfPlus=circleCutWidthLD;
		circleCutWidthLDHalfMinus=0*circleCutWidthLD/2;
		circleCutHeightLD = CUT_HEIGHT_LD;
		//-------------------
		mapWidthPixcel = def.mapTableInfo.dataDef[0][0];
		mapHeightPixcel = def.mapTableInfo.dataDef[0][0];
		
		//-------------------
		MapResioHDx=circleCutWidthHD/mapWidthPixcel;
		MapResioHDy=circleCutHeightHD/mapHeightPixcel;
		MapResioLDx=circleCutWidthLD/(mapWidthPixcel*1);
		MapResioLDy=circleCutHeightLD/(mapHeightPixcel*1);
		//-------------------
		Cprefx+=(ComiketNo*1);
		Cprefx="C"+(Cprefx+"").substring(1,4);
		CCZHDdir=Cprefx+CUT_HD;
		CCZLDdir=Cprefx+CUT_LD;
		//-------------------
		var count=0;
		
		for(dataArrayKey in def.ComiketDate.dataDef){
			var dataArray = def.ComiketDate.dataDef[dataArrayKey];
			count++;
			ComiketYear=dataArray[0];
			Wdays["wday"+count]=""+dataArray[3];
			Wdays[""+dataArray[3]]="wday"+count;
			Wdays[""+dataArray[3]+INDEX]=count;
			Wdays["year"+count]=""+dataArray[0];
			Wdays["month"+count]=""+dataArray[1];
			Wdays["day"+count]=""+dataArray[2];
			Wdays["wdayHalf"+count]=""+dataArray[1]+"/"+dataArray[2]+" ("+dataArray[3]+")";
			Wdays["wdayFull"+count]=""+dataArray[0]+"/"+dataArray[1]+"/"+dataArray[2]+" ("+dataArray[3]+")";
		}
		dayCount= count;
		//-------------------
		var dataArray = def.ComiketMap.dataDef;
		for(var a=0;a<dataArray.length;a++){
			var siteName = dataArray[a][0];
			siteList.push(siteName);
			siteColorList[siteName]=siteColors[a];
		}
		//-------------------
		for(var dataArrayKey in def.ComiketMap.dataDef){
			var dataArray = def.ComiketMap.dataDef[dataArrayKey];
			mapCount++;
			const condition = dataArray[0];
			const conditionE = dataArray[1];
			ComiketAreas[condition]=dataArray;
			ComiketAreas[condition+""+INDEX]=mapCount;
			ComiketAreas[mapCount]=condition;;
			for(var j=1;j<=dayCount;j++){
				const mapFileKey = Wdays["wday"+j]+condition;
				ComiketMapImagePath[mapFileKey+MAP_PREFIX_HD]="./"+MDATA+"/"+MAP_PREFIX_HD+j+conditionE+MAP_EXTENTION;
				ComiketMapImagePath[mapFileKey+MAP_PREFIX_LD]="./"+MDATA+"/"+MAP_PREFIX_LD+j+conditionE+MAP_EXTENTION;
				ComiketMapImagePath[mapFileKey+MAP_PREFIX_GENRE_HD]="./"+MDATA+"/"+MAP_PREFIX_GENRE_HD+j+conditionE+MAP_EXTENTION;
				ComiketMapImagePath[mapFileKey+MAP_PREFIX_GENRE_LD]="./"+MDATA+"/"+MAP_PREFIX_GENRE_LD+j+conditionE+MAP_EXTENTION;
				if(conditionE.indexOf("E")>=0){
					ComiketMapImagePath[mapFileKey+MAP_WIDTH_LD]=MAP_WIDTH_LD_E;
					ComiketMapImagePath[mapFileKey+MAP_HEIGHT_LD]=MAP_HEIGHT_LD_E;
					ComiketMapImagePath[mapFileKey+MAP_WIDTH_HD]=MAP_WIDTH_HD_E;
					ComiketMapImagePath[mapFileKey+MAP_HEIGHT_HD]=MAP_HEIGHT_HD_E;
					ComiketMapImagePath[mapFileKey+MAP_WIDTH_SD]=MAP_WIDTH_SD_E;
					ComiketMapImagePath[mapFileKey+MAP_HEIGHT_SD]=MAP_HEIGHT_SD_E;
				}else{
					ComiketMapImagePath[mapFileKey+MAP_WIDTH_LD]=MAP_WIDTH_LD_W;
					ComiketMapImagePath[mapFileKey+MAP_HEIGHT_LD]=MAP_HEIGHT_LD_W;
					ComiketMapImagePath[mapFileKey+MAP_WIDTH_HD]=MAP_WIDTH_HD_W;
					ComiketMapImagePath[mapFileKey+MAP_HEIGHT_HD]=MAP_HEIGHT_HD_W;
					ComiketMapImagePath[mapFileKey+MAP_WIDTH_SD]=MAP_WIDTH_SD_W;
					ComiketMapImagePath[mapFileKey+MAP_HEIGHT_SD]=MAP_HEIGHT_SD_W;
				}
			}
		}
		//-------------------
		for(var dataArrayKey in def.ComiketArea.dataDef){
			var dataArray = def.ComiketArea.dataDef[dataArrayKey];
			ComiketAreaDetails[dataArray[0]]=new ComiketArea(dataArray[0],dataArray[1],dataArray[2],dataArray[6]);
			var blockList = ComiketAreaDetails[dataArray[0]].getBlockList();
			for(var i=0;i<blockList.length;i++){
				ComiketAreaDetailsParBlock[blockList[i]]=ComiketAreaDetails[dataArray[0]];
			}
		}
		//-------------------
		for(var dataArrayKey in def.ComiketGenre.dataDef){
			var dataArray = def.ComiketGenre.dataDef[dataArrayKey];
			ComiketGenres[dataArray[0]]=dataArray[1];
			ComiketGenresKeys.push(dataArray[0]);
		}
		ComiketGenresKeys.sort();
		initStateUtils = new IntiStateUtils();
		//-------------------
	}
}

function viewInit(){
	for(var i=0;i<dayCount;i++){
		var wdayObj = $("#wday"+(i+1));
		var dayStr=Wdays["wday"+(i+1)];
		wdayObj.css("display","block").text(dayStr);
		wdayObj.bind("click",{"wday":dayStr,"index":(i+1)},changeView);
		if((i+1)==1){
			currentWday = dayStr;
		};
	}
	for(var i=0;i<dayCount;i++){
	}
	for(var dataArrayKey in def.ComiketMap.dataDef){
		var areaObj = $("#area"+(dataArrayKey*1+1));
		var dataArray = def.ComiketMap.dataDef[dataArrayKey];
		const mapStr=dataArray[0];
		areaObj.css("display","block").text(mapStr).css("background-color",siteColorList[mapStr]);
		if((dataArrayKey*1+1)==1){
			currentMap = mapStr;
		};
		areaObj.bind("click",{"map":mapStr,"index":(dataArrayKey*1+1)},changeView);
	}
	$("#comiketTitel").text(Comiket);
	const currentMapObj = $("#currentMap");
	const vcm= new ViewCurrentMap($("#mainContents"));
	const checkList= $("#checkList");
	const vdhlObj=new ViewDetailHistoyList($("#viewDetailHistory"),checkList);
	checkList.bind("click",{"self":vdhlObj},vdhlObj.tolggeVisibility);
	viewInitFrame(vcm,vdhlObj);
	doSelectedWday($("#wday1"));
	doSelectedArea($("#area1"));
	currentMapObj.bind("click",{"self":vcm,"button":currentMapObj},vcm.toggleView);
	for(var i=0;i<dayCount;i++){
		var wdayObj = $("#wday"+(i+1));
		wdayObj.bind("click",{"self":vcm},vcm.changePlace);
	}
	for(var dataArrayKey in def.ComiketMap.dataDef){
		var areaObj = $("#area"+(dataArrayKey*1+1));
		areaObj.bind("click",{"self":vcm},vcm.changePlace);
	}
	$("#serchButton").bind("click",{"input":$("#inputWords")},searchExec);
	$(window).bind("scroll",{"self":vcm},vcm.showViewArea);
}

function viewInitFrame(vcm,vdhlObj){
	var preAddress="";
	var blocks={};
	for(var key in main){
		var ab ="a";
		if(key.length != 6){
			continue;
		}
		var cObj = new Circle(main[key],vdhlObj);
		if(cObj.isSameAddress(preAddress)){
			ab="b";
		}
		preAddress = cObj.getAddress();
		cObj.setAB(ab);
		cObj.setVcm(vcm);
		Circles[key]=cObj;
		if(blockList[cObj.getBlock()]===undefined){
			blockList[cObj.getBlock()]=cObj;
		}
		if(blocks[cObj.getWday()+cObj.getBlock()]===undefined){
			blocks[cObj.getWday()+cObj.getBlock()]=cObj;
		}
		if(genreList[cObj.getGenreCD()]===undefined){
			genreList[cObj.getGenreCD()]=cObj;
		}
	}
	$(".selectCircle").bind("click",{"self":ViewCircleDetailObj},ViewCircleDetailObj.tolggeVisibility).css("display","none");
	var hedderTopLine = $("#hedderTopLine");
	var blockByDayList={};
	for(var wdayBlock in blocks){
		var blockKey = wdayBlock.substr(1);
		if(blockByDayList[blockKey]===undefined){
			blockByDayList[blockKey]={};
		}
		blockByDayList[blockKey][wdayBlock.substr(0,1)]=blocks[wdayBlock];
	}
	var MapNameObj = $("#mapName");
	for(var block in blockList){
		var cObj = blockList[block];
		var blockLink = $("<div id='"+BLOCK+block+"' class='"+BLOCK+"'>"+block+"</>").bind("click",{"cObj":cObj,"wday":blockByDayList[block]},goToTheCircleSpace);
		var ComiketAreaDetail = ComiketAreaDetailsParBlock[block];
		if(ComiketAreaDetail!==undefined){
			var siteName = ComiketAreaDetail.getMapName();
			var siteColor = siteColorList[siteName];
			hedderTopLine.append(blockLink.css("border-bottom-color",siteColor));
			blockLink.bind("mouseover",{"mapName":siteName,"MapNameObj":MapNameObj,'siteColor':siteColor},showMapName);
			blockLink.bind("mouseout",{"mapName":siteName,"MapNameObj":MapNameObj},hideMapName);
		}
	}
	//alert("siteColorList:"+siteColorList.toSource());
	const footerBottomLine = $("#footerBottomLine");
	const target=$("#genreTips");
	const GenreTipsObj=new GenreTips();
	var resortGenreMap={};
	for(var i=0;i<ComiketGenresKeys.length;i++){
	
		var genre = ComiketGenresKeys[i];
		var cObj = genreList[genre];
		var wday = cObj.getWday();
		var ComiketAreaDetail = ComiketAreaDetailsParBlock[cObj.getBlock()];
		//alert("ComiketAreaDetail:"+ComiketAreaDetail+"/cObj.getBlock():"+cObj.getBlock());
		var siteName = ComiketAreaDetail===undefined?"":ComiketAreaDetail.getMapName();
		if(resortGenreMap[wday]===undefined){
			resortGenreMap[wday] = {};
		}
		if(resortGenreMap[wday][siteName]===undefined){
			resortGenreMap[wday][siteName] =[];
		}
		resortGenreMap[wday][siteName].push(genre);
	}
	
	var topObj= $("<div id='"+GENRE+"Top' class='GENREHEAD'>★</>");//.bind("click",{"cObj":cObj},goToTheCircleSpace);
	footerBottomLine.append(topObj);
	for(var n=0;n<dayCount;n++){
		var dayStr=Wdays["wday"+(n+1)];
		var dayObj= $("<div id='"+GENRE+dayStr+"' class='GENREHEAD'>"+dayStr+"</>");
		footerBottomLine.append(dayObj);
		var cObjList=[];
		for(var j=0;j<siteList.length;j++){
			var siteName = siteList[j];
			var genreListParDaySite = resortGenreMap[dayStr][siteName];
			for(var m=0;m<genreListParDaySite.length;m++){
				var genre = genreListParDaySite[m];
				var cObj = genreList[genre];
				cObjList.push(cObj);
			//alert("dayStr:"+dayStr);
				var genreObj= $("<div id='"+GENRE+genre+"' class='"+GENRE+"'>"+cObj.getGenreName().replace(/・/g,"･").replace(/ /g,"").replace(/ー/g,"-")+"</>").bind("click",{"cObj":cObj},goToTheCircleSpace);
				footerBottomLine.append(genreObj);
				genreObj.bind("mouseover",{"trunc":genreObj,"target":target,"cObj":cObj},GenreTipsObj.beVisible);
				genreObj.bind("mouseout",{"trunc":genreObj,"target":target,"cObj":cObj},GenreTipsObj.beInvisible);
				genreObj.css("background-color",initStateUtils.getGenreColor(cObj.getGenreCD())).css("border-color",siteColorList[siteName]);
			}
		}
		dayObj.bind("mouseover",{"trunc":genreObj,"target":target,"cObjList":cObjList},GenreTipsObj.beVisibleOnTheDay);
		dayObj.bind("mouseout",{"trunc":genreObj,"target":target,"cObj":cObj},GenreTipsObj.beInvisible);
	}
	viewInitMap();
	return true;
}

function viewInitMap(condition,func,args){
	var count = Wdays[currentWday+INDEX];
	$("#comiketTitel").html(Comiket+"<br />"+TITLE_BASE.replace(/YYYYMMDD/,Wdays["wdayFull"+count]).replace(/X/,count).replace(/SPACE/,currentMap));
	nowViewCount=0;
	if(condition===undefined){
		condition=currentWday+currentMap;
	}
	const trunc =$("#map").css("top","0px").css("left","-20px");
	const width  = ComiketMapImagePath[condition+MAP_WIDTH_LD] * MapResioLDx * MAP_RACIO_LD_X;
	const height = ComiketMapImagePath[condition+MAP_HEIGHT_LD] * MapResioLDy * MAP_RACIO_LD_Y;
	const isShowBack=$("#isNoShowBackgroundMap").get(0).checked;
	if(isShowBack==false){
		const path = ComiketMapImagePath[condition+MAP_PREFIX_HD];
		const image=trunc.children("img");
		if(image.length<1 || image.attr("src",path).length < 1){
			trunc.append("<img id='mapImage' src='"+path+"' width='"+width+"px' height='"+height+"px' alt='base'/>");
			var img = document.getElementById("mapImage");
			img.addEventListener('load', doMapLoaded, false);
		}else{
			try{
				image.attr("src",path).attr("width",width).attr("height",height);
			}catch(e){
				image.remove();
				trunc.append("<img id='mapImage' src='"+path+"' width='"+width+"px' height='"+height+"px' alt='base'/>");
				var img = document.getElementById("mapImage");
				img.addEventListener('load', doMapLoaded, false);
				viewCountAndIsLast();
			}
		}
	}else if(trunc.children("img").length>0){
		image=trunc.children("img").remove();
		viewCountAndIsLast();
	}else{
		viewCountAndIsLast();
	}
	mapSizeWidth=width;
	mapSizeHeight=height;
	var count=0;
	for(var key in Circles){
		Circles[key].initVisible(Circles[key],condition,trunc);
		count++;
	}
	setViewTotalCount(count);
	setDoLast(func,args);
	return true;
}
var funcs=[];
var argss=[];
function setDoLast(func,args){
	if(func!==undefined){
		funcs.push(func);
		argss.push(args);
	}
	return true;
}
function doMapLoaded(){
	viewCountAndIsLast();
	return true;
}
var totalViwCount = 0;
var nowViewCount =0;
function viewCountAndIsLast(){
	nowViewCount++;
	if(nowViewCount==totalViwCount+1){
		nowLoadingDiv.css("display","none");
		for(var i=0;i<funcs.length;i++){
			funcs[i](argss[i]);
		}
		funcs=[];
		argss=[];
		window.clearInterval ( timeLoading );
	}
	return true;
}
function setViewTotalCount(count){
	totalViwCount=count;
	if(nowViewCount==totalViwCount){
		window.clearInterval ( timeLoading );
	}
	return true;
}

function getAreaByBlock(block){
	if(ComiketAreaDetailsParBlock[block]===undefined){
		return "NaN";
	}
	return ComiketAreaDetailsParBlock[block].getMapName();
} 
var ViewPosition = function(address){
	this.address = address;
	this.dataArray=map[address];
	
	if(this.dataArray===undefined){
		address=address.substring(0,1)+(""+address.substring(1,3)*1);
		this.dataArray=map[address];
	}
	if(this.dataArray===undefined){
		this.topL=-1*MapResioLDy;
		this.leftL=-1*MapResioLDx;
		this.topH=-1*MapResioHDy;
		this.leftH=-1*MapResioHDx;
		this.mode="X";
	}else{
		this.topL=this.dataArray[INDEX_MAP_Y]*MapResioLDy;
		this.leftL=this.dataArray[INDEX_MAP_X]*MapResioLDx;
		this.topH=this.dataArray[INDEX_MAP_Y]*MapResioHDy;
		this.leftH=this.dataArray[INDEX_MAP_X]*MapResioHDx;
		this.mode="L";
	}
}
ViewPosition.prototype={
	setMode:function(mode){
		this.mode=mode;
	},
	getTopL:function(){
		return this.topL;
	},
	getLeftL:function(){
		return this.leftL;
	},
	getTopH:function(){
		return this.topH;
	},
	getLeftH:function(){
		return this.leftH;
	},
	getTop:function(){
		return this.mode=="L" ? this.topL:this.topH;
	},
	getLeft:function(){
		return this.mode=="L" ? this.leftL:this.leftH;
	}
}

var ComiketArea = function(areaName,mapName,blocks,mapPrefix){
	this.areaName=areaName;
	this.mapName=mapName;
	this.blocks=blocks;
	blocks+="";
	this.blockList=blocks.split("");
	this.mapPrefix=mapPrefix;
}
ComiketArea.prototype={
	getAreaName:function(){
		return this.areaName;
	},
	getMapName:function(){
		return this.mapName;
	},
	isBlongMap:function(mapName){
		return this.mapName==mapName;
	},
	getBlocks:function(){
		return this.blocks;
	},
	getBlockList:function(){
		return this.blockList;
	},
	getMapPrefix:function(){
		return this.mapPrefix;
	},
	isOnTheAreaBlock:function(self,block){
		for(var i;i<self.blockList.length;i++){
			if(self.blockList[i]==block){
				return true;
			}
		}
		return false;
	}
}

var Circle=function(dataArray,vdhlObj){
	this.vdhlObj=vdhlObj;
	this.dataArray=dataArray;
	this.indexAddress=0;//サークルmapaddress
	this.indexCutId=1;//サークルカット
	this.indexIslandSerialNo=2;//島通番
	this.indexSerialNoInIsland=3;//島内通番
	this.indexWday=4;//曜日
	this.indexWestEast=5;//東西
	this.indexBlock=6;//ブロック
	this.indexSerialNoInBlock=7;//ブロック内通番
	this.indexGenreCD=8;//ジャンルコード
	this.indexName=9;//サークル名
	this.indexNameKana=10;//サークル名半角カナ
	this.indexTop=11;//代表者名
	this.indexBook=12;//URL
	this.indexURL=13;//URL
	this.indexMail=14;//メアド
	this.indexDetail=15;//解説
	this.indexBayURL1=16;//通販アドレス１
	this.indexCmURL=17;//通販アドレス2
	this.ab=" ";//サークルスペースab添字
	this.HDfileName=CCZHDdir+"/"+this.dataArray[this.indexCutId]+CUT_EXTENTION;
	this.LDfileName=CCZLDdir+"/"+this.dataArray[this.indexCutId]+CUT_EXTENTION;
	this.cutWidthHD=CUT_WIDTH_HD;
	this.cutHeightHD=CUT_HEIGHT_HD;
	//alert(this.dataArray[this.indexAddress]+"/"+this.indexAddress+"/"+dataArray.toSource()+"/"+this.dataArray[this.indexBlock]);
	this.position= new ViewPosition(this.dataArray[this.indexAddress]);
	this.AreaCondition=this.dataArray[this.indexWday]+getAreaByBlock(this.dataArray[this.indexBlock]);
	this.isVisible=false;
	this.vcm;
}
Circle.prototype={
	getAreaCondition:function(){
		return this.AreaCondition;
	},
	getPosition:function(){
		return this.position;
	},
	setVcm:function(vcm){
		this.vcm=vcm;
	},
	getVcm:function(){
		return this.vcm;
	},
	setAB:function(ab){
		this.ab=ab;
	},
	getAB:function(){
		return this.ab;
	},
	isSameAddress:function(mapAddress){
		if(mapAddress==this.getAddress()){
			return true;
		}
		return false;
	},
	getSpace:function(self){
		return self.getWday()+self.getAddress()+self.getAB();
	},
	getAddress:function(){
		return this.dataArray[this.indexAddress];
	},
	getCutId:function(){
		return this.dataArray[this.indexCutId];
	},
	getIslandSerialNo:function(){
		return this.dataArray[this.indexIslandSerialNo];
	},
	getSerialNoInIsland:function(){
		return this.dataArray[this.indexSerialNoInIsland];
	},
	getWday:function(){
		return this.dataArray[this.indexWday];
	},
	getWestEast:function(){
		return this.dataArray[this.indexWestEast];
	},
	getBlock:function(){
		return this.dataArray[this.indexBlock];
	},
	getSerialNoInBlock:function(){
		return this.dataArray[this.indexSerialNoInBlock];
	},
	getGenreCD:function(){
		return this.dataArray[this.indexGenreCD];
	},
	getGenreName:function(){
		return ComiketGenres[this.getGenreCD()];
	},
	getName:function(){
		return this.dataArray[this.indexName];
	},
	getNameKana:function(){
		return this.dataArray[this.indexNameKana];
	},
	getTop:function(){
		return this.dataArray[this.indexTop];
	},
	getBook:function(){
		return this.dataArray[this.indexBook];
	},
	getURL:function(){
		return this.dataArray[this.indexURL];
	},
	getMail:function(){
		return this.dataArray[this.indexMail];
	},
	getDetail:function(){
		return this.dataArray[this.indexDetail];
	},
	getBayURL:function(){
		return this.dataArray[this.indexBayURL];
	},
	getCmURL:function(){
		return this.dataArray[this.indexCmURL];
	},
	getHDfileName:function(self){
		return self.HDfileName;
	},
	getLDfileName:function(self){
		return self.LDfileName;
	},
	tolgeViewOnArea:function(self,condition){
		if(self.AreaCondition==condition){
			return true;
		}else{
			return false;
		}
	},
	tolgeView:function(self,trunc){
		if(self.isVisible){
			self.beInVisible(self,trunc);
		}else{
			self.beVisible(self);
		}
	},
	isOnVisibleArea:function(self){
		return true;
	},
	initVisible:function(self,currentVisibleArea,trunc){
		if(self.tolgeViewOnArea(self,currentVisibleArea) && self.isOnVisibleArea(self)){
			self.beVisible(self,trunc);
		}else{
			self.beInVisible(self,trunc);
		};
		viewCountAndIsLast();
	},
	beVisible:function(self,trunc){
		if(self.isVisible==true){
			return ;
		}
		trunc.append(self.buildCircleView(self));
		self.isVisible=true;
	},
	beInVisible:function(self,trunc){
		if(self.isVisible==false){
			return ;
		}
		var circleDomBranche = self.circleDomBranche;
		if(circleDomBranche.children().length < 1){
			circleDomBranche=$("#C"+self.getCutId());
			//alert(self.getCutId());
		}else{
		}
		circleDomBranche.children().remove("div");
		circleDomBranche.remove("div");
		trunc.remove("#C"+self.getCutId());
		self.isVisible=false;
	},
	getABOffset:function(cObj){
		if(cObj.getAB()=='a'){
			return circleCutWidthLDHalfMinus;
		}else{
			return circleCutWidthLDHalfPlus;
		}
	},
	buildCircleView:function (cObj){
		var body=$("<div class='circle'></div>").attr("id","C"+cObj.getCutId()).css("width",circleCutWidthLD).css("height",circleCutHeightLD);
		body.bind("click",{"self":ViewCircleDetailObj,"cObj":cObj,"vdhlObj":cObj.vdhlObj},ViewCircleDetailObj.setDetail);
		cObj["circleDomBranche"]=body;
		body.css("background-image","url(./"+cObj.getLDfileName(cObj)+")");
		if(body.children("div").length < 1){
			body.append(
				"<div style='background-color:"+initStateUtils.getGenreColor(cObj.getGenreCD())+";'>"
				+cObj.getAddress()+"<br/>"+cObj.getAB()+"</div>");
		}
		const top=VIEW_OFFSET_TOP+cObj.getPosition().getTop();
		const left=VIEW_OFFSET_LEFT+cObj.getPosition().getLeft()* MAP_RACIO_LD_X;
		body.css("top",top).css("left",left+cObj.getABOffset(cObj));
		
		return body;
	}
}


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
		var areaButton = $("#area"+index);
		doSelectedArea(areaButton);
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

var ViewCurrentMap = function(){
	this.isVisible=false;
	this.isBuilted=false;
	this.map=$("#currentMapView");
	this.top	=(this.map.css("top").match(/([0-9]+)[a-zA-Z]*/)||[])[1];
	this.left	=(this.map.css("left").match(/([0-9]+)[a-zA-Z]*/)||[])[1];
	this.map.attr("firstTop",this.top);
	this.map.attr("firstLeft",this.left);
	this.mapCloseButton;
	this.closeButtonOffset = 20;
	this.button=currentMapObj = $("#currentMap");
}
ViewCurrentMap.prototype={
	toggleView:function(event){
		const self= event.data.self;
		const button= self.button;
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
		const condition=currentWday+currentMap;
		const width = ComiketMapImagePath[condition+MAP_WIDTH_SD];
		const height = ComiketMapImagePath[condition+MAP_HEIGHT_SD];
		const path1 = ComiketMapImagePath[condition+MAP_PREFIX_LD];
		const path2 = ComiketMapImagePath[condition+MAP_PREFIX_GENRE_LD];
		//alert(condition);
		const currentMapObj =self.map.append("<img src='"+path2+"' width='"+width+"' height='"+height+"'><img src='"+path1+"' width='"+width+"' height='"+height+"'><div class='circleDetailCloseButton' id='currentCloseButton'>☓</div><div id='viewaAreaSquare' />")
			.css("width",width).css("height",height).css("right",0);
		var mapImg = currentMapObj.children("img:last");
		mapImg.css("top",-1*height-MAP_VIEW_ADJUST_Y_PX);
		self.mapCloseButton=currentMapObj.children("div:first");
		self.mapCloseButton.css("top",-height*2-MAP_VIEW_ADJUST_Y_PX*2);
		currentMapObj.unbind("click");
		currentMapObj.children().unbind("click");
		//alert("self.mapCloseButton.attr('clientHeight'):"+self.mapCloseButton.height()+"/self.mapCloseButton:"+self.mapCloseButton.get(0).height);
		self.map.css("background-color",siteColorList[currentMap]);
		self.mapCloseButton.unbind("click");
		self.mapCloseButton.bind("click",{"self":self},self.toggleView);
		self.isBuilted=true;
		self.isVisible=true;
		self.showViewArea({"data":{"self":self}});
		mapImg.unbind("click");
		mapImg.bind("click",{"self":self},self.geToTheClickPoint);
	},
	changePlace:function(event){
		const self= event.data.self;
		
		self.map.children("img").remove();
		self.map.children("div").remove();
		self.isBuilted=false;
		self.builtView(self);
		self.showViewArea(event);
	},
	showViewArea:function(event){
		const self= event.data.self;
		const viewArea = getCurrentVisibleArea();
		if(self.isVisible){
			var condition=currentWday+currentMap;
			var heightMap = ComiketMapImagePath[condition+MAP_HEIGHT_SD];
			var target = self.map.children("div").eq(1);
			var width=viewArea.width*viewArea.xRacio;
			var height=viewArea.height*viewArea.yRacio;
			var top=viewArea.top*viewArea.yRacio;
			var left=viewArea.left*viewArea.xRacio;
			target.css("width",width).css("height",height).css("top",top-(2*heightMap)-MAP_VIEW_ADJUST_Y_PX*2-self.closeButtonOffset).css("left",left);
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
        var top = (hy - self.top)/viewArea.yRacio-(visibleArea.height)/2-self.closeButtonOffset;
        var left = (hx - self.left)/viewArea.xRacio-(visibleArea.width)/2;
        $('html,body').animate({ scrollTop: top ,scrollLeft: left}, 'fast');
	}
}

var ViewCircleDetail=function(circleDetailObj){
	this.circleDetailObj=circleDetailObj;
	this.circleDetail=$("#circleDetail");
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
	this.circleDetailGenreTips=$("#circleDetailGenreTips");
	this.circleDetailCloseButton=$("#circleDetailCloseButton");
	this.isBuilded=false;
	this.isVisibleGenreFix=true;
	this.detailSpace.bind("mouseover",{"self":this},this.beVisibleGenre);
	this.detailSpace.bind("mouseout",{"self":this},this.beInvisibleGenre);
	this.detailSpace.bind("click",{"self":this},this.tolggeVisibleGenreFix);
	this.circleDetailCloseButton.bind("click",{"self":this},this.beInvisible);
	this.circleDetailGenreTips.css("visibility","hidden");
}
ViewCircleDetail.prototype={
	setDetail:function(event){
		const self = event.data.self;
		const cObj = event.data.cObj;
		addViewDetailHistory(cObj);
		if(cObj.vdhlObj.isVisible==true ){
			cObj.vdhlObj.setDetail({"data":{"self":cObj.vdhlObj,"cObj":cObj}});
		}
		circleDetailObj.children("img").attr("src",cObj.getHDfileName(cObj));
		self.detailDay.text(cObj.getAreaCondition());
		self.detailSpace.html(cObj.getAddress()+"<br />"+cObj.getAB()).css("background-color",initStateUtils.getGenreColor(cObj.getGenreCD()));
		self.detailCName.text(cObj.getName());
		self.detailPronouce.text(cObj.getNameKana());
		self.detailPN.text(cObj.getTop());
		self.detailBook.text(cObj.getBook());
		self.detailPR.text(cObj.getDetail());
		self.tolggeIconEnable(self.detailURL,cObj.getURL());
		self.tolggeIconEnable(self.detailMail,cObj.getMail());
		self.tolggeIconEnable(self.detailURLsale,cObj.getBayURL());
		self.tolggeIconEnable(self.detailURLcm,cObj.getCmURL());
		self.circleDetailGenreTips.text(cObj.getGenreName()).css("background-color",initStateUtils.getGenreColor(cObj.getGenreCD()));
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
	tolggeVisibleGenreFix:function(event){
		var self = event.data.self;
		if(self.isVisibleGenreFix===false){
			self.isVisibleGenreFix=true;
		}else{
			self.isVisibleGenreFix=false;
		}
	
	},
	beVisibleGenre:function(event){
		var self = event.data.self;
		self.circleDetailGenreTips.css("visibility","visible");
	},
	beInvisibleGenre:function(event){
		var self = event.data.self;
		if(self.isVisibleGenreFix===false){
			self.circleDetailGenreTips.css("visibility","hidden");
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
	const vdhlObj = event.data.vdhlObj;
	const wday = event.data.wday;
	if(wday!==undefined){
		cObj =wday[currentWday];
	}
	const condition = cObj.getAreaCondition();
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
	const map = $("#currentMapView");
	var mapRight=0;
	var mapBottom=0;
	const viewArea = getCurrentVisibleArea();
	const cObj = event.data.cObj;
	const hy=VIEW_OFFSET_TOP+cObj.getPosition().getTop();
	const hx=VIEW_OFFSET_LEFT+cObj.getPosition().getLeft()* MAP_RACIO_LD_X;
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
function showMapName(event){
	var text = event.data.mapName;
	var target= event.data.MapNameObj;
	event.data.MapNameObj.css("display","block");
	var x =event.clientX;
	target.text(text).css("left",x).css("background-color",event.data.siteColor);
}
function hideMapName(event){
	event.data.MapNameObj.css("display","none");
}

var GenreTips=function(){
}
GenreTips.prototype={
	beVisible:function(event){
		const trunc = event.data.trunc;
		const target = event.data.target;
		const cObj = event.data.cObj;
		const viewArea = getCurrentVisibleArea();
		const index= 	Wdays[cObj.getWday()+INDEX];
		var spaceStr = cObj.getAreaCondition().substr(1);
		spaceStr = "<div class='genreTipSpace' style='background-color:"+siteColorList[spaceStr]+";color:white;'>"+spaceStr+"</div>";
		const item = TITLE_BASE.replace(/YYYYMMDD/,Wdays["wdayFull"+index]).replace(/X/,index).replace(/SPACE/,spaceStr)+"<br />"+cObj.getGenreCD() +"<br /><span>"+cObj.getGenreName()+"</span>";//名称、開催日、曜日、エリア
		target.html(item);
		const bottom =(trunc.parent().css("height").match(/([0-9]+)[a-zA-Z]*/)||[0])[1]*1+4;
		target.css("height",cssGenreTipsHeight);
		const height =(target.css("height").match(/([0-9]+)[a-zA-Z]*/)||[0])[1];
		const width =this.cssWidth;//(target.css("width").match(/([0-9]+)[a-zA-Z]*/)||[0])[1];
		target.css("width",cssGenreTipsWidth);
		const left =trunc.position().left;
		const currentRight=width*1+left*1;
		//alert("currentRight:"+currentRight+"/viewArea.width:"+viewArea.width);
		if(currentRight > viewArea.width*1){
			target.css("left",visibleArea.right+"px");
		}else{
			target.css("left",(visibleArea.left+left)+"px");
		}
		target.css("background-color",initStateUtils.getGenreColor(cObj.getGenreCD()));
		target.css("top",(visibleArea.bottom-bottom-height*1)+"px");
		target.css("display","block");
	},
	beVisibleOnTheDay:function(event){
		const trunc = event.data.trunc;
		const target = event.data.target;
		const cObjList = event.data.cObjList;
		const viewArea = getCurrentVisibleArea();
		var body = $("<div class='genreListBody'></div>");
		var lineHetight =0;
		target.html("");
		target.append(body);
		for(var i =0;i< cObjList.length ;i++){
			var cObj = cObjList[i];
			var index= 	Wdays[cObj.getWday()+INDEX];
			var spaceStr = cObj.getAreaCondition().substr(1);
			var genreColor = initStateUtils.getGenreColor(cObj.getGenreCD());
			spaceStr = "<div class='genreTipSpace' style='background-color:"+siteColorList[spaceStr]+";color:white;'>"+spaceStr+"</div>";
			const item = $("<div class='genreTipBar' style='background-color:"+genreColor+"'>"+TITLE_BASE.replace(/YYYYMMDD/,Wdays["wdayFull"+index]).replace(/X/,index).replace(/SPACE/,spaceStr)+" "+cObj.getGenreCD() +"<span> "+cObj.getGenreName()+"</span>"+"</div>");//名称、開催日、曜日、エリア
			body.append(item); 
			lineHetight +=(item.css("height").match(/([0-9]+)[a-zA-Z]*/)||[0])[1]*1;
			lineHetight +=(item.css("padding-bottom").match(/([0-9]+)[a-zA-Z]*/)||[0])[1]*2;
			lineHetight +=(item.css("margin-bottom").match(/([0-9]+)[a-zA-Z]*/)||[0])[1]*2;
		}
		const bottom =(trunc.parent().css("height").match(/([0-9]+)[a-zA-Z]*/)||[0])[1]*1+4;
		const height =(target.css("height").match(/([0-9]+)[a-zA-Z]*/)||[0])[1];
		target.css("width","305");
		const width =305;
		const left = trunc.position().left;
		const currentRight=width*1+left*1;
		//alert("currentRight:"+currentRight+"/viewArea.width:"+viewArea.width);
		if(currentRight > viewArea.width*1){
			target.css("left",(visibleArea.right*1)+"px");
		}else{
			target.css("left",(visibleArea.left+left-width)+"px");
		}
		target.css("height","100%");
		target.css("background-color","black");
		target.css("color","white");
		target.css("top",(visibleArea.bottom-bottom-lineHetight)+"px");
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
	const input=event.data.input;
	const word= input.val();
	const re = new RegExp(word, "i");
	alert("word:"+word);
	input.css("background-color","white");
	for(var key in Circles){
		var cObj = Circles[key];
		//alert(cObj.getSpace(cObj)+"/"+cObj.getName(cObj)+"/"+cObj.getTop(cObj)+"/"+cObj.getDetail(cObj));
		if((cObj.getSpace(cObj)+"/"+cObj.getName(cObj)+"/"+cObj.getTop(cObj)+"/"+cObj.getDetail(cObj)).match(re)){
			//alert("space:"+cObj.getSpace(cObj)+"/word:"+word+"/isMatch:"+cObj.getSpace(cObj).match(re));
			goToTheCircleSpace({"data":{"cObj":cObj}});
			return true;
		}
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
	const d = new Date();
	const YYYY = d.getYear();
	const MM = ((d.getMonth()+101)+"").substr(1);
	const DD = ((d.getDate()+100)+"").substr(1);
	const hh = ((d.getHours()+100)+"").substr(1);
	const mm = ((d.getMinutes()+100)+"").substr(1);
	const ss = ((d.getSeconds()+100)+"").substr(1);
	tempArray.push({"cObj":cObj,"time":VIEW_DETAIL_TIME.replace(/YYYY/,YYYY).replace(/MM/,MM).replace(/DD/,DD).replace(/hh/,hh).replace(/mm/,mm).replace(/ss/,ss)});
	for(var i=0;i<viewDetailHistory.length && i<MAX_VIEW_DETAIL_HISTRY_COUNT;i++){
		const vdh=viewDetailHistory[i];
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
IntiStateUtils=function(){//ごった煮Obj
	this.genreColorMap = {};
	for(var i =0 ;i < ComiketGenresKeys.length ; i++){
		var colorIndex = i;
		if(colorIndex > genreColors.length ){
			colorIndex = colorIndex- genreColors.length;
		}
		this.genreColorMap[ComiketGenresKeys[i]]=genreColors[colorIndex];
	}
}
IntiStateUtils.prototype={
	getGenreColor:function(genreCD){
		return this.genreColorMap[genreCD];
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

window.addEventListener("load", init, true);

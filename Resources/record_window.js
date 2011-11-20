var win = Ti.UI.currentWindow;

var now = new Date();
now.setHours(12);
var Y = now.getYear()+1900;
var M = now.getMonth()+1;
var D = now.getDate();
var y_m_d = Y+"-"+M+"-"+D;
var y_m_d_old = y_m_d;

var monthLabel = Titanium.UI.createLabel({
	color:'#black',
	font:{
		fontFamily:'Helvetica Neue',
		fontSize:25
	},
	textAlign:'center',
	top:5, left:5, height:'auto', width:'auto'
});
monthLabel.text = new Date().getMonth()+1 + "月";
win.add(monthLabel);

//
// meat SLIDER
//
var meatSliderLabel = Titanium.UI.createLabel({
	text:'meat value = 0' ,
	color:'#orange',
	font:{
		fontFamily:'Helvetica Neue',
		fontSize:15
	},
	textAlign:'center',
	top:30, left:50, right:50, height:'auto'
});
var meatSlider = Titanium.UI.createSlider({
	backgroundDisabledColor:'#orange',
	min:0,
	max:10,
	top:60, left:50, right:50, height:'auto'
});
meatSlider.addEventListener('change',function(e)
{
	meatSliderLabel.text = 'meat value = ' + Math.round(e.value);
});
meatSlider.value = 0; // For regression test purposes
win.add(meatSliderLabel);
win.add(meatSlider);

//
// vegetable SLIDER
//
var vegetableSliderLabel = Titanium.UI.createLabel({
	text:'vegetable value = 0' ,
	color:'#orange',
	font:{
		fontFamily:'Helvetica Neue',
		fontSize:15
	},
	textAlign:'center',
	top:90, left:50, right:50, height:'auto'
});

var vegetableSlider = Titanium.UI.createSlider({
	backgroundDisabledColor:'#orange',
	min:0,
	max:10,
	top:120, left:50, right:50, height:'auto'
});
vegetableSlider.addEventListener('change',function(e)
{
	vegetableSliderLabel.text = 'vegetable value = ' + Math.round(e.value);
});
vegetableSlider.value = 0; // For regression test purposes
win.add(vegetableSliderLabel);
win.add(vegetableSlider);

//
// carb SLIDER
//
var carbSliderLabel = Titanium.UI.createLabel({
	text:'carb value = 0' ,
	color:'#orange',
	font:{
		fontFamily:'Helvetica Neue',
		fontSize:15
	},
	textAlign:'center',
	top:150, left:50, right:50, height:'auto'
});

var carbSlider = Titanium.UI.createSlider({
	backgroundDisabledColor:'#orange',
	min:0,
	max:10,
	top:180, left:50, right:50, height:'auto'
});
carbSlider.addEventListener('change',function(e)
{
	carbSliderLabel.text = 'carb value = ' + Math.round(e.value);
});
carbSlider.value = 0; // For regression test purposes
win.add(carbSliderLabel);
win.add(carbSlider);

var saveButton = Ti.UI.createButton({
	// backgroundColor:'#orange',
	background:true,
	backgroundGradient:{
    	type:'linear',
    	colors:[
        {position:0.00,color:'#feccb1'},
        {position:0.50,color:'#f17432'},
        {position:0.51,color:'#ea5507'},
        {position:1.00,color:'#fb955e'}
       ],
       startRadius:{x:0,y:0},
       endRadius:{x:50,y:50}
   	},
   	borderRadius:10,
	backgroundImage:'none',
	color:"#white",
	title: 'この値で保存する',
	top:220, left:50, right:50, height:40
});
win.add(saveButton);

// saveButton.addEventListener('singletap',function(){
	// this.backgroundColor = "#blue";
// });

saveButton.addEventListener(
'click', function () {
	this.backgroundGradient = {
    	type:'linear',
    	colors:[
	        {position:0.00,color:'#white'},
	        {position:0.50,color:'#blue'},
	        {position:0.51,color:'#blue'},
	        {position:1.00,color:'#white'}
	    ],
	    startRadius:{x:0,y:0},
	    endRadius:{x:50,y:50}
   	}
   	
   	this.backgroundGradient = {
    	type:'linear',
    	colors:[
        	{position:0.00,color:'#feccb1'},
        	{position:0.50,color:'#f17432'},
        	{position:0.51,color:'#ea5507'},
        	{position:1.00,color:'#fb955e'}
        ],
        startRadius:{x:0,y:0},
        endRadius:{x:50,y:50}
   	}
	
	var record = {};
	// record.index = win.record.index;
	record.meat_val = Math.round(meatSlider.value);
	record.vegetable_val = Math.round(vegetableSlider.value);
	record.carb_val = Math.round(carbSlider.value);
	record.y_m_d = y_m_d;
	record.at = new Date();
	record.at.setHours(12); //日付がなぜかズレるのを防止c, record);
	Ti.App.fireEvent(win.func, record);
	win.close();
});


//-----------------------------------scroll_view----------------------------------------
//
// HORIZONTAL SCROLLING TABS
//
var scrollView = Titanium.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:'auto',
	top:290,
	height:70,
	width:320,
	backgroundColor:'#gray',
	zIndex:1
});

var scrollValueLabel = Titanium.UI.createLabel({
	text:0,
	top:180,
	left:260,
	font:{fontSize:20},
	color:'#red',
	width:'auto',
	textAlign:'center',
	zIndex:4
});

var allow = Titanium.UI.createLabel({
	text:"▼",
	font:{fontSize:20},
	color:'#gray',
	top:200,
	left:150,
	width:20,
	textAlign:'center',
	zIndex:3
});

function computeDate(year, month, day, addDays) {
    var dt = new Date(year, month - 1, day);
    var baseSec = dt.getTime();
    var addSec = addDays * 86400000;//日数 * 1日のミリ秒数
    var targetSec = baseSec + addSec;
    dt.setTime(targetSec);
    return dt;
}

//SDK 1.8に期待！
// scrollView.addEventListener('dragend', function(){
	// alert("dragend!");
// });

var pos_old = 0;
var time_old = new Date();

var labelNum = 30;
var labelWidth = 50;

function getData(record){
	if(record != null){
		win.func = "update_row";
		meatSliderLabel.text = 'meat value = ' + record.meat_val;
		meatSlider.value = record.meat_val;
		vegetableSliderLabel.text = 'vegetable value = ' + record.vegetable_val;
		vegetableSlider.value = record.vegetable_val;
		carbSliderLabel.text = 'carb value = ' + record.carb_val;
		carbSlider.value = record.carb_val;
	} else {
		win.func = "insert_row";
		meatSliderLabel.text = 'meat value = ' + 0;
		meatSlider.value = 0;
		vegetableSliderLabel.text = 'vegetable value = ' + 0;
		vegetableSlider.value = 0;
		carbSliderLabel.text = 'carb value = ' + 0;
		carbSlider.value = 0;
	}
}

Ti.include('record_db.js');
var db = new RecordDB();
var s_date_old = computeDate(Y, M, D, ((pos_old+25)/50)-labelNum);
old_Y = s_date_old.getYear()+1900
old_M = s_date_old.getMonth()+1
old_D = s_date_old.getDate();
var record = db.findOneByYMD(old_Y+"-"+old_M+"-"+old_D);
getData(record);

scrollView.addEventListener('scroll', function(e)
{
	scrollValueLabel.text = e.x;
	var pos = e.x;
	
	var s_date = computeDate(Y, M, D, ((pos+25)/50)-labelNum);
	var Y_ = s_date.getYear()+1900;
	var M_ = s_date.getMonth()+1;
	var D_ = s_date.getDate();
	y_m_d = Y_+"-"+M_+"-"+D_;
	
	if(y_m_d != y_m_d_old){
		var record = db.findOneByYMD(y_m_d);
		getData(record);
	}
	y_m_d_old = y_m_d;
	
	time = new Date();
	var time_diff = (time.getTime()-time_old.getTime());
	
	// if( time_diff < 200 && time_diff > 100 ){
	if( time_diff > 100 ){
		var pos_diff = Math.abs(pos - pos_old);
		
		var velocity = Math.round(pos_diff / time_diff * 1000);
		
		time_old = time;
		pos_old = pos;
		
		if(time_diff < 200 && velocity <  25){
			if(pos % 50 != 0){
				scrollView.scrollTo(Math.round(pos/50)*50,0);
			}
		}
	}
});

for(var i=labelNum+1; i>-4; i--){
	if(i < labelNum+1){
		var view = Ti.UI.createView({
			// backgroundColor:'#336699',
			borderColor:'#white',
			backgroundColor:'#A0522D',
			width:labelWidth,
			height:70,
			left: 135+labelWidth*(labelNum-i)
		});
		if(i == 0)
			view.backgroundColor = '#red';
		scrollView.add(view);
		var wdayLabel = Ti.UI.createLabel({
			font:{fontSize:13},
			color:'#fff',
			width:'auto',
			textAlign:'center',
			height:'auto',
			top:10
		});
		var date = computeDate(Y, M, D, -i);
		var w = ["火","水","木","金","土","日","月"];
		wdayLabel.text = w[date.getDay()];
		view.add(wdayLabel);
		var dateLabel = Ti.UI.createLabel({
			text: date.getDate(),
			font:{fontSize:13},
			color:'#fff',
			width:'auto',
			textAlign:'center',
			height:'auto',
			top:40
		});
		view.add(dateLabel);
	} else {
		var view = Ti.UI.createView({
			backgroundColor:'#gray',
			width:135,
			height:70, left:0
		});
		scrollView.add(view);
	}
}
win.add(scrollView);
win.add(scrollValueLabel);
win.add(allow);
	if (typeof fcolor == 'undefined') { var fcolor = "#E3E3E3";}
	if (typeof backcolor == 'undefined') { var backcolor = "#000000";}
	if (typeof textcolor == 'undefined') { var textcolor = "#000000";}
	if (typeof capcolor == 'undefined') { var capcolor = "#FFFFFF";}
	if (typeof closecolor == 'undefined') { var closecolor = "#9999FF";}
	if (typeof width == 'undefined') { var width = "200";}
	if (typeof border == 'undefined') { var border = "1";}
	if (typeof offsetx == 'undefined') { var offsetx = 10;}
	if (typeof offsety == 'undefined') { var offsety = 10;}

ns4 = (document.layers)? true:false
ie4 = (document.all)? true:false

if (ie4) {
	if (navigator.userAgent.indexOf('MSIE 5')>0) {
		ie5 = true;
	} else {
		ie5 = false; }
} else {
	ie5 = false;
}

var x = 0;
var y = 0;
var snow = 0;
var sw = 0;
var cnt = 0;
var dir = 1;
var tr = 1;
if ( (ns4) || (ie4) ) {
	if (ns4) over = document.overDiv
	if (ie4) over = overDiv.style
	document.onmousemove = mouseMove
	if (ns4) document.captureEvents(Event.MOUSEMOVE)
}

// Public functions to be used on pages.

// Simple popup right
function drs(text) {
	dts(1,text);
}

// Caption popup right
function drc(text, title) {
	dtc(1,text,title);
}

// Sticky caption right
function src(text,title) {
	stc(1,text,title);
}

// Simple popup left
function dls(text) {
	dts(0,text);
}

// Caption popup left
function dlc(text, title) {
	dtc(0,text,title);
}

// Sticky caption left
function slc(text,title) {
	stc(0,text,title);
}

// Simple popup center
function dcs(text) {
	dts(2,text);
}

// Caption popup center
function dcc(text, title) {
	dtc(2,text,title);
}

// Sticky caption center
function scc(text,title) {
	stc(2,text,title);
}

// Clears popups if appropriate
function nd() {
	if ( cnt >= 1 ) { sw = 0 };
	if ( (ns4) || (ie4) ) {
		if ( sw == 0 ) {
			snow = 0;
			hideObject(over);
		} else {
			cnt++;
		}
	}
}

// Non public functions. These are called by other functions etc.

// Simple popup
function dts(d,text) {
	txt = "<TABLE WIDTH="+width+" BORDER=0 CELLPADDING="+border+" CELLSPACING=0 BGCOLOR=\""+backcolor+"\"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 BGCOLOR=\""+fcolor+"\"><TR><TD><FONT FACE=\"Arial,Helvetica\" COLOR=\""+textcolor+"\" SIZE=\"-2\">"+text+"</FONT></TD></TR></TABLE></TD></TR></TABLE>"
	layerWrite(txt);
	dir = d;
	disp();
}

// Caption popup
function dtc(d,text, title) {
	txt = "<TABLE WIDTH="+width+" BORDER=0 CELLPADDING="+border+" CELLSPACING=0 BGCOLOR=\""+backcolor+"\"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=0 CELLSPACING=0><TR><TD><SPAN ID=\"PTT\"><FONT COLOR=\""+capcolor+"\">"+title+"</FONT></SPAN></TD></TR></TABLE><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 BGCOLOR=\""+fcolor+"\"><TR><TD><SPAN ID=\"PST\"><FONT COLOR=\""+textcolor+"\">"+text+"</FONT><SPAN></TD></TR></TABLE></TD></TR></TABLE>"
	layerWrite(txt);
	dir = d;
	disp();
}

// Sticky
function stc(d,text, title) {
	sw = 1;
	cnt = 0;
	txt = "<TABLE WIDTH="+width+" BORDER=0 CELLPADDING="+border+" CELLSPACING=0 BGCOLOR=\""+backcolor+"\"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=0 CELLSPACING=0><TR><TD><SPAN ID=\"PTT\"><FONT COLOR=\""+capcolor+"\">"+title+"</FONT></SPAN></TD><TD ALIGN=RIGHT><A HREF=\"/\" onMouseOver=\"cClick();\" ID=\"PCL\"><FONT COLOR=\""+closecolor+"\">Close</FONT></A></TD></TR></TABLE><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 BGCOLOR=\""+fcolor+"\"><TR><TD><SPAN ID=\"PST\"><FONT COLOR=\""+textcolor+"\">"+text+"</FONT><SPAN></TD></TR></TABLE></TD></TR></TABLE>"
	layerWrite(txt);
	dir = d;
	disp();
	snow = 0;
}

// Common calls
function disp() {
	if ( (ns4) || (ie4) ) {
		if (snow == 0) 	{
			if (dir == 2) { // Center
				moveTo(over,x+offsetx-(width/2),y+offsety);
			}
			if (dir == 1) { // Right
				moveTo(over,x+offsetx,y+offsety);
			}
			if (dir == 0) { // Left
				moveTo(over,x-offsetx-width,y+offsety);
			}
			showObject(over);
			snow = 1;
		}
	}
// Here you can make the text goto the statusbar.
}

// Moves the layer
function mouseMove(e) {
	if (ns4) {x=e.pageX; y=e.pageY;}
	if (ie4) {x=event.x; y=event.y;}
	if (ie5) {x=event.x+document.body.scrollLeft; y=event.y+document.body.scrollTop;}
	if (snow) {
		if (dir == 2) { // Center
			moveTo(over,x+offsetx-(width/2),y+offsety);
		}
		if (dir == 1) { // Right
			moveTo(over,x+offsetx,y+offsety);
		}
		if (dir == 0) { // Left
			moveTo(over,x-offsetx-width,y+offsety);
		}
	}
}

// The Close onMouseOver function for Sticky
function cClick() {
	hideObject(over);
	sw=0;
}

// Writes to a layer
function layerWrite(txt) {
        if (ns4) {
                var lyr = document.overDiv.document
                lyr.write(txt)
                lyr.close()
        }
        else if (ie4) document.all["overDiv"].innerHTML = txt
		//if (tr) { trk(); }
}

// Make an object visible
function showObject(obj) {
        if (ns4) obj.visibility = "show"
        else if (ie4) obj.visibility = "visible"
}

// Hides an object
function hideObject(obj) {
        if (ns4) obj.visibility = "hide"
        else if (ie4) obj.visibility = "hidden"
}

// Move a layer
function moveTo(obj,xL,yL) {
        obj.left = xL
        obj.top = yL
}
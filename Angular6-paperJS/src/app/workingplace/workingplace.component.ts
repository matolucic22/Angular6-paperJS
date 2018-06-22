
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { Project, Path, Point, Layer, Size, Rectangle, Event, Segment, Tool, PointText, project } from 'paper';
import {Router } from '@angular/router';
import {Location} from '@angular/common';
import { DataService } from '../data.service';


@Component({
  selector: 'app-workingplace',
  templateUrl: './workingplace.component.html',
  styleUrls: ['./workingplace.component.scss']
})
export class WorkingplaceComponent implements OnInit {
  
 project: Project;
 tool:Tool;
 route: string;
 sanitizer: DomSanitizer;
 segments: Object;
  
  
  @ViewChild('canvasElement') canvasElement: ElementRef
  downloadJsonHref: SafeUrl;
  
  constructor(location: Location, router:Router, private data:DataService) {
    router.events.subscribe((val) => {
      this.route = location.path();
  
    });
    
  }

  ngOnInit() {
    this.project=new Project(this.canvasElement.nativeElement); //project contains "paper object"-main object for clever scoping
       
    var tool =new Tool();

    if(this.route  =='')
    {
      tool.onMouseDown=function(event2)
      {
        tool.onMouseUp=function(event1)
        {
          var myPoint = new Point(event1.point.x, event1.point.y);
          var rectangle=new Rectangle(event1.point.x, event1.point.y, (event1.point.x-event2.lastPoint.x), (event1.point.y-event2.lastPoint.y));
          var path=new Path.Rectangle(rectangle);
          path.strokeColor='red';          
          path.rotate(180, myPoint); //rotate the rectangle with center point "myPoint"

        } 
      };
    }
    else if(this.route  =='/circle')
    {
      tool.onMouseUp=function(event)
      {
        var circle = new Path.Circle({
          center: event.middlePoint,
          radius: event.delta.length / 2,
          fillColor: 'blue'
        });
        
      };
    }
    else if(this.route  =='/freehand')
    {
      var path;
      tool.onMouseDown=function(event)
      {
        path=new Path();
        path.strokeColor='red';
      }
      tool.onMouseDrag=function(event)
      {
        path.add(event.point);
      }
    }
    else if(this.route  =='/bezier')
    {
        var myPath=new Path(); //bazier isn't implemented completed.**
        myPath.strokeColor='black';
      tool.onMouseDown=function(event)
      {
        myPath.add(event.point);
        myPath.smooth();
      }
    }
    else if(this.route  =='/closeandsimplypolygon')
    {
      path = new Path();
      path.strokeColor='blue';
      tool.onMouseDown=function(event)
      {
        path.add(event.point);
        path.closed = true;
      }
      path.onDoubleClick=function(event)
      {
        path.simplify();
      }
    }
    else if(this.route  =='/moveaddsegpolygon')
    {
      var polygon = new Path.RegularPolygon(new Point(200, 100), 10, 50);//create some polygon
      polygon.style = {//set style of this rectangle
        fillColor: 'white',
        strokeColor: 'black'
      };

      polygon.onDoubleClick=function(event) {
        var segment=new Segment(event.point);
        polygon.add(segment);//adding aditional segment points to polygon on double click
      }

      //manipulation with polygon 
      polygon.onMouseDown=function(event)//on mouse down set bounds and selected stroke
      {
        polygon.bounds;
        polygon.selected=true;
      }
      polygon.onMouseDrag=function(event)//drag to some position
      {
        polygon.position=event.point;
      }
      polygon.onMouseUp=function(event)//leave path element at some position on mouse up
      {
        polygon.strokeColor='black';
        polygon.selected=false;
      }
    }
    else if(this.route  =='/editpolygon')
    {
      var polygon = new Path.RegularPolygon(new Point(200, 100), 8, 50);//create some polygon
      polygon.style = {//set style of this polygon
        fillColor: 'white',
        strokeColor: 'black'
      };
      
      polygon.onClick=function(event)
      {
        var copiedpolygon=polygon.clone(); 
        var copiedpolygon2=copiedpolygon.clone();
        polygon.fillColor='red'

        copiedpolygon.scale(0.7);
        copiedpolygon.fillColor='white';
        
        copiedpolygon2.scale(0.4);
        copiedpolygon2.fillColor='blue';

        polygon.onFrame=function(event)
        {
          polygon.rotate(1);
          copiedpolygon.rotate(1);
          copiedpolygon2.rotate(1);
        }
        var text = new PointText(new Point(187, 104));
        text.fillColor = 'red';

        // Set the content of the text item:
        text.content = 'CRO'; //cro-fun polygon
      }
    }
    else if(this.route  =='/layers')
    {
      var polygon = new Path.RegularPolygon(new Point(250, 150), 9, 50);//create some polygon
      polygon.fillColor='red'
      polygon.strokeColor='black';
      
      tool.onMouseDown=function(event)
      {
        var polygon2= new Path.RegularPolygon(event.point, 9, 50);
        polygon2.fillColor='blue';
        polygon2.strokeColor='black';

        project.activeLayer.insertChild(0, polygon2);//insert new polygon at 0 index. So in layer array, new polygon is always below old polygon.
        
      }
      
    }
    else if(this.route  =='/import')
    {
      this.data.getAllSegments().subscribe(data=>this.segments=data);//response from server - data.
      ///strokeColor
      //import data to canvas with .importJSON(json)
      //more - Architectural_overview_and_comment
    }
}
  
   save() //button call this method
    {
        var json=project.activeLayer.exportJSON({ asString: true, precision: 1 });
        
       // var segments= json[1].children["0"][1].segments; //export argument
       // var strokeColor=json[1].children["0"][1].strokeColor; //export argument
        this.data.postPolygon(json).subscribe(data => {alert("Data succesfully added")},Error => {alert("Failed while adding data")});//example of post request  
    }
   
}
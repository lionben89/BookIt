import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BookIt App';
  

  constructor(public auth: AuthService) {
  }
}


/* typscript ex
let a : boolean;
a=true;
enum v {a,b,c};
console.log(v.a);
let message='abc';
let end = (<string>message).endsWith('c');
let end2= (message as string).endsWith('c');
interface Point {
  x:number,
  y:number
}
let log = ( m : Point)=>{
  console.log(m);
  return;
}
log ({x:1,y:2});
let p :Point;
p.x=1;
p.y=2;
p={x:1,y:2};

class Point2{
  private _x: number;
  private _y:number;
  constructor(_x?,_y?){
    //this.x=x;
    //this.y=y;
  }
  getDistance(){
    return this._x + this._y;
  }
  get x(){
    return this._x;
  }
  set y(y:number){
    this._y=y;
  }
}

let py= new Point2(1,2);
py.getDistance();
console.log(py.x);*/

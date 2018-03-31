import {Component} from '@angular/core'
import { CoursesService } from './courses.service';


@Component({
    selector:'courses',//<courses>,
    template:
    `<div>
        <ul>
            <li *ngFor="let course of courses">
                {{course}}
            </li>
        </ul>           
    </div>`
})
export class CoursesComponent{
    private _courses;
constructor(coursesService: CoursesService){
    this._courses=coursesService.getCourses();
}
    get courses(){
        return this._courses;
    }

}
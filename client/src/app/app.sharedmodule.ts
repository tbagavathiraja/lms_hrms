import { NgModule } from '@angular/core';
import { dateFormatPipe,skipUnderScore,removeSpaces,capitalise,numberFixedLen,normalDate,keyValues,toPercent,Pairs } from './app.filter';
import { OnlyNumber,CloseMenuDirective } from './app.directive';

@NgModule({
    declarations: [dateFormatPipe,skipUnderScore,removeSpaces,capitalise,numberFixedLen,normalDate,keyValues,toPercent,Pairs,OnlyNumber,CloseMenuDirective],
    imports: [],
    exports: [dateFormatPipe,skipUnderScore,removeSpaces,capitalise,numberFixedLen,normalDate,keyValues,toPercent,Pairs,OnlyNumber,CloseMenuDirective]
})
export class SharedModule{
    static forRoot() {
        return {
            ngModule: SharedModule,
            providers: []
        }
    }
}
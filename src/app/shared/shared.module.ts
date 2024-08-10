import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleDirective } from './directives/circle/circle.directive';
import { SkeletonComponent } from './components/skeleton/skeleton.component';

@NgModule({
  declarations: [CircleDirective, SkeletonComponent],
  imports: [CommonModule],
  exports: [SkeletonComponent, CircleDirective],
})
export class SharedModule {}

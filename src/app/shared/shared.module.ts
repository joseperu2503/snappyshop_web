import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleDirective } from './directives/circle/circle.directive';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { PageComponent } from './components/page/page.component';

@NgModule({
  declarations: [CircleDirective, SkeletonComponent, PageComponent],
  imports: [CommonModule],
  exports: [SkeletonComponent, CircleDirective, PageComponent],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { AlertButtonComponent } from './alert-button/alert-button';
import { BatchComponent } from './batch/batch';
import { OrgianComponent } from './orgian/orgian';
@NgModule({
	declarations: [AlertButtonComponent,
    BatchComponent,
    OrgianComponent],
	imports: [],
	exports: [AlertButtonComponent,
    BatchComponent,
    OrgianComponent]
})
export class ComponentsModule {}

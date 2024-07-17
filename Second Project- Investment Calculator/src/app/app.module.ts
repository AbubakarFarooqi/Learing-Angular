import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { InvestementResultComponent } from "./investement-result/investement-result.component";
import { UserInputComponent } from "./user-input/user-input.component";
import { HeaderComponent } from "./header/header.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    declarations:[
        AppComponent,
        HeaderComponent,
        UserInputComponent,
        InvestementResultComponent
    ],
    imports:[FormsModule,BrowserModule],
    bootstrap:[AppComponent]
})

export class AppModule{}
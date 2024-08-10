import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button[customButton]',
  standalone: true,
  imports: [],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css',
  host: {
    class: 'rounded-3xl w-36 p-3 pl-6 pr-6 border-2',
  },
})
export class CustomButtonComponent implements OnInit {
  ngOnInit(): void {
    if (this.customClass) {
      this.classes = this.classes + ' ' + this.customClass;
    }
    if (this.mode === 'dark') {
      this.classes =
        this.classes + ' ' + 'bg-black text-white border-white-400';
    } else if (this.mode === 'light') {
      this.classes = this.classes + ' ' + 'bg-white text-black border-gray-400';
    }
  }
  @HostBinding('class') classes: string = '';
  @Input() customClass?: string;
  @Input({ required: true }) mode!: 'dark' | 'light';
}

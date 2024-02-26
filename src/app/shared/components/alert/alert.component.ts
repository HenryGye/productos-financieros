import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  public message!: string | null;
  private subscription = new Subscription;

  constructor(private sharedService: SharedService) {}
  
  ngOnInit(): void {
    this.subscription = this.sharedService.getAlert().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeAlert(): void {
    this.sharedService.clearAlert();
  }
}

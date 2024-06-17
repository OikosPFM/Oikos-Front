import { Component, OnInit, OnDestroy } from '@angular/core';
import { FullcalendarComponent } from '../../layout/main/fullcalendar/fullcalendar.component';
import { CreateEventModalComponent } from '../../layout/create-event-modal/create-event-modal.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/auth/loginRequest';
import { User } from '../../../services/auth/user';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FullcalendarComponent, CreateEventModalComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit , OnDestroy  {
  showCreateEventModal: boolean = false;

  openCreateEventModal() {
    this.showCreateEventModal = true;
  }

  closeModal() {
    this.showCreateEventModal = false;
  }
  userLoginOn:boolean=false;
  userData?:User;
  constructor(private loginService:LoginService) { }

  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.loginService.currentUserData.subscribe({
      next:(userData)=>{
        this.userData=userData;
      }
    })

  }

}

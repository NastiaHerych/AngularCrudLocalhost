import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteWorkerComponent } from '../../dialogs/delete-worker/delete-worker.component';
import { UpdateWorkerComponent } from '../../dialogs/update-worker/update-worker.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(public dialog: MatDialog, public snackBar: MatSnackBar) {}

  workerArr: any[] = [];
  workerArrNew: any[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('workersList');
    if (localData !== null) {
      this.workerArr = JSON.parse(localData);
    }

    setInterval(() => {
      const localData = localStorage.getItem('workersList');
      if (localData !== null) {
        this.workerArrNew = JSON.parse(localData);
        if (
          JSON.stringify(this.workerArr) !== JSON.stringify(this.workerArrNew)
        ) {
          this.workerArr = JSON.parse(localData);
        }
      }
    }, 2000);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  updateWorker(worker: any): void {
    const dialogRef = this.dialog.open(UpdateWorkerComponent, {
      width: '350px',
      data: {
        workerId: worker.workerId,
        firstName: worker.firstName,
        lastName: worker.lastName,
        email: worker.email,
        position: worker.position,
        salary: worker.salary,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  deleteWorker(id: any) {
    const dialogRef = this.dialog.open(DeleteWorkerComponent, {
      data: {
        message: 'Do you want to delete?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        for (let i = 0; i < this.workerArr.length; i++) {
          if (this.workerArr[i].workerId == id) {
            this.workerArr.splice(i, 1);
          }
        }
        localStorage.setItem('workersList', JSON.stringify(this.workerArr));
        this.openSnackBar('deleted successfully', 'ok');
      } else {
        this.openSnackBar('error while deleting', 'ok');
      }
    });
  }
}

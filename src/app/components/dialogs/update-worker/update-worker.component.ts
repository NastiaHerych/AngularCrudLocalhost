import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-worker',
  templateUrl: './update-worker.component.html',
  styleUrls: ['./update-worker.component.scss'],
})
export class UpdateWorkerComponent implements OnInit {
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateWorkerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  workerData = this.data;
  updateForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    position: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
  });

  workerArr: any[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('workersList');
    if (localData !== null) {
      this.workerArr = JSON.parse(localData);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  updateWorker() {
    const currentWorker = this.workerArr.find(
      (worker) => worker.workerId == this.workerData.workerId
    );
    currentWorker.firstName = this.workerData.firstName;
    currentWorker.lastName = this.workerData.lastName;
    currentWorker.email = this.workerData.email;
    currentWorker.position = this.workerData.position;
    currentWorker.salary = this.workerData.salary;

    localStorage.setItem('workersList', JSON.stringify(this.workerArr));
    this.dialogRef.close();
    this.openSnackBar('updated successfully', 'ok');
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.openSnackBar('updating canceled', 'ok');
  }
}

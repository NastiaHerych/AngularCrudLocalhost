import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.scss'],
})
export class AddWorkerComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddWorkerComponent>,
    public snackBar: MatSnackBar
  ) {}

  addForm = new FormGroup({
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

  workerObj = {
    workerId: 0,
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    salary: '',
  };

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

  addWorker(data: any) {
    this.workerObj.workerId = Math.floor(100000 + Math.random() * 900000);
    this.workerArr.push(this.workerObj);
    localStorage.setItem('workersList', JSON.stringify(this.workerArr));
    this.dialogRef.close();
    this.openSnackBar('created successfully', 'ok');
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.openSnackBar('creating canceled', 'ok');
  }
}

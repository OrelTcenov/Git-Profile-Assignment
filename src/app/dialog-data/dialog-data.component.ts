import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dialog-data',
  templateUrl: './dialog-data.component.html',
  styleUrls: ['./dialog-data.component.css'],
})
export class DialogDataComponent implements OnInit {
  dataSource = new MatTableDataSource<[]>();
  tableData = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'Name',
    'Private',
    'Size',
    'Watchers',
    'Forks',
    'Open_issues',
    'Language',
  ];

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      avatar: '';
      email: '';
      repos: '';
      company: '';
      following: '';
      followers: '';
      repos_count: '';
      acountTime: '';
    }
  ) {}

  ngOnInit(): void {
    this.getRepos();
  }

  //Get the Repos data from JSON
  async getRepos() {
    await this.http
      .get<any>(this.data.repos)
      .toPromise()
      .then((data) => {
        this.data.repos_count = data.length;
        this.dataSource.data = data; //Update the table
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; //Paginator
  }
}

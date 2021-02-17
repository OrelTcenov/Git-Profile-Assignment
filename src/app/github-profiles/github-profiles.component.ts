import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogDataComponent } from '../dialog-data/dialog-data.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-github-profiles',
  templateUrl: './github-profiles.component.html',
  styleUrls: ['./github-profiles.component.css'],
  providers: [DialogDataComponent],
})
export class GithubProfilesComponent implements OnInit {
  dataUrl = 'https://api.github.com/users';
  Data = new MatTableDataSource<[]>();
  tableData = [];
  dialogData;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'Id',
    'Avatar_url',
    'Name',
    'Following',
    'Followers',
  ];

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  //Get the user info for the table
  async getTableInfo() {
    await this.http
      .get(this.dataUrl)
      .toPromise()
      .then(async (data) => {
        for (var i = 0; i < Object.keys(data).length; i++) {
          await this.http
            .get(data[i].url)
            .toPromise()
            .then((Tdata) => {
              this.tableData.push(Tdata);
              this.Data.data = this.tableData; //Update the table data
            });
        }
      });
  }

  //Open dialog with the user info
  getInfo(info) {
    this.dialog.open(DialogDataComponent, {
      height: '60%',
      width: '100%',
      data: {
        avatar: info.avatar_url,
        email: info.email,
        repos: info.repos_url,
        company: info.company,
        following: info.following,
        followers: info.followers,
        acountTime: this.calcDate(info.created_at),
      },
    });
  }

  //Calculate how long the user has an account
  calcDate(dateCreated) {
    var currDate = new Date();
    var createdate = new Date(dateCreated);
    var diff = Math.floor(currDate.getTime() - createdate.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days_total = Math.floor(diff / day);

    var years = Math.floor(days_total / 365);
    var months = Math.floor((days_total - 365 * years) / 31);
    var days = days_total - 365 * years - 31 * months;

    var message = '';

    message += years + ' years ' + months + ' months and ' + days + ' days';

    return message;
  }

  //Searches for a specific profile
  doFilter = (value: string) => {
    this.Data.filter = value.trim().toLocaleLowerCase();
  };

  ngOnInit(): void {
    this.getTableInfo();
  }

  ngAfterViewInit(): void {
    this.Data.paginator = this.paginator;
  }
}

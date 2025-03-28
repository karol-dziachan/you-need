import {Component, OnInit} from '@angular/core';
import {Card} from 'primeng/card';
import {FloatLabel} from 'primeng/floatlabel';
import {TreeSelect} from 'primeng/treeselect';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs';
import {TreeNode} from 'primeng/api';

interface Branch {
  id: number;
  nameEn: string;
  namePl: string;
  children: Branch[];
}




@Component({
  selector: 'app-register-branch',
  imports: [
    Card,
    FloatLabel,
    TreeSelect
  ],
  templateUrl: './register-branch.component.html',
  styleUrl: './register-branch.component.scss'
})
export class RegisterBranchComponent implements OnInit {

  branches?: TreeNode[];

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get<Branch[]>(`${environment.apiUrl}/branch`).pipe(
      tap((response ) => {
        this.branches = this.prepareBranches(response) ?? undefined;
      })
      ).subscribe();
  }

  protected readonly JSON = JSON;

  prepareBranches(branches: Branch[]): TreeNode<number>[] {
    return branches.map(branch => {
      return {
        key: branch.id.toString(),
        selectable: !branch.children,
        label: branch.namePl,
        data: branch.id,
        children: branch.children ? this.prepareBranches(branch.children) : [],
      };
    });
  }
}

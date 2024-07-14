import { Component, inject, Input, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { selectPostsByUserName } from 'src/app/state';
import { IPost } from 'src/app/entities/post';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { toggleLike } from 'src/app/state/post.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  imports: [PostComponent, NgFor, AsyncPipe],
  standalone: true
})
export class PostsListComponent implements OnInit {

  @Input() username!: string;

  store = inject(Store);

  posts$!: Observable<IPost[]>;

  ngOnInit(): void {
    this.posts$ = this.store.select(selectPostsByUserName(this.username));
  }

  onLikeToggle(id: number, like: boolean) {
    this.store.dispatch(toggleLike({ id, like }));
  }
}

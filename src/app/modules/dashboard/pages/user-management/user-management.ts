import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, finalize, filter } from 'rxjs';
import { UserService } from '../../../../core/services/user.service';
import { DbUser } from '../../../../core/contracts/user.contracts';
import {
  ConfirmationModalComponent,
  ConfirmationData,
} from '../../../../shared/components/confirmation-modal/confirmation-modal';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatIcon],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementPage implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);
  private destroy$ = new Subject<void>();

  users = signal<DbUser[]>([]);
  totalCount = signal<number>(0);
  loading = signal<boolean>(false);
  initialLoading = signal<boolean>(true);
  currentPage = signal<number>(1);
  pageSize = 10;

  // Current logged-in user for role-based button visibility
  currentUser = signal<DbUser | null>(null);

  searchControl = new FormControl('');

  ngOnInit() {
    this.userService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.currentUser.set(user);
    });
    this.setupSearch();
    this.loadUsers();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch() {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.resetPagination();
        this.loadUsers();
      });
  }

  private resetPagination() {
    this.users.set([]);
    this.currentPage.set(1);
    this.totalCount.set(0);
  }

  loadUsers() {
    if (this.loading()) return;

    this.loading.set(true);
    const search = this.searchControl.value || '';

    this.userService
      .getAllUsers(search, this.currentPage(), this.pageSize)
      .pipe(
        finalize(() => {
          this.loading.set(false);
          this.initialLoading.set(false);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => {
          this.users.update((prev) => [...prev, ...response.Items]);
          this.totalCount.set(response.TotalCount);
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        },
      });
  }

  hasMore(): boolean {
    return this.users().length < this.totalCount();
  }

  loadMore() {
    if (this.hasMore()) {
      this.currentPage.update((p) => p + 1);
      this.loadUsers();
    }
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return !!user?.Roles?.some((r) => r.toLowerCase() === 'admin');
  }

  isReceptionist(): boolean {
    const user = this.currentUser();
    return !!user?.Roles?.some((r) => r.toLowerCase() === 'receptionist');
  }

  userHasRole(user: DbUser, role: 'admin' | 'receptionist'): boolean {
    return !!user.Roles?.some((r) => r.toLowerCase() === role);
  }

  getUserRoleLabel(user: DbUser): string {
    if (!user.Roles || user.Roles.length === 0) return 'Patient';
    const roles = user.Roles.map((r) => r.toLowerCase());
    if (roles.includes('admin')) return 'Admin';
    if (roles.includes('receptionist')) return 'Receptionist';
    return 'Patient';
  }

  getRoleBadgeClass(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'receptionist':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  }

  getUserRoleBadgeClass(user: DbUser): string {
    const label = this.getUserRoleLabel(user);
    switch (label) {
      case 'Admin':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Receptionist':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  }

  assignRole(user: DbUser, role: 'admin' | 'receptionist') {
    const roleLabel = role === 'admin' ? 'Admin' : 'Receptionist';
    const confirmData: ConfirmationData = {
      title: `Make ${roleLabel}`,
      message: `Are you sure you want to assign the "${roleLabel}" role to ${user.Name}?`,
      confirmLabel: `Yes, Make ${roleLabel}`,
      confirmColor: role === 'admin' ? 'indigo' : 'green',
    };

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '450px',
      data: confirmData,
      panelClass: 'custom-dialog-container',
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => !!result))
      .subscribe(() => {
        this.userService.patchUserRoles(user.Email, [role], []).subscribe({
          next: () => {
            this.toastr.success(`${user.Name} is now a ${roleLabel}!`);
            this.resetPagination();
            this.loadUsers();
          },
          error: () => {
            this.toastr.error('Something went wrong! Please try again.');
          },
        });
      });
  }

  removeRole(user: DbUser, role: 'admin' | 'receptionist') {
    const roleLabel = role === 'admin' ? 'Admin' : 'Receptionist';
    const confirmData: ConfirmationData = {
      title: `Remove ${roleLabel} Role`,
      message: `Are you sure you want to remove the "${roleLabel}" role from ${user.Name}?`,
      confirmLabel: `Yes, Remove`,
      confirmColor: 'red',
    };

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '450px',
      data: confirmData,
      panelClass: 'custom-dialog-container',
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => !!result))
      .subscribe(() => {
        this.userService.patchUserRoles(user.Email, [], [role]).subscribe({
          next: () => {
            this.toastr.success(`"${roleLabel}" role removed from ${user.Name}.`);
            this.resetPagination();
            this.loadUsers();
          },
          error: () => {
            this.toastr.error('Something went wrong! Please try again.');
          },
        });
      });
  }
}

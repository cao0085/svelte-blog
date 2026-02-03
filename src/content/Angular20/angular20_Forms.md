---
title: "Forms"
date: "2026-02-02"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular", "route"]
slug: "angular_reactive"
---
###### Angular20 用 Reactive forms 比較多

---

### Reactive Forms

操作簡單，拿內建 API new 雙向綁定物件

```ts
import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css'],
  imports: [ReactiveFormsModule],
})
export class NameEditorComponent {
  name = new FormControl('');
  updateName() {
    this.name.setValue('Nancy');
  }
}
```

```html
<!-- 綁定值 -->
  <label for="name">Name: </label>
  <input id="name" type="text" [formControl]="name">
  <button type="button" (click)="updateName()">Update Name</button>
<!-- 純顯示 -->
  <p>Value: {{ name.value }}</p>
```

表單組

```ts
import {Component} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
  imports: [ReactiveFormsModule],
})
export class ProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
    }),
  });
  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
```

```html
<form [formGroup]="profileForm">
  <label for="first-name">First Name: </label>
  <input id="first-name" type="text" formControlName="firstName" />
  <label for="last-name">Last Name: </label>
  <input id="last-name" type="text" formControlName="lastName" />
<!-- ... -->
</form>

<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">

<p>Complete the form to enable button.</p>
<button type="submit" [disabled]="!profileForm.valid">Submit</button>
```

DI 注入

```ts
import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {FormArray} from '@angular/forms';
@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
  imports: [ReactiveFormsModule],
})
export class ProfileEditorComponent {
  private formBuilder = inject(FormBuilder);
  profileForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    aliases: this.formBuilder.array([this.formBuilder.control('')]),
  });
  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }
  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }
  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }
}
```

驗證規則

```ts
import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Validators} from '@angular/forms';
import {FormArray} from '@angular/forms';
import {JsonPipe} from '@angular/common';
@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
  imports: [ReactiveFormsModule, JsonPipe],
})
export class ProfileEditorComponent {
  private formBuilder = inject(FormBuilder);
  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    aliases: this.formBuilder.array([this.formBuilder.control('')]),
  });
  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }
  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }
  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
```

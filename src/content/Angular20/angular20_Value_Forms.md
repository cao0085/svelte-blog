---
title: "Value Control - Forms"
date: "2025-10-14"
category: "software"
subCategory: "Angular20"
tags: ["frontend", "angular", "forms"]
slug: "angular_reactive"
---
###### Angular20 用 Reactive Forms 比較多，透過 API 建立雙向綁定的表單物件

---

### FormControl

單一欄位，`new FormControl('')` 建立綁定物件

```ts
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
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
<input id="name" type="text" [formControl]="name" />
<button type="button" (click)="updateName()">Update Name</button>
<!-- 純顯示 -->
<p>Value: {{ name.value }}</p>
```

---

### FormGroup

表單組，用 `FormGroup` 包多個 `FormControl`，可巢狀

```ts
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
})
export class ProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
    }),
  });

  updateProfile() {
    // patchValue 只更新指定欄位
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: { street: '123 Drew Street' },
    });
  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }
}
```

```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
  <input type="text" formControlName="firstName" />
  <input type="text" formControlName="lastName" />

  <div formGroupName="address">
    <input type="text" formControlName="street" />
    <input type="text" formControlName="city" />
  </div>

  <button type="submit" [disabled]="!profileForm.valid">Submit</button>
</form>
```

---

### FormBuilder

DI 注入 `FormBuilder`，語法更簡潔，可搭配 `FormArray` 和 `Validators`

```ts
import { inject } from '@angular/core';
import { FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
})
export class ProfileEditorComponent {
  private fb = inject(FormBuilder);

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
    }),
    aliases: this.fb.array([this.fb.control('')]),
  });

  // FormArray getter
  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }
}
```

```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
  <input type="text" formControlName="firstName" />

  <div formArrayName="aliases">
    @for (alias of aliases.controls; track $index) {
      <input type="text" [formControlName]="$index" />
    }
  </div>

  <button (click)="addAlias()">Add Alias</button>
  <button type="submit" [disabled]="!profileForm.valid">Submit</button>
</form>
```

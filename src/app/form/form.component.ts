import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
export interface Country {
  name: string;
  code: string;
}

export interface City {
  name: string;
  country: string;
}
export interface Child {
  firstNameChild: string | null;
  middleNameChild: string | null;
  lastNameChild: string | null;
  birthdayChild: Date | null;
}
export interface dataSource {
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: Date;
  country: string;
  city: string;
  email: string;
  gender: string;
  children: Child[];
  message: string;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public added: boolean = true;
  public listCountry: Country[] = [
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montserrat', code: 'MS' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
  ];
  public listGender = ['Female', 'Male'];
  public listCity: City[] = [
    {
      name: 'Boston',
      country: 'US',
    },
  ];
  globalForm!: FormGroup;

  public description: string =
    "  In Angular, FormBuilder, FormControl, and FormGroup are core classes in\
    '@angular/forms' that simplify building and managing reactive forms. Here's an \
    explanation of each and an example of how to use them together";

  public dataSource: dataSource[] = [];
  constructor(private fb: FormBuilder) {
    // Push the FormGroup into the FormArray
    const array: Child[] = [
      {
        firstNameChild: null,
        middleNameChild: null,
        lastNameChild: null,
        birthdayChild: null,
      },
    ];
    const formChildren = this.handleFormChild(array);
    // Using FormBuilder to construct the FormGroup
    this.globalForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      middleName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      birthday: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      children: formChildren,
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit() {}

  // handle formChildren
  handleFormChild(arrayChild: Child[] | any) {
    // Define the type for the child form group
    type ChildFormGroup = FormGroup<{
      firstNameChild: FormControl<string | null>;
      middleNameChild: FormControl<string | null>;
      lastNameChild: FormControl<string | null>;
      birthdayChild: FormControl<Date | null>;
    }>;

    // Initialize the FormArray with the correct type
    const formChildren = new FormArray<ChildFormGroup>([]);
    arrayChild.forEach((elm: Child) => {
      // Create a FormGroup with typed FormControls
      const form = new FormGroup({
        firstNameChild: new FormControl<string | null>(elm?.firstNameChild, [
          Validators.required,
          Validators.minLength(3),
        ]),
        middleNameChild: new FormControl<string | null>(elm?.middleNameChild, [
          Validators.minLength(3),
        ]),
        lastNameChild: new FormControl<string | null>(elm?.lastNameChild, [
          Validators.required,
          Validators.minLength(3),
        ]),
        birthdayChild: new FormControl<Date | null>(elm?.birthdayChild, [
          Validators.required,
        ]),
      });
      formChildren.push(form);
    });
    return formChildren;
  }

  // get list children
  get listChildren() {
    return this.globalForm.get('children') as FormArray;
  }

  // add child to list Children
  addChild() {
    const form = new FormGroup({
      firstNameChild: new FormControl<string | null>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      middleNameChild: new FormControl<string | null>('', [
        Validators.minLength(3),
      ]),
      lastNameChild: new FormControl<string | null>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      birthdayChild: new FormControl<string | null>('', [Validators.required]),
    });
    this.listChildren.push(form);
  }

  // remove child from list Children
  removeChild(index: number) {
    this.listChildren.removeAt(index);
  }

  // Submit button
  Submit() {
    if (this.dataSource.length == 1) {
      window.alert('You can added one element for testing.');
      return;
    }
    this.dataSource.push(this.globalForm.value);
    this.globalForm.reset();
  }

  // Update button
  Update(index: number) {
    let data = this.dataSource.at(index);
    const formChildren = this.handleFormChild(data?.children);
    this.globalForm = this.fb.group({
      firstName: [
        data?.firstName,
        [Validators.required, Validators.minLength(3)],
      ],
      middleName: [
        data?.middleName,
        [Validators.required, Validators.minLength(3)],
      ],
      lastName: [
        data?.lastName,
        [Validators.required, Validators.minLength(3)],
      ],
      birthday: [data?.birthday, [Validators.required]],
      country: [data?.country, [Validators.required]],
      city: [data?.city, [Validators.required]],
      email: [data?.email, [Validators.required, Validators.email]],
      gender: [data?.gender, [Validators.required]],
      children: formChildren,
      message: [data?.message, [Validators.required, Validators.minLength(10)]],
    });
    this.added = false;
  }

  // Remove button
  Remove(index: number) {
    this.dataSource.splice(index, 1);
  }

  // Edit element in Array
  Edit() {
    this.dataSource.splice(0, 1, this.globalForm.value);
    this.globalForm.reset();
    this.added = true;
  }
}

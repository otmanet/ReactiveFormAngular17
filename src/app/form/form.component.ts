import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
export interface country {
  name: string;
  code: string;
}

export interface city {
  name: string;
  country: string;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public added: boolean = true;
  public listCountry: country[] = [
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montserrat', code: 'MS' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
  ];
  public listGender = ['Female', 'Male'];
  public listCity: city[] = [
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

  constructor(private fb: FormBuilder) {
    // Define the type for the child form group
    type ChildFormGroup = FormGroup<{
      firstNameChild: FormControl<string | null>;
      middleNameChild: FormControl<string | null>;
      lastNameChild: FormControl<string | null>;
      birthdayChild: FormControl<string | null>;
    }>;

    // Initialize the FormArray with the correct type
    const formChildren = new FormArray<ChildFormGroup>([]);

    // Create a FormGroup with typed FormControls
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

    // Push the FormGroup into the FormArray
    formChildren.push(form);
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
    console.log('value come from the form', this.globalForm.value);
  }
}

import { Component, forwardRef, OnInit } from "@angular/core";
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators
} from "@angular/forms";
import { Subscription } from "rxjs";
export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: number;
}

@Component({
  selector: "app-profile-form",
  templateUrl: "./profile-form.component.html",
  styleUrls: ["./profile-form.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    }
  ]
})
export class ProfileFormComponent implements ControlValueAccessor {
  form: FormGroup;
  subscriptions: Subscription[] = [];

  get value(): ProfileFormValues {
    return this.form.value;
  }

  set value(value: ProfileFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }
  get emailControl() {
    return this.form.controls.email;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      firstName: [],
      lastName: [],
      email: ["", Validators.required]
    });
    // In the constructor, we listen for our inner form values and the trigger the control to update that the form value has changed.
    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
    if (value == null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  // communicate the inner form validation to the parent form
  validate(_: FormControl) {
    return this.form.valid ? null : { profile: { valid: false } };
  }
}

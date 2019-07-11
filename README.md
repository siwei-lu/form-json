# Form JSON [![CircleCI](https://circleci.com/gh/IdanLoo/form-json/tree/master.svg?style=svg)](https://circleci.com/gh/IdanLoo/form-json/tree/master)

Converts an HTMLFormElement to a typed JavaScript object.

## How to use

1. Install

   ```bash
   npm install --save form-json
   ```

2. Import and use it

   ```javascript
   import formJson from 'form-json'

   const form = document.forms[0]
   const obj = formJson(form)

   // print the obj converted by the form
   console.log(obj)
   ```

## Why JSON

Though we already have FormData to send form data asynchronously, there are still many reasons to convert form elements to json objects.

- Some APIs only accept the `application/json` content type.
- You want to change the structure of the form data.
- You don't want to handle the form data especially.
- You don't want to lose the the type information of fields.

Anyway, I wrote this library for the above reasons.

## Usage

- If there are multiple fields with the same name, they will be combined into one array.

  ```html
  <form>
    <input type="text" name="hobbies" value="singing" />
    <input type="text" name="hobbies" value="dancing" />
  </form>
  ```

  So this form will be parsed to `{ hobbies: ['singing', 'dancing'] }`

- It can understand nested keys even containing arrays, so it's fine to do this.

  ```html
  <form>
    <input type="text" name="name.first" value="Idan" />
    <input type="text" name="name.last" value="Loo" />
    <input type="email" name="info.contacts" value="im@siwei.lu" />
    <input type="phone" name="info.contacts" value="it's a secret" />
  </form>
  ```

  This form will be parsed to

  ```javascript
  {
      name: {
          first: 'Idan',
          last: 'Loo'
      },
      info: {
          contacts: [
              'im@siwei.lu',
              "it's a secret"
          ]
      }
  }
  ```

- It automatically converts `['number', 'range']` types to `Number`, and `['date', 'month']` types to `Date`.

  ```html
  <form>
    <input type="range" name="speed" value="50" />
    <input type="number" name="age" value="23" />
    <input type="month" name="month" value="2019-07" />
    <input type="date" name="date" value="2019-07-10" />
  </form>
  ```

  This form will be parsed to

  ```javascript
  {
    range: 50,
    age: 23,
    month: new Date('2019-07'),
    date: new Date('2019-07-10')
  }
  ```

- It uses `form.elements` to get form elements, which means it doesn't care about the sturecture of the form, but the form elements such as `input`, `select`.

  ```html
  <form>
    <label> Name: <input type="text" name="name" value="Idan Loo" /> </label>
    <label>
      Location:
      <select name="contact.location" value="China">
        <option value="China">China</option>
        <option value="US">The US</option>
        <option value="UK">The UK</option>
      </select>
    </label>
  </form>
  ```

  This form is acceptable and parsed to

  ```javascript
  {
    name: 'Idan Loo',
    location: 'China'
  }
  ```

- The value of a file input will be an useless fake path.
  ```html
  <!-- You cannot convert this form because of the file input -->
  <form>
    <input type="file" name="photo" />
  </form>
  ```

## Use With React

If you are using some modern front-end libraries such as React, Vue, Angular, you probably know that almost all of these libraries don't recommend modifying DOM nodes directyly. So you have to get the form DOM through some tricks.

- Listen to the onSubmit event (Recommend)

  ```jsx
  import formJson from 'form-json'

  const Form = () => {
    const handleSubmit = (e) => {
      // Bingo
      const json = formJson(e.currentTarget)
    }

    return (
      <form onSubmit={handleSubmit}>
        <!-- some elements -->
      </form>
    )
  }
  ```

- Use `createRef`

  ```jsx
  import React, { createRef } from 'react'
  import formJson from 'form-json'

  const Form = () => {
    const formRef = createRef()

    const handleSomeEvent = () => {
      // Bingo
      const json = formJson(formRef.current)
    }

    return (
      <form ref={formRef}>
        <!-- some elements -->
      </form>
    )
  }
  ```

Pretty Good right? Star this project if you like it.

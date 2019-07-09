# Form JSON

Converts an HTML form object to JavaScript object.

[![CircleCI](https://circleci.com/gh/IdanLoo/form-json/tree/master.svg?style=svg)](https://circleci.com/gh/IdanLoo/form-json/tree/master)

## How to use

1. Install

   ```bash
   npm install --save form-json
   ```

2. Import and use it

   ```javascript
   import formJson from 'form-json'

   const form = document.getElementById('form')
   const obj = formJson(form)

   // print the obj converted by the form
   console.log(obj)
   ```

## Why JSON

Though we already have FormData to send form data asynchronously, there are still many reasons to convert form elements to json objects.

- Some APIs don't accept the `multipart/form-data` content type.
- You want to change the structure of the form data.
- You want to send both form data and json data in the same way.

Anyway, I wrote this library for the above reasons.

## Note

- You CANNOT convert a form containing binary data to a json object.
  ```html
  <!-- You cannot convert this form because of the file input -->
  <form>
    <input type="file" name="photo" />
  </form>
  ```
- If there are multiple fields with the same name, they will be combined into one array.

  ```html
  <form>
    <input type="text" name="hobbies" value="singing" />
    <input type="text" name="hobbies" value="dancing" />
  </form>
  ```

  So this form will be parsed to `{ hobbies: ['singing', 'dancing'] }`

- It can understand nested keys even containing arrays, so don't worry about doing this.

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

- If you use TypeScript, you should annotate the type of the form as HTMLFormElement to avoid the warning.

Pretty Good right? Star this project if you like it.

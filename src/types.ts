type Value = string | boolean | Date | Number

export interface Item {
  name: string
  value: Value
}

export interface Parsed {
  [key: string]: Value
}

type Item = {
  name: string
  value: string
}

const itemOf = (input: HTMLInputElement) => ({
  name: input.name,
  value: input.value,
})

const reduced = (sum: Object, { name, value }: Item) => {
  if (!sum[name]) {
    sum[name] = value
  } else if (sum[name] instanceof Array) {
    sum[name].push(value)
  } else {
    sum[name] = [sum[name], value]
  }
  return sum
}

export default function formJson(form: HTMLFormElement) {
  const items: Item[] = Array.prototype.map.call(form, itemOf)
  return items.filter(i => i.name).reduce(reduced, {})
}

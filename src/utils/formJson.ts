import { deepGet, deepSet } from '~/utils/deep'

type Item = {
  name: string
  value: string
}

const itemOf = (input: HTMLInputElement) => ({
  name: input.name,
  value: input.value,
})

function reduced(sum: Object, { name, value }: Item) {
  const target = deepGet(sum, name)

  if (!target) {
    deepSet(sum, name, value)
  } else if (target instanceof Array) {
    target.push(value)
  } else {
    deepSet(sum, name, [target, value])
  }

  return sum
}

export default function formJson(form: HTMLFormElement) {
  const items: Item[] = Array.prototype.map.call(form, itemOf)
  return items.filter(i => i.name).reduce(reduced, {})
}

import { expect, it, test } from 'vitest'
import { Random } from '../src/model/Random'
import { Field } from '../src/model/Field'
test('フィールドを生成', () => {
    const random = new Random(64)
    const field = Field.GetRandomField(10, 10, random)
    expect(field.Cells[62].Count).toBe(4)
    expect(field.Cells[71].Bomb).toBe(true)
})
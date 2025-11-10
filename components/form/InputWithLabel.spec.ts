import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import {
  mockStyledSystemForForm,
  INPUT_TYPES,
  TEST_INPUT_VALUES,
  TEST_LABELS,
  TEST_FIELD_NAMES,
  TEST_PLACEHOLDERS
} from './test-utils'

// Mock styled-system components before importing InputWithLabel
mockStyledSystemForForm()

// Import InputWithLabel after mocks are set up
const InputWithLabelModule = await import('./InputWithLabel.vue')
const InputWithLabel = InputWithLabelModule.default

describe('InputWithLabel.vue', () => {
  describe('Component Structure', () => {
    it('should render a label element', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const label = wrapper.find('label')
      expect(label.exists()).toBe(true)
    })

    it('should render an input element', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const input = wrapper.find('input')
      expect(input.exists()).toBe(true)
    })

    it('should render VStack container', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const vstack = wrapper.find('.vstack')
      expect(vstack.exists()).toBe(true)
    })

    it('should render label before input', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const elements = wrapper.findAll('label, input')
      expect(elements[0].element.tagName.toLowerCase()).toBe('label')
      expect(elements[1].element.tagName.toLowerCase()).toBe('input')
    })
  })

  describe('Label Text Prop', () => {
    it('should display the provided label text', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const label = wrapper.find('label')
      expect(label.text()).toBe(TEST_LABELS.email)
    })

    it('should update label text when prop changes', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      expect(wrapper.find('label').text()).toBe(TEST_LABELS.email)

      await wrapper.setProps({ labelText: TEST_LABELS.password })

      expect(wrapper.find('label').text()).toBe(TEST_LABELS.password)
    })

    it('should handle long label text', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.long,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      expect(wrapper.find('label').text()).toBe(TEST_LABELS.long)
    })

    it('should handle special characters in label text', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.special,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      expect(wrapper.find('label').text()).toContain('special')
    })

    it('should handle unicode characters in label text', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.unicode,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      expect(wrapper.find('label').text()).toBe(TEST_LABELS.unicode)
    })
  })

  describe('Field Name Prop', () => {
    it('should set the input name attribute', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const input = wrapper.find('input')
      expect(input.attributes('name')).toBe(TEST_FIELD_NAMES.email)
    })

    it('should associate label with input using for attribute', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const label = wrapper.find('label')
      expect(label.attributes('for')).toBe(TEST_FIELD_NAMES.email)
    })

    it('should update field name when prop changes', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      expect(wrapper.find('input').attributes('name')).toBe(TEST_FIELD_NAMES.email)

      await wrapper.setProps({ fieldName: TEST_FIELD_NAMES.password })

      expect(wrapper.find('input').attributes('name')).toBe(TEST_FIELD_NAMES.password)
    })

    it('should handle camelCase field names', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.firstName
        }
      })

      expect(wrapper.find('input').attributes('name')).toBe(TEST_FIELD_NAMES.firstName)
    })
  })

  describe('Input Type Prop', () => {
    it('should default to "text" type when not specified', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe(INPUT_TYPES.text)
    })

    it('should accept "text" input type', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          inputType: INPUT_TYPES.text
        }
      })

      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe(INPUT_TYPES.text)
    })

    it('should accept "password" input type', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.password,
          fieldName: TEST_FIELD_NAMES.password,
          inputType: INPUT_TYPES.password
        }
      })

      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe(INPUT_TYPES.password)
    })

    it('should accept "number" input type', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.age,
          fieldName: TEST_FIELD_NAMES.age,
          inputType: INPUT_TYPES.number
        }
      })

      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe(INPUT_TYPES.number)
    })

    it('should update input type when prop changes', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          inputType: INPUT_TYPES.text
        }
      })

      expect(wrapper.find('input').attributes('type')).toBe(INPUT_TYPES.text)

      await wrapper.setProps({ inputType: INPUT_TYPES.password })

      expect(wrapper.find('input').attributes('type')).toBe(INPUT_TYPES.password)
    })
  })

  describe('Placeholder Prop', () => {
    it('should use default placeholder when not provided', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBe('Enter Email')
    })

    it('should use custom placeholder when provided', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          placeholder: TEST_PLACEHOLDERS.email
        }
      })

      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBe(TEST_PLACEHOLDERS.email)
    })

    it('should update placeholder when prop changes', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          placeholder: TEST_PLACEHOLDERS.email
        }
      })

      expect(wrapper.find('input').attributes('placeholder')).toBe(TEST_PLACEHOLDERS.email)

      await wrapper.setProps({ placeholder: TEST_PLACEHOLDERS.custom })

      expect(wrapper.find('input').attributes('placeholder')).toBe(TEST_PLACEHOLDERS.custom)
    })

    it('should handle long placeholder text', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          placeholder: TEST_PLACEHOLDERS.long
        }
      })

      expect(wrapper.find('input').attributes('placeholder')).toBe(TEST_PLACEHOLDERS.long)
    })

    it('should handle empty placeholder', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          placeholder: TEST_PLACEHOLDERS.empty
        }
      })

      expect(wrapper.find('input').attributes('placeholder')).toBe(TEST_PLACEHOLDERS.empty)
    })
  })

  describe('v-model Binding', () => {
    it('should emit update:modelValue when input value changes', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          modelValue: ''
        }
      })

      const input = wrapper.find('input')
      await input.setValue(TEST_INPUT_VALUES.email)

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([TEST_INPUT_VALUES.email])
    })

    it('should update input value when modelValue prop changes', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          modelValue: ''
        }
      })

      await wrapper.setProps({ modelValue: TEST_INPUT_VALUES.email })

      const input = wrapper.find('input')
      expect(input.element.value).toBe(TEST_INPUT_VALUES.email)
    })

    it('should handle multiple value changes', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          modelValue: ''
        }
      })

      const input = wrapper.find('input')

      await input.setValue(TEST_INPUT_VALUES.short)
      await input.setValue(TEST_INPUT_VALUES.email)
      await input.setValue(TEST_INPUT_VALUES.long)

      expect(wrapper.emitted('update:modelValue')).toHaveLength(3)
    })

    it('should handle empty string value', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          modelValue: TEST_INPUT_VALUES.email
        }
      })

      const input = wrapper.find('input')
      await input.setValue(TEST_INPUT_VALUES.empty)

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([TEST_INPUT_VALUES.empty])
    })
  })

  describe('Input Value Handling', () => {
    it('should handle short text input', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          modelValue: ''
        }
      })

      const input = wrapper.find('input')
      await input.setValue(TEST_INPUT_VALUES.short)

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([TEST_INPUT_VALUES.short])
    })

    it('should handle long text input', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          modelValue: ''
        }
      })

      const input = wrapper.find('input')
      await input.setValue(TEST_INPUT_VALUES.long)

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([TEST_INPUT_VALUES.long])
    })

    it('should handle special characters in input', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          modelValue: ''
        }
      })

      const input = wrapper.find('input')
      await input.setValue(TEST_INPUT_VALUES.special)

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([TEST_INPUT_VALUES.special])
    })

    it('should handle unicode characters in input', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          modelValue: ''
        }
      })

      const input = wrapper.find('input')
      await input.setValue(TEST_INPUT_VALUES.unicode)

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([TEST_INPUT_VALUES.unicode])
    })

    it('should handle spaces in input', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          modelValue: ''
        }
      })

      const input = wrapper.find('input')
      await input.setValue(TEST_INPUT_VALUES.spaces)

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([TEST_INPUT_VALUES.spaces])
    })
  })

  describe('Styling Props', () => {
    it('should apply styling to label', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const label = wrapper.find('label')
      const style = label.attributes('style')
      expect(style).toBeTruthy()
    })

    it('should apply styling to input', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const input = wrapper.find('input')
      const style = input.attributes('style')
      expect(style).toBeTruthy()
    })
  })

  describe('Props Combination', () => {
    it('should handle all props together', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.password,
          fieldName: TEST_FIELD_NAMES.password,
          inputType: INPUT_TYPES.password,
          placeholder: TEST_PLACEHOLDERS.password,
          modelValue: ''
        }
      })

      expect(wrapper.find('label').text()).toBe(TEST_LABELS.password)
      expect(wrapper.find('input').attributes('name')).toBe(TEST_FIELD_NAMES.password)
      expect(wrapper.find('input').attributes('type')).toBe(INPUT_TYPES.password)
      expect(wrapper.find('input').attributes('placeholder')).toBe(TEST_PLACEHOLDERS.password)
    })

    it('should handle props updates together', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          inputType: INPUT_TYPES.text,
          placeholder: TEST_PLACEHOLDERS.email
        }
      })

      await wrapper.setProps({
        labelText: TEST_LABELS.password,
        fieldName: TEST_FIELD_NAMES.password,
        inputType: INPUT_TYPES.password,
        placeholder: TEST_PLACEHOLDERS.password
      })

      expect(wrapper.find('label').text()).toBe(TEST_LABELS.password)
      expect(wrapper.find('input').attributes('type')).toBe(INPUT_TYPES.password)
    })
  })

  describe('Edge Cases', () => {
    it('should render without errors', () => {
      expect(() => {
        mount(InputWithLabel, {
          props: {
            labelText: TEST_LABELS.email,
            fieldName: TEST_FIELD_NAMES.email
          }
        })
      }).not.toThrow()
    })

    it('should render without errors with all props', () => {
      expect(() => {
        mount(InputWithLabel, {
          props: {
            labelText: TEST_LABELS.email,
            fieldName: TEST_FIELD_NAMES.email,
            inputType: INPUT_TYPES.text,
            placeholder: TEST_PLACEHOLDERS.email,
            modelValue: TEST_INPUT_VALUES.email
          }
        })
      }).not.toThrow()
    })

    it('should maintain functionality after multiple prop updates', async () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email,
          modelValue: ''
        }
      })

      await wrapper.setProps({ labelText: TEST_LABELS.password })
      await wrapper.setProps({ fieldName: TEST_FIELD_NAMES.password })
      await wrapper.setProps({ inputType: INPUT_TYPES.password })

      const input = wrapper.find('input')
      await input.setValue(TEST_INPUT_VALUES.password)

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible label-input association', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const label = wrapper.find('label')
      const input = wrapper.find('input')

      expect(label.attributes('for')).toBe(input.attributes('name'))
    })

    it('should have visible label text', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const label = wrapper.find('label')
      expect(label.text()).toBeTruthy()
      expect(label.text().length).toBeGreaterThan(0)
    })

    it('should have accessible input with name attribute', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const input = wrapper.find('input')
      expect(input.attributes('name')).toBeTruthy()
    })

    it('should have placeholder for additional context', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBeTruthy()
    })
  })

  describe('Required Props', () => {
    it('should have labelText as a required prop', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      expect(wrapper.props('labelText')).toBe(TEST_LABELS.email)
    })

    it('should have fieldName as a required prop', () => {
      const wrapper = mount(InputWithLabel, {
        props: {
          labelText: TEST_LABELS.email,
          fieldName: TEST_FIELD_NAMES.email
        }
      })

      expect(wrapper.props('fieldName')).toBe(TEST_FIELD_NAMES.email)
    })
  })
})

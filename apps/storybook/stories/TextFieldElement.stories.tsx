import {useEffect} from 'react'
import {action} from '@storybook/addon-actions'
import {Button} from '@mui/material'
import {FieldError, useForm} from 'react-hook-form'
import {
  CheckboxElement,
  FormContainer,
  PasswordElement,
  PasswordRepeatElement,
  TextFieldElement
} from 'react-hook-form-mui/src'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {SubmitButton} from '../src/Shared'

export default {
  title: 'TextFieldElement',
  component: TextFieldElement
} as ComponentMeta<typeof TextFieldElement>

const Template: ComponentStory<typeof TextFieldElement> = (args) => (
  <FormContainer defaultValues={{}} onSuccess={action('submit')}>
    <TextFieldElement {...args} />
    <br/>
    <SubmitButton/>
  </FormContainer>
)

export const Core = Template.bind({})
Core.args = {
  name: 'core',
  label: 'Label'
}

const parseError = (error: FieldError) => {
  if (error.type === 'pattern') {
    return 'Enter an email'
  }
  return 'This field is required'
}

export const Basic = () => {
  const form = {
    agree: false
  }

  return (
    <FormContainer defaultValues={form} onSuccess={action('submit')}
      FormProps={{
        'aria-autocomplete': 'none',
        autoComplete: 'new-password'
      }}>
      <TextFieldElement
        required
        autoComplete={'new-password'}
        margin={'dense'}
        label={'Name'}
        name={'default-text-field'}
      /><br/>
      <TextFieldElement
        required
        type={'email'}
        margin={'dense'}
        label={'Email'}
        name={'default-email-field'}
      /><br/>
      <TextFieldElement
        required
        parseError={parseError}
        type={'email'}
        margin={'dense'}
        label={'Email with ParseError'}
        name={'default-email-field-with-parsed'}
      /><br/>
      <TextFieldElement
        margin={'dense'}
        label={'Number'}
        name={'number-text-field'}
        required
        type={'number'}
      /><br/>
      <PasswordElement margin={'dense'}
        label={'Password'}
        required
        name={'password'}
      /><br/>
      <PasswordRepeatElement passwordFieldName={'password'}
        name={'password-repeat'}
        margin={'dense'}
        label={'Repeat Password'}
        required/><br/>
      <CheckboxElement name={'agree'} label={'Agree'} required/><br/>
      <Button type={'submit'} color={'primary'} variant={'contained'}>Submit</Button>
    </FormContainer>
  )
}

export const PreDefined = () => (
  <FormContainer defaultValues={{
    'default-text-field': 'Test Data',
    'default-email-field': 'info@nextjs.com',
    'number-text-field': 6
  }} onSuccess={action('submit')}
  >
    <TextFieldElement
      required
      margin={'dense'}
      label={'Name'}
      name={'default-text-field'}
    /><br/>
    <TextFieldElement
      required
      parseError={parseError}
      type={'email'}
      margin={'dense'}
      label={'Email'}
      name={'default-email-field'}
    /><br/>
    <TextFieldElement
      margin={'dense'}
      label={'Number'}
      name={'number-text-field'}
      required
      type={'number'}
    /><br/>
    <Button type={'submit'} color={'primary'} variant={'contained'}>Submit</Button>
  </FormContainer>
)


export const PreDefinedNested = () => (
  <FormContainer defaultValues={{
    a: {
      'default-text-field': 'Test Data'
    },
    b: {
      'default-email-field': 'info@nextjs.com',
      'number-text-field': 6
    }
  }}
  onSuccess={action('submit')}
  >
    <TextFieldElement
      required
      margin={'dense'}
      label={'Name'}
      name={'a.default-text-field'}
    /><br/>
    <TextFieldElement
      required
      parseError={parseError}
      type={'email'}
      margin={'dense'}
      label={'Email'}
      name={'b.default-email-field'}
    /><br/>
    <TextFieldElement
      margin={'dense'}
      label={'Number'}
      name={'b.number-text-field'}
      required
      type={'number'}
    /><br/>
    <Button type={'submit'} color={'primary'} variant={'contained'}>Submit</Button>
  </FormContainer>
)


export const WithFormContext = () => {
  const formContext = useForm<{ email: string, name: string }>({
    defaultValues: {
      email: '',
      name: ''
    }
  })
  const {watch} = formContext
  const emailValue = watch('email')

  useEffect(
    () => {
      console.log('email changed', emailValue)
    },
    [emailValue]
  )
  return (
    <FormContainer onSuccess={action('submit')}
      formContext={formContext}>
      <TextFieldElement name={'name'} label={'Name'} parseError={parseError} required variant={'outlined'}
        margin={'dense'}/><br/>
      <TextFieldElement name={'email'} type="email" label={'Email'} required parseError={parseError}
        variant={'outlined'} margin={'dense'}/><br/><br/>
      <Button type={'submit'} color={'primary'} variant={'contained'}>Submit</Button>
    </FormContainer>
  )
}


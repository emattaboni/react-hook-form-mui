import {DateTimePicker, DateTimePickerProps} from '@mui/x-date-pickers/DateTimePicker'
import {Control, Controller, ControllerProps, FieldError, Path} from 'react-hook-form'
import {TextField, TextFieldProps} from '@mui/material'
import {FieldValues} from 'react-hook-form/dist/types/fields'

export declare type ParseableDate<TDate> =
    | string
    | number
    | Date
    | null
    | undefined
    | TDate

export type DateTimePickerElementProps<T extends FieldValues, TInputDate, TDate = TInputDate> =
    Omit<DateTimePickerProps<TInputDate, TDate>,
        'value' | 'onChange' | 'renderInput'>
    & {
    name: Path<T>
    required?: boolean
    isDate?: boolean
    parseError?: (error: FieldError) => string
    onChange?: (value: TDate, keyboardInputValue?: string) => void
    validation?: ControllerProps['rules']
    parseDate?: (value: TDate, keyboardInputValue?: string) => TDate
    control?: Control<T>
    inputProps?: TextFieldProps
    helperText?: TextFieldProps['helperText']
    textReadOnly?: boolean
}

export default function DateTimePickerElement<TFieldValues extends FieldValues>({
  parseError,
  name,
  required,
  parseDate,
  validation = {},
  inputProps,
  control,
  textReadOnly,
  ...rest
}: DateTimePickerElementProps<TFieldValues, any, any>): JSX.Element {

  if (required && !validation.required) {
    validation.required = 'This field is required'
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({
        field: {onChange, value,onBlur, ref},
        fieldState: {error, invalid}
      }) => (
        <DateTimePicker
          {...rest}
          value={value || ''}
          onClose={(...args) => {
            onBlur()
            if(rest.onClose) rest.onClose(...args)
          }}
          onChange={(value, keyboardInputValue) => {
            let newValue: string | undefined = undefined
            if (keyboardInputValue) {
              if (typeof parseDate === 'function') {
                newValue = parseDate(value, keyboardInputValue)
              } else {
                newValue = value
              }
            } else {
              if (typeof parseDate === 'function') {
                newValue = parseDate(value)
              } else {
                newValue = value
              }
            }
            onChange(newValue, keyboardInputValue)
            if (typeof rest.onChange === 'function') {
              rest.onChange(newValue, keyboardInputValue)
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              onBlur={(...args) => {
                onBlur()
                if (params.onBlur) params.onBlur(...args)
              }}
              inputProps={{
                ...params?.inputProps,
                ...(!value && {
                  value: ''
                }),
                ...(textReadOnly && {
                  readOnly: true
                })
              }}
              {...inputProps}
              required={!!required}
              error={invalid}
              helperText={
                error
                  ? typeof parseError === 'function'
                    ? parseError(error)
                    : error.message
                  : inputProps?.helperText || rest.helperText
              }
              inputRef={ref}
            />
          )}
        />
      )}
    />
  )
}

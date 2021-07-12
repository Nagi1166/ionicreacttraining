export interface InputConfig {
    name: string,
    type: 'date' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'time' | 'week' | 'month' | 'datetime-local',
    label: string,
    required: boolean,
    requiredErrorMessage?: string,
    onChange: any,
    onError: any,
    value?: string,
    validations?: Validations[]
}

export interface Validations {
    regex: any,
    errorMessage: string
}
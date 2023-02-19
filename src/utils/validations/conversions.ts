import { displayError } from '../validations/errors';

export function toNumber({
    value,
    type,
    precise = false,
} : {
    value: string,
    type: string,
    precise?: boolean,
}) {
    const parseValue = value?.toString()
    const newValue = precise
        ? parseFloat(parseValue)
        : parseInt(parseValue, 10);

    const error: string = !value
        || value.length <= 0
        || (!newValue && newValue !== 0 )
        ? displayError({
                context: 'conversion',
                source: type,
            }) || ''
        : '';
    return {
        ...(!!error && {
            error
        }),
        value: newValue,
    };
}

export function toString({
    value,
    type,
} : {
    value: unknown,
    type: string,
}) {
    const newValue = value?.toString();

    const error: string = (!value && value !== 0)
        ? displayError({
                context: 'conversion',
                source: type,
            }) || ''
        : '';
    return {
        ...(!!error && {
            error
        }),
        value: newValue,
    };
}

export function toBoolean({
    value,
    type,
} : {
    value: unknown,
    type: string,
}) {
    const parseValue = value?.toString();

    const newValue = parseValue === 'true'
        ? true
        : parseValue === 'false'
            ? false
            : undefined;

    const error: string = !parseValue
        || (parseValue !== 'false' && parseValue !== 'true')
        ? displayError({
                context: 'conversion',
                source: type,
            }) || ''
        : '';
    return {
        ...(!!error && {
            error
        }),
        value: newValue,
    };
}
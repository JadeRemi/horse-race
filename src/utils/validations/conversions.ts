import { displayError } from '../validations/errors';

export function toNumber({
    value,
    type,
} : {
    value: string,
    type: string,
}) {
    const newValue = parseInt((value?.toString()), 10);

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

    const newValue = value === 'true'
        ? true
        : value === 'false'
            ? false
            : undefined;

    const error: string = !value
        || (value !== 'false' && value !== 'true')
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
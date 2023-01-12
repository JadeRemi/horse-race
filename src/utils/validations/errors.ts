
import { DEFAULTS } from '../../config/defaults';

export type sourceTypes = 
    'conversion' | 'rendering';

export function displayError({
    context,
    source,
} : {
    context: string,
    source: string,
}) {
    const notify = DEFAULTS.instantErrorNotification || false;

    switch (context) {
        case 'conversion':
            const message = `Incorrect parameters performing ${context} with the type of ${source}!`
            if (notify) console.log(`%c ${message}!`, 'background: #222; color: #bada55')
            return message;
        default:
            if (notify) console.error('Unidentified error')
            return '';
    }
}

export function collectErrors({
    dispatch,
    collection,
}: {
    dispatch: string[],
    collection: string[],
}) {
    if (Array.isArray(dispatch)
        && Array.isArray(collection)
        && collection.length > 0) {
            collection.forEach(error => {
                if (typeof error === 'string' && error.length > 0) dispatch.push(error);
            })
        }
}
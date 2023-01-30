
export function ordinal(number : unknown) : string {
    const initNumber = typeof number === 'number'
        ? number
        : typeof number === 'string'
            ? parseInt(number, 10)
            : 0;

    const decimal = initNumber % 10;
    const centesimal = initNumber % 100;

    if (decimal === 1 && centesimal != 11) return `${initNumber}st`;
    if (decimal === 2 && centesimal != 12) return `${initNumber}nd`;
    if (decimal === 3 && centesimal != 13) return `${initNumber}rd`;
    return `${initNumber}th`;
}
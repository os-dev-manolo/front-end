export function updateArray<T>(newField: T, currentArray?: T[]) {
    const newArray = currentArray ? [...currentArray] : [];

    const isSelected = newArray.findIndex((selected) => selected === newField);

    if (isSelected >= 0) newArray.splice(isSelected, 1);
    else newArray.push(newField);

    return newArray;
}

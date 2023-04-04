export function getRandomItems(array, count) {
    let result = [];

    let copy = [...array];
    for (let i = 0; i < count; i++) {
        if (copy.length === 0) break;
        let randomIndex = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(randomIndex, 1)[0]);
    }

    return result;
}
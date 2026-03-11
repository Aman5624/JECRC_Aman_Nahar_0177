function addBonusMarks(marks) {
    return marks.map(mark => mark + 5);
}

function main() {
    const marks = [65, 70, 80, 55, 90];
    const updatedMarks = addBonusMarks(marks);
    console.log(updatedMarks);
}

main();
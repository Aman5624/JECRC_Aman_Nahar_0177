function getPassingStudents(marks) {
    return marks.filter(mark => mark > 50);
}

function main() {
    const marks = [35, 67, 48, 90, 55, 30];
    const passingMarks = getPassingStudents(marks);
    console.log(passingMarks);
}

main();
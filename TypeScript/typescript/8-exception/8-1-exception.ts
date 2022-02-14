// Exception: 예상하지 못한 에러가 발생하는 것
// Error State: 예상할 수 있는 에러

// Error(Exception) Handling: try -> catch -> finally
// Java: Exception
// JavaScript: Error

function readFile(fileName: string): string {
  if (fileName === 'not exist') {
    throw new Error(`${fileName} file name is not exist!`);
  }

  return fileName;
}

function closeFile(fileName: string) {
  //
}

const fileName: string = 'not exist';
try {
  console.log(readFile(fileName));
} catch (error) {
  console.log(error);
} finally {
  closeFile(fileName);
  console.log('finally!');
}

import { Day, TestContent } from '@/types';

export const printingLesson = {
  title: 'Printing in Python',
  content: `
    # Python Print Function
    
    ## What is the print() function?
    The print() function is used to output text or variables to the console.
    
    ## Key Concepts:
    1. Print Function Basics
    - Basic syntax: print("Hello, World!")
    - The print function takes parameters inside parentheses
    
    2. Working with Strings
    - Strings can use single quotes: 'Hello'
    - Or double quotes: "Hello"
    - Both work the same way
    
    3. Common Syntax Errors
    - Missing quotes: print(Hello) ❌
    - Correct way: print("Hello") ✅
    - Misplaced quotes: print("Hello"World") ❌
    - Correct way: print("Hello World") ✅
    
    4. Debugging Tips
    - Read error messages carefully
    - Check for missing quotes or parentheses
    - Use Stack Overflow or ChatGPT for help
    
    5. Running Python Code
    - Use the terminal with: python filename.py
    - Or use online environments like this one!
  `
};

export const printingTest: TestContent = {
  title: 'Print Function Test',
  content: `Print the following recipe steps exactly as shown:`,
  initialCode: `print("1. Mix 500g of Flour, 10g Yeast and 300ml Water in a bowl.")
print("2. Knead the dough for 10 minutes.")
print("3. Add 3g of Salt.")
print("4. Leave to rise for 2 hours.")
print("5. Bake at 200 degrees C for 30 minutes.")`,
  expectedOutput: [
    '1. Mix 500g of Flour, 10g Yeast and 300ml Water in a bowl.',
    '2. Knead the dough for 10 minutes.',
    '3. Add 3g of Salt.',
    '4. Leave to rise for 2 hours.',
    '5. Bake at 200 degrees C for 30 minutes.'
  ]
};

export const debuggingLesson = {
  title: 'Debugging in Python',
  content: `
    # Debugging in Python
    
    ## Common Python Errors
    1. SyntaxError: Missing parentheses, quotes, or colons
    2. TypeError: Using wrong data types together
    3. NameError: Using undefined variables
    4. IndentationError: Incorrect code indentation
    
    ## How to Debug
    1. Read the error message carefully
    2. Look at the line number in the error
    3. Check for common syntax mistakes
    4. Use print statements to debug
    5. Test small parts of code separately
  `
};

export const debuggingTest: TestContent = {
  title: 'Fix the Code',
  content: `There are errors in the code below. Fix each line so the code runs correctly.
Each line should print exactly what's shown in the expected output.`,
  initialCode: `# Fix the code below

print(Notes from Day 1")
print("The print statement is used to output strings")
print("Strings are strings of characters"
priint("String Concatenation is done with the + sign")
print(("New lines can be created with a \\ and the letter n")`,
  expectedOutput: [
    'Notes from Day 1',
    'The print statement is used to output strings',
    'Strings are strings of characters',
    'String Concatenation is done with the + sign',
    'New lines can be created with a \\ and the letter n'
  ]
};

export const day1Data: Day = {
  id: 1,
  title: 'Getting Started with Python',
  sections: [
    {
      id: 'printing',
      title: 'Printing',
      slug: 'printing'
    },
    {
      id: 'debugging',
      title: 'Debugging Practice',
      slug: 'debugging'
    }
  ]
}; 
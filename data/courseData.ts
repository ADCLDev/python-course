import { Day } from '../types';

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

export const printingTest = {
  title: 'Print Function Test',
  content: `Print the following bread recipe steps exactly as shown:

1. Mix 500g of Flour, 10g Yeast and 300ml Water in a bowl.
2. Knead the dough for 10 minutes.
3. Add 3g of Salt.
4. Leave to rise for 2 hours.
5. Bake at 200 degrees C for 30 minutes.`,
  expectedOutput: [
    '1. Mix 500g of Flour, 10g Yeast and 300ml Water in a bowl.',
    '2. Knead the dough for 10 minutes.',
    '3. Add 3g of Salt.',
    '4. Leave to rise for 2 hours.',
    '5. Bake at 200 degrees C for 30 minutes.'
  ]
};

export const day1Data: Day = {
  id: 1,
  title: 'Introduction to Python Basics',
  sections: [
    {
      id: 'printing',
      title: 'Printing and Output',
      slug: 'printing'
    },
    {
      id: 'debugging',
      title: 'Debugging Techniques',
      slug: 'debugging'
    },
    {
      id: 'strings',
      title: 'String Manipulation',
      slug: 'strings'
    },
    {
      id: 'comments',
      title: 'Python Comments',
      slug: 'comments'
    },
    {
      id: 'variables',
      title: 'Working with Variables',
      slug: 'variables'
    }
  ]
}; 
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
  content: `Print the following recipe steps exactly as shown:

Rules:
1. Use the print() function for each line
2. Use double quotes (") around each string
3. Each line must be a separate print statement

Hints:
1. Each line should start with print("
2. Don't forget the closing ") and parenthesis
3. Copy the text exactly as shown
4. Check your punctuation and spacing`,
  initialCode: `"1. Mix 500g of Flour, 10g Yeast and 300ml Water in a bowl."
"2. Knead the dough for 10 minutes."
"3. Add 3g of Salt."
"4. Leave to rise for 2 hours."
"5. Bake at 200 degrees C for 30 minutes."`,
  expectedOutput: [
    'print("1. Mix 500g of Flour, 10g Yeast and 300ml Water in a bowl.")',
    'print("2. Knead the dough for 10 minutes.")',
    'print("3. Add 3g of Salt.")',
    'print("4. Leave to rise for 2 hours.")',
    'print("5. Bake at 200 degrees C for 30 minutes.")'
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
Each line should print exactly what's shown in the expected output.

Hints:
1. First line: Missing opening quote and misplaced closing quote
2. Third line: Missing closing parenthesis and quote
3. Fourth line: 'priint' is misspelled
4. Fifth line: Has an extra opening parenthesis
5. Check each line for proper quotes and parentheses`,
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

export const variablesLesson = {
  title: 'Variables in Python',
  content: `
    # Python Variables
    
    ## What are Variables?
    Variables are containers for storing data values. They are like labeled boxes where you can store information.
    
    ## Key Concepts:
    1. Variable Assignment
    - Use = to assign values
    - Example: name = "John"
    
    2. Variable Naming Rules
    - Start with a letter or underscore
    - Can contain letters, numbers, underscores
    - Case-sensitive (age ≠ Age)
    
    3. Variable Swapping
    - Use a temporary variable to store one value
    - Swap values between variables
    - Example:
      a = 1
      b = 2
      temp = a
      a = b
      b = temp
    
    4. Best Practices
    - Use descriptive names
    - Follow naming conventions
    - Keep names simple but meaningful
  `
};

export const variablesTest: TestContent = {
  title: 'Switch Variables',
  content: `We have 2 variables glass1 and glass2. glass1 contains milk and glass2 contains juice.
Write 3 lines of code to switch the contents of the variables.

Rules:
1. You are not allowed to type the words "milk" or "juice"
2. You are only allowed to use variables to solve this exercise
3. You must use a temporary variable to make the switch

Hints:
1. Create a new variable called glass3 to store the first value temporarily
2. Assign glass2's value to glass1
3. Finally, assign the temporary value to glass2
4. Your code should be exactly 3 lines:
   - Line 1: Store glass1's value in glass3
   - Line 2: Store glass2's value in glass1
   - Line 3: Store glass3's value in glass2`,
  initialCode: `# These variables are already set up
glass1 = "milk"
glass2 = "juice"

# Write your code to switch the contents below
`,
  expectedOutput: [
    'glass3 = glass1',
    'glass1 = glass2',
    'glass2 = glass3'
  ],
  testCode: `
# Setup initial variables
glass1 = "milk"
glass2 = "juice"

# Run student's code
{student_code}

# Print final values to check if they're swapped
print(glass1)
print(glass2)
`
};

export const concatenationLesson = {
  title: 'String Concatenation',
  content: `
    # String Concatenation in Python
    
    ## What is String Concatenation?
    String concatenation is combining two or more strings together using the + operator.
    
    ## Key Concepts:
    1. Basic Concatenation
    - Use + to join strings
    - Example: "Hello" + " World" = "Hello World"
    
    2. Variables and Strings
    - Can combine variables with strings
    - Example: 
      name = "John"
      greeting = "Hello " + name
    
    3. Common Mistakes
    - Forgetting spaces between words
    - Mixing strings and numbers without conversion
    - Using wrong quotes
    
    4. Best Practices
    - Add spaces in strings or between strings
    - Convert numbers to strings using str()
    - Keep code readable with clear concatenation
  `
};

export const concatenationTest: TestContent = {
  title: 'Create a Greeting',
  content: `Create a personalized greeting using string concatenation.

Rules:
1. Use the provided variables first_name and last_name
2. Create a greeting that says "Welcome [first_name] [last_name]!"
3. You must use string concatenation with the + operator
4. Make sure to include spaces between words

Hints:
1. You'll need to concatenate multiple strings
2. Don't forget the space between first and last name
3. Remember to add the exclamation mark at the end
4. The final output should look like: "Welcome John Doe!"`,
  initialCode: `# These variables are already set up
first_name = "John"
last_name = "Doe"

# Write your greeting below using concatenation
`,
  expectedOutput: [
    'greeting = "Welcome " + first_name + " " + last_name + "!"',
  ]
};

export const challengesLesson = {
  title: 'Python Challenges',
  content: `
    # Python Programming Challenges
    
    Put your Python skills to the test with these challenges!
    Each challenge combines concepts from previous lessons:
    - Printing
    - Debugging
    - Variables
    - String Concatenation
    
    Choose a challenge and try to solve it using what you've learned.
    Remember to:
    1. Read the instructions carefully
    2. Plan your solution
    3. Test your code
    4. Debug if needed
  `
};

export const challenge1: TestContent = {
  title: 'Recipe Generator',
  content: `Create a recipe title by combining cooking method and food.

Rules:
1. Use the provided variables cooking_method and food
2. Create a recipe title that combines them with "with"
3. Add "Recipe:" at the start
4. Example: "Recipe: Grilled Chicken with Sauce"

Hints:
1. Use string concatenation
2. Remember spaces between words
3. The format is: "Recipe: [method] [food] with [sauce]"`,
  initialCode: `# Variables are set up
cooking_method = "Grilled"
food = "Chicken"
sauce = "BBQ Sauce"

# Create your recipe title below
`,
  expectedOutput: [
    'recipe = "Recipe: " + cooking_method + " " + food + " with " + sauce'
  ]
};

export const challenge2: TestContent = {
  title: 'Debug the Story',
  content: `Fix the code to print a proper story.

Rules:
1. Find and fix all syntax errors
2. Make sure the story prints in the correct order
3. Each line should be a complete sentence

Hints:
1. Check for missing quotes and parentheses
2. Look for proper spacing
3. Make sure print statements are correct`,
  initialCode: `# Fix the code below
print"Once upon a time...)
print("There was a programmer
print("Who loved to code everyday"
print(("And debug all the way!")
`,
  expectedOutput: [
    'Once upon a time...',
    'There was a programmer',
    'Who loved to code everyday',
    'And debug all the way!'
  ]
};

export const challenge3: TestContent = {
  title: 'Variable Swap Chain',
  content: `Swap the values of three variables in a chain.

Rules:
1. Move each value to the next variable (a → b → c → a)
2. Use only the existing variables (no new variables)
3. Values should rotate clockwise

Hints:
1. Think about the order of operations
2. You'll need to use multiple temporary assignments
3. Test each step carefully`,
  initialCode: `# Variables are set up
a = "Python"
b = "JavaScript"
c = "Ruby"

# Rotate the values clockwise
`,
  expectedOutput: [
    'a, b, c = c, a, b'
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
    },
    {
      id: 'variables',
      title: 'Variables',
      slug: 'variables'
    },
    {
      id: 'concatenation',
      title: 'String Concatenation',
      slug: 'concatenation'
    },
    {
      id: 'challenges',
      title: 'Challenges',
      slug: 'challenges'
    }
  ]
}; 
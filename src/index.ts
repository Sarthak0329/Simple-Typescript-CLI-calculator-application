    //we are going to use a nodejs module for taking the user input which is called the "readline"

    import * as readline from 'node:readline';
    import {add,sub,mult,division,power,squareroot} from './calculator.js';


    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'power' | 'squareroot';

    //Display menu for the user 
    function displayMenu():void{
        console.log("Hey nigga what you doing my bro!\n");
        console.log("===Calculator CLI Application===\n");
        console.log("The following operations are available :\n");
        console.log("1. Addition");
        console.log("2. Subtraction");
        console.log("3. Multiplication");
        console.log("4. Division");
        console.log("5. Power");
        console.log("6. SquareRoot");
        console.log("7. Exit");
    }

    //Let us create a fuction to check if a number is valid or not  

    function isValidNumber(input:string):boolean{
        const num = parseFloat(input);
        return !isNaN(num) && isFinite(num);
    }

    function calculate(operation:Operation,num1:number,num2?:number): number{
        switch(operation){
            case 'addition':
                if(num2 === undefined) throw new Error("second number is required for the addition operation");
                return add(num1,num2);
            
            case 'subtraction':
                if(num2 === undefined) throw new Error("second number is required for the subtraction operation");
                return sub(num1,num2);

            case 'multiplication':
                if(num2 === undefined) throw new Error("second number is required for the multiplication operation");
                return mult(num1,num2);
                
            case 'division':
                if(num2 === undefined) throw new Error("second number is required for the division operation"); 
                return division(num1,num2);
            
            case 'power':
                if(num2 === undefined) throw new Error("second number is required for the power operation");
                return power(num1,num2);
                
            case 'squareroot':
                return squareroot(num1);
            
            default :
            throw new Error("Invalid Operation");
        }
    }
    /*
    * We have created a promise that asks the question to the user and gets the answer 
    * since we know that the user entering the answer is an async task so we use the concept of promises
    * return the Promise in the form of a string
    */
    function Prompt(question:string): Promise<string>{
        return new Promise((resolve)=>
        rl.question(question,(ans : string)=> 
            resolve(ans.trim()))
        )
    }

    async function main(): Promise<void>{
        console.log("==Welcome to the Typescript calculator App==");
        
        while(true){
        try{
            displayMenu();

            const operation = await Prompt("Enter the operation:");
            
            if(operation == 'exit'){
                console.log('Thank you for coming!!');
                rl.close();
                break;
            }

            const validOps : Operation[] = ['addition' , 'subtraction' , 'multiplication' , 'division' , 'power' ,'squareroot'];
            if(!validOps.includes(operation as Operation)){
                console.log("Invalid Operation,Please try again!");
                continue;
            }
            //handle the first number!
            const input1 = await Prompt('Enter the first number:');
            if(!isValidNumber(input1)){
            console.log("\nNot a valid number !");
            continue;
            }
            const num1 = parseFloat(input1);
            
            let num2 : number | undefined;
            if(operation !== 'squareroot'){
                const input2 = await Prompt('Enter the second number:');
                if(!isValidNumber(input2)){
                console.log("\nNot a valid number !\n");
                continue;
                
            }
            num2 =  parseFloat(input2);
        }

            const result = calculate(operation as Operation,num1,num2);
            console.log(`\n✅ Result: ${result}\n`);
        
      }catch(error){
            if(error instanceof Error){
                console.log("\n${error.message}\n");
            }
            else{
                console.log("\nAn undefined error has occurred !\n");
            }
      }

    }
        
    }
    main();

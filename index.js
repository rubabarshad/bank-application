import inquirer from 'inquirer';
//Bank Account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of ${amount}suucessfully! Remaining balance: ${this.balance}`);
        }
        else {
            console.log(`Insufficient Balance!`);
        }
    }
    //Crredit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee chareged if more than $100is deposited 
        }
        this.balance += amount;
        console.log(`Deposit of ${amount} Successfully. Remaining Balnce: ${this.balance}`);
    }
    //check balance
    checkBalance() {
        console.log(`Current Blance: ${this.balance}`);
    }
}
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//Create Bank Account
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
//Create customers
const customers = [
    new Customer("Fahad", "Mustafa", "Male", 35, 3162223334, accounts[0]),
    new Customer("Danish", "Taimoor", "Male", 25, 3162673334, accounts[1]),
    new Customer("Aiza", "Khan", "Female", 45, 3169023334, accounts[2]),
];
//Function to interact with bank account
async function service() {
    do {
        const accountNumberinput = await inquirer.prompt([{
                name: 'accountNumber',
                type: 'number',
                message: 'Enter your account number: '
            }]);
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberinput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: 'list',
                    message: "Select an operation",
                    choices: [{ value: "Deposit" }, { value: "Withdraw" }, { value: "Check Balance" }, { value: "Exit" },]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit: ",
                        }]);
                    customer.account.deposit(depositAmount.amount);
                    process.exit();
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw: ",
                        }]);
                    customer.account.deposit(withdrawAmount.amount);
                    process.exit();
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    process.exit();
                    break;
                case "Exit":
                    console.log(" Bank Application has exited. Have a great day!");
                    return;
            }
        }
        else {
            console.log(`Invalid Account Number. Please Try Again`);
        }
    } while (true);
}
service();

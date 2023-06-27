---
created: 2026-01-10T17:00
modified: 2026-01-11T22:35
---

## 安装

- mac: `brew install hledger`

## 配置

```shell
export LEDGER_FILE=$HOME/Documents/Ledger/main.ledger
```

## [命令](https://hledger.org/1.42/hledger.html#part-4-commands)

### 选项

### 界面

- ui
- web

### 输入

- add
- import

### 输出

- basic
    - accounts - show account names
    - codes - show transaction codes
    - commodities - show commodity/currency symbols
    - descriptions - show transaction descriptions
    - files - show input file paths
    - notes - show note parts of transaction descriptions
    - payees - show payee parts of transaction descriptions
    - prices - show market prices
    - stats - show journal statistics
    - tags - show tag names
- standard
    - print - show transactions or export journal data
    - aregister (areg) - show transactions in a particular account
    - register (reg) - show postings in one or more accounts & running total
    - balancesheet (bs) - show assets, liabilities and net worth
    - balancesheetequity (bse) - show assets, liabilities and equity
    - cashflow (cf) - show changes in liquid assets
    - incomestatement (is) - show revenues and expenses
- advanced
    - balance (bal) - show balance changes, end balances, budgets, gains..
    - roi - show return on investments
- chart
    - activity - show bar charts of posting counts per period
- generation
    - close - generate balance-zeroing/restoring transactions
    - rewrite - generate auto postings, like print --auto

### 维护

- check - check for various kinds of error in the data
- diff - compare account transactions in two journal files
- test - run self tests

## 语法

https://hledger.org/1.42/hledger.html#journal-cheatsheet

### [指令](https://hledger.org/1.42/hledger.html#directives)

- include
- alias
- account
- commodity
- tag
- comment

### 交易

## 示例

```ledger
commodity 1,000.00 CNY

account Assets         ; type: A
account Liabilities    ; type: L
account Equity         ; type: E
account Revenues       ; type: R
account Expenses       ; type: X

account Assets:Cash
account Assets:Bank
account Assets:Bank:ICBC
account Assets:Bank:ABC
account Assets:Bank:BOC
account Assets:Bank:CCB
account Assets:Bank:BOCOM
account Assets:Bank:PSBC
account Assets:Bank:CMB
account Assets:Bank:CMBC
account Assets:UnionPay
account Assets:AliPay
account Assets:WeChatPay
account Assets:Receivable

account Liabilities:Credit
account Liabilities:Payable

account Revenues:Salary
account Revenues:Investment

account Expenses:Basic
account Expenses:Basic:Food
account Expenses:Basic:House
account Expenses:Basic:Transport
account Expenses:Basic:Utility
account Expenses:Basic:Digital
account Expenses:Extra
account Expenses:Extra:Pet
account Expenses:Extra:Wear
account Expenses:Extra:Beauty
account Expenses:Extra:Medical
account Expenses:Extra:Education
account Expenses:Extra:Financial
account Expenses:Extra:Tax
account Expenses:Extra:Social
account Expenses:Extra:Entertainment
account Expenses:Misc

alias Income=Revenues
alias i=Income
alias a=Assets
alias l=Liabilities
alias r=Revenues
alias x=Expenses
alias e=Equity

alias b=Assets:Bank
alias c=Assets:Cash

2025-04-01 * opening balances
    Assets:Cash              100 CNY
    Equity                  -100 CNY
```

## 扩展

- shell
- python
- haskell
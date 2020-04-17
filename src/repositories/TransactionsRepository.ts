import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): {} {
    const list = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return list;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((acumulador, valorAtual) => {
        return acumulador + valorAtual.value;
      }, 0);

    const outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((acumulador, valorAtual) => {
        return acumulador + valorAtual.value;
      }, 0);

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

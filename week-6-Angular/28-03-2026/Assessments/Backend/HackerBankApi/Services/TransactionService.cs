using HackerBankApi.Models;

namespace HackerBankApi.Services;

public class TransactionService
{
    private readonly List<Transaction> _transactions = new()
    {
        new Transaction
        {
            Date = "2019-12-03",
            Description = "HACKERBANK INC. DES:CCD+ ID: 33375894749",
            Type = 0,
            Amount = 1985.4f,
            Balance = "$12,234.45"
        },
        new Transaction
        {
            Date = "2019-12-03",
            Description = "ONLINE TRANSFER FROM CHK ...4698",
            Type = 0,
            Amount = 500.0f,
            Balance = "$10,249.05"
        },
        new Transaction
        {
            Date = "2019-12-02",
            Description = "AMAZON MARKETPLACE PMTS",
            Type = 1,
            Amount = 67.98f,
            Balance = "$9,749.05"
        },
        new Transaction
        {
            Date = "2019-12-02",
            Description = "NETFLIX.COM LOS GATOS CA",
            Type = 1,
            Amount = 12.99f,
            Balance = "$9,817.03"
        },
        new Transaction
        {
            Date = "2019-12-01",
            Description = "PAYROLL DEPOSIT ACME CORP",
            Type = 0,
            Amount = 3200.0f,
            Balance = "$9,830.02"
        },
        new Transaction
        {
            Date = "2019-12-01",
            Description = "STARBUCKS STORE #12345",
            Type = 1,
            Amount = 5.75f,
            Balance = "$6,630.02"
        },
        new Transaction
        {
            Date = "2019-11-30",
            Description = "WHOLE FOODS MARKET",
            Type = 1,
            Amount = 134.22f,
            Balance = "$6,635.77"
        },
        new Transaction
        {
            Date = "2019-11-30",
            Description = "VENMO PAYMENT RECEIVED",
            Type = 0,
            Amount = 250.0f,
            Balance = "$6,769.99"
        },
        new Transaction
        {
            Date = "2019-11-29",
            Description = "UTILITY BILL PAYMENT",
            Type = 1,
            Amount = 98.5f,
            Balance = "$6,519.99"
        },
        new Transaction
        {
            Date = "2019-11-29",
            Description = "ATM WITHDRAWAL 5TH AVE",
            Type = 1,
            Amount = 200.0f,
            Balance = "$6,618.49"
        },
        new Transaction
        {
            Date = "2019-11-28",
            Description = "INTEREST PAYMENT",
            Type = 0,
            Amount = 18.63f,
            Balance = "$6,818.49"
        },
        new Transaction
        {
            Date = "2019-11-28",
            Description = "SPOTIFY USA PREMIUM",
            Type = 1,
            Amount = 9.99f,
            Balance = "$6,799.86"
        }
    };

    /// <summary>Returns all transactions in original order</summary>
    public List<Transaction> GetAll() => _transactions;

    /// <summary>Filters transactions by date (YYYY-MM-DD)</summary>
    public List<Transaction> GetByDate(string date) =>
        _transactions.Where(t => t.Date == date).ToList();

    /// <summary>Returns all transactions sorted by amount ascending</summary>
    public List<Transaction> GetSortedByAmount() =>
        _transactions.OrderBy(t => t.Amount).ToList();
}

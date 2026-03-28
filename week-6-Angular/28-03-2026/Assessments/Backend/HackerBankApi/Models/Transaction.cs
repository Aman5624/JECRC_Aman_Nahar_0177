namespace HackerBankApi.Models;

public class Transaction
{
    /// <summary>Date of transaction in YYYY-MM-DD format</summary>
    public string Date { get; set; } = string.Empty;

    /// <summary>Description of the transaction</summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>0 = Credit, 1 = Debit</summary>
    public int Type { get; set; }

    /// <summary>Transaction amount</summary>
    public float Amount { get; set; }

    /// <summary>Account balance after transaction, prefixed with $</summary>
    public string Balance { get; set; } = string.Empty;
}

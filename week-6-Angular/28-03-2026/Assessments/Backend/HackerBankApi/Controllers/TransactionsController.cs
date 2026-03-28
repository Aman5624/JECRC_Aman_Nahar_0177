using HackerBankApi.Models;
using HackerBankApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace HackerBankApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class TransactionsController : ControllerBase
{
    private readonly TransactionService _service;

    public TransactionsController(TransactionService service)
    {
        _service = service;
    }

    /// <summary>
    /// GET /api/transactions
    /// Returns all transactions in original order.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(List<Transaction>), StatusCodes.Status200OK)]
    public ActionResult<List<Transaction>> GetAll()
    {
        return Ok(_service.GetAll());
    }

    /// <summary>
    /// GET /api/transactions/filter?date=YYYY-MM-DD
    /// Returns all transactions for the given date.
    /// </summary>
    [HttpGet("filter")]
    [ProducesResponseType(typeof(List<Transaction>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<List<Transaction>> FilterByDate([FromQuery] string date)
    {
        if (string.IsNullOrWhiteSpace(date))
            return BadRequest(new { message = "Date query parameter is required." });

        // Validate YYYY-MM-DD format
        if (!DateTime.TryParseExact(date, "yyyy-MM-dd",
            System.Globalization.CultureInfo.InvariantCulture,
            System.Globalization.DateTimeStyles.None, out _))
        {
            return BadRequest(new { message = "Date must be in YYYY-MM-DD format." });
        }

        var results = _service.GetByDate(date);
        return Ok(results);
    }

    /// <summary>
    /// GET /api/transactions/sorted
    /// Returns all transactions sorted by amount ascending.
    /// </summary>
    [HttpGet("sorted")]
    [ProducesResponseType(typeof(List<Transaction>), StatusCodes.Status200OK)]
    public ActionResult<List<Transaction>> GetSortedByAmount()
    {
        return Ok(_service.GetSortedByAmount());
    }
}


using Budgy.Api.Data;
using Budgy.Api.DTOs;
using Budgy.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Budgy.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TransactionController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransactionController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/transaction
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TransactionDto>>> GetTransactions()
    {
        var userId = Guid.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!
        );

        var transactions = await _context.Transactions
            .Where(t => t.UserId == userId)
            .OrderByDescending(t => t.Date)
            .Select(t => new TransactionDto
            {
                Id = t.Id,
                Amount = t.Amount,
                Type = t.Type,
                Category = t.Category,
                Description = t.Description,
                Date = t.Date
            })
            .ToListAsync();

        return Ok(transactions);
    }

    // POST: api/transaction
    [HttpPost]
    public async Task<ActionResult<TransactionDto>> CreateTransaction(
        CreateTransactionDto dto)
    {
        var userId = Guid.Parse(
    User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Amount = dto.Amount,
            Type = dto.Type,
            Category = dto.Category,
            Description = dto.Description,
            Date = DateTime.SpecifyKind(dto.Date, DateTimeKind.Utc)
        };

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        var result = new TransactionDto
        {
            Id = transaction.Id,
            Amount = transaction.Amount,
            Type = transaction.Type,
            Category = transaction.Category,
            Description = transaction.Description,
            Date = transaction.Date
        };

        return CreatedAtAction(
            nameof(GetTransactions),
            new { id = transaction.Id },
            result
        );
    }

    // DELETE: api/transaction/{id}
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteTransaction(Guid id)
    {
        var userId = Guid.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!
        );

        var transaction = await _context.Transactions
            .FirstOrDefaultAsync(t =>
                t.Id == id && t.UserId == userId
            );

        if (transaction is null)
        {
            return NotFound();
        }

        _context.Transactions.Remove(transaction);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
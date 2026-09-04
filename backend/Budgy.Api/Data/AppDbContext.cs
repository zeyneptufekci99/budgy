using Budgy.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Budgy.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Transaction> Transactions => Set<Transaction>();
}
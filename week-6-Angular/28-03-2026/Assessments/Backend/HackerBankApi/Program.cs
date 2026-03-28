using HackerBankApi.Services;

var builder = WebApplication.CreateBuilder(args);

// ── Services ─────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddSingleton<TransactionService>();

// ── Swagger / OpenAPI ────────────────────────────────────
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title   = "HackerBank API",
        Version = "v1",
        Description = "REST API for HackerBank transaction data"
    });
});

// ── CORS — allow Angular dev server ──────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins(
                "http://localhost:4200",
                "https://localhost:4200"
              )
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// ── Middleware Pipeline ───────────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "HackerBank API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors("AllowAngularDev");
app.UseAuthorization();
app.MapControllers();

app.Run();
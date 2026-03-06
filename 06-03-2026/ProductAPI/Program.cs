using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;
var builder = WebApplication.CreateBuilder(args);

//Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add controllers
builder.Services.AddControllers();

//Add dtabase context service
builder.Services.AddDbContext<ApplicationDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


var app = builder.Build();

//configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//middleware
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();


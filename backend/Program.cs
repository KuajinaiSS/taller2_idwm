using System.Text;
using backend.src.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins"; // Modificado por mi 
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>// Modificado por mi 
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000")// http://localhost:5144 colocamos donde se levanto react
                                                  .AllowAnyHeader()
                                                  .AllowAnyMethod();
                      });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



/****************************************************************************************
******************************** Modificado por mi **************************************
****************************************************************************************/


// Se asume que se tiene el secret del JWT en AppSettings:Token
// Esto se debe colocar en el Program.cs
// Esto firma y crea un "Secreto", ir a appsettings.json y crear la llave "AppSettings"y dentro de ella "Token" con el valor del secreto (string) que se quiera usar para firmar el JWT "12341234123412341234123412341232" / "darling... , would you catch me?"
builder.Services.AddAuthentication().AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateAudience = false,
        ValidateIssuer = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                    builder.Configuration.GetSection("AppSettings:Token").Value!))
    };
});


// DI (Inyeccion de dependencias)
// Modificado por mi
// Inyectamos la base de datos (Data Context) a partes de la aplicacion donde se necesite (Controllers)
builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlite("Data Source=DumboDB.db"));


/****************************************************************************************
******************************** Modificado por mi **************************************
************************************** (fin) ********************************************/


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);// Modificado por mi 
app.UseAuthorization();


app.MapControllers();

app.Run();

# Proyecto con .NET 7 SDK

Este proyecto utiliza .NET 7 SDK y está configurado con las dependencias necesarias a través de NuGet para su funcionamiento adecuado.

## BACKEND

### Requisitos previos

- SDK [.NET 7](https://dotnet.microsoft.com/es-es/download/dotnet/7.0).
- .NET [EF CLI](https://www.nuget.org/packages/dotnet-ef/)
- Puerto 5019 disponible
- git [2.33.0](https://git-scm.com/downloads) o superior.

### Pasos para clonar y ejecutar

1. Clona el repositorio:

   ```bash
   git clone https://github.com/KuajinaiSS/taller2_idwm
   cd backend
   dotnet restore
   dotnet ef database update
   dotnet run
   ```

### Instalación de dependencias

Para ejecutar este proyecto después de clonarlo, asegúrate de instalar las siguientes dependencias mediante NuGet.

```bash
dotnet add package Microsoft.EntityFrameworkCore.Design --version 7.0.11
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 7.0.11
dotnet add package BCrypt.Net-Next --version 4.0.3
dotnet add package System.IdentityModel.Tokens.Jwt --version 7.0.0
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 7.0.11
```
## FRONTEND

#### Requisitos del Frontend

- Node.js y npm instalados

#### Instalación del Frontend
1. Accede al directorio del frontend: `cd frontend`
2. Instala las dependencias: `npm install`

#### Uso del Frontend

1. Inicia el servidor de desarrollo: `npm run start`
2. Abre tu navegador en `http://localhost:3000` para ver la aplicación en ejecución

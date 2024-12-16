using Microsoft.OpenApi.Models;
using Todos.DB;

var builder = WebApplication.CreateBuilder(args);
var apiVersion = "v1.0";
var pathToData = "./";
var filename = "todos.json";
var corsPolicyName = "defaultPolicy";

TodosDB DB = new TodosDB(pathToData, filename);

//Swagger services init 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(
    c => {
        c.SwaggerDoc(apiVersion, 
        new OpenApiInfo{
            Title = "Todos API",
            Description = "Handle all your daily tasks",
            Version = apiVersion
        });
    }
);

builder.Services.AddCors(options => {
    options.AddPolicy(corsPolicyName,policy => {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5250");
        policy.WithMethods("GET","POST","PUT","DELETE");
        policy.AllowAnyHeader();
    });
});

var app = builder.Build();


//enable swagger frontend while in dev mode
if(app.Environment.IsDevelopment()){
    app.UseSwagger();
    app.UseSwaggerUI(
        c => {
            c.SwaggerEndpoint($"/Swagger/{apiVersion}/swagger.json", $"Todos API {apiVersion}");
        }
    );
}

//endpoints
app.MapGet("/", () => "Hello World!");

//[GET]
app.MapGet("/todos", 
() => {
    if(DB != null){
        return DB.GetTodos();
    }
    return null;
}).RequireCors(corsPolicyName);

app.MapGet("/todos/{id}", 
(int id) => {
    if(DB != null){
       return DB.GetTodo(id);
    }
    return null;
}).RequireCors(corsPolicyName);

//[POST]
app.MapPost("/todos", 
(Todo newTodo) => {
    if(DB != null){
        return DB.CreateTodo(newTodo);
    }
    return null;
}).RequireCors(corsPolicyName);

//[PUT]
app.MapPut("/todos", 
(Todo t) => {
    if(DB != null){
        return DB.UpdateTodo(t);
    }
    return null;
}).RequireCors(corsPolicyName);

//[DELETE]
app.MapDelete("/todos/{id}", 
(int id) => {
    if(DB != null){
        DB.DeleteTodo(id);
        return;
    }
    return;
}).RequireCors(corsPolicyName);

//[MISC]
app.MapGet("/StopAPI/{Id}", (int Id)=>{
    if(Id == 500){
        DB.Dispose();
        app.StopAsync();
    }
}).RequireCors(corsPolicyName);

app.MapGet("/SaveDB/{Id}", (int Id)=>{
    if(Id == 200){
        DB.SaveDB();
    }
}).RequireCors(corsPolicyName);

app.UseCors(corsPolicyName);

//pray and go!
app.Run();

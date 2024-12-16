using Newtonsoft.Json;

namespace Todos.DB;

//Record keyword in C# refers to the a reference typed class, similar to a struct in c
//No methods, constructors, de-constructors etc
public record Todo {
    public required int Id {get;set;}
    public required string Description {get; set;}
    public bool Done {get; set;} = false;
}

//Wrapper class for all data lists db
public class DB {
    public required List<Todo> _todos {get; set;}
    public DB(){
        _todos = new List<Todo>();

    }
}

//A no-server Database, all kept in a json file.
//This is fine because small amount of data at a time.
public class TodosDB : IDisposable{
    private bool disposed = false;
    private DB db = new DB{_todos = new List<Todo>()};
    private List<Todo> todos {
        get {
            return db._todos;
        } 
        set {
            db._todos = value;
        }
    }
    private string pathToDataFile;

    public TodosDB(string pathToData, string filename){
        pathToDataFile = $"{pathToData}/{filename}";
        Console.WriteLine($"INFO: Creating Todos DB from {pathToDataFile}");
        try{
            Console.WriteLine("INFO: attempting to deserialize todos list");
            using(StreamReader r = new StreamReader($"{pathToDataFile}")){
                string jsonData = r.ReadToEnd();
                DB? temp = JsonConvert.DeserializeObject<DB>(jsonData);
                if (temp == null) {
                    Console.WriteLine("ERROR: Todo List failed to deserialize.");
                }
                else{
                    db = temp;
                    Console.WriteLine("INFO: Successfully initialized DB");
                }
            }
        }
        catch(Exception e){
            Console.WriteLine(e.Message);
        }
    }

    ~TodosDB(){
        Console.WriteLine("INFO: Attempting deconstruction of DB.");
        SaveJsonToDataFile();
        Console.WriteLine("INFO: Successful deconstruction.");
    }

    public void Dispose(){
        Console.WriteLine("INFO: Attempting deconstruction of DB.");
        SaveJsonToDataFile();
        Console.WriteLine("INFO: Successful deconstruction.");
    }

    private void SaveJsonToDataFile(bool ignoreDisposed = false){
        if(this.disposed && !ignoreDisposed)
            return;

        Console.WriteLine("INFO: Attempting to serialize todos list");
        try{
            string json = JsonConvert.SerializeObject(db);
            File.WriteAllText(pathToDataFile, json);
        }
        catch(Exception e){
            Console.WriteLine(e.Message);
        }
        Console.WriteLine("INFO: Finished attempt.");

        if(!ignoreDisposed)
            this.disposed = true;
    }

    public void SaveDB(){
        SaveJsonToDataFile(true);
    }

    public List<Todo> GetTodos() {return todos;}
    public Todo? GetTodo(int id) {
        return todos.SingleOrDefault(t => t.Id == id);
    }
    public Todo CreateTodo(Todo t) {
        t.Id = todos.Count;
        todos.Add(t);
        return t;
    }
    public Todo UpdateTodo(Todo todo) {
        todos = todos.Select(
            t => {
                if(t.Id == todo.Id){
                    t.Description = todo.Description;
                }
                return t;
            }
        ).ToList();
        return todo;
    }
    public void DeleteTodo(int id) {
        //only returns objects that don't have the id
        todos = todos.FindAll(t => t.Id != id).ToList();
        for(int i = 0; i < todos.Count; i++){
            todos[i].Id = i;
        }
    }

}
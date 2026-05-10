#include "crow.h" // You will need the crow_all.h file in your folder
#include <vector>
#include <string>

struct Task {
    int id;
    std::string text;
    bool done;
};

std::vector<Task> db = {}; // Our simple database

int main() {
    crow::SimpleApp app;

    // 1. Get all tasks
    CROW_ROUTE(app, "/get-tasks")([]() {
        crow::json::wvalue res;
        for (int i = 0; i < db.size(); i++) {
            res[i]["id"] = db[i].id;
            res[i]["text"] = db[i].text;
            res[i]["done"] = db[i].done;
        }
        return res;
    });

    // 2. Add a task
    CROW_ROUTE(app, "/add-task").methods(crow::HTTPMethod::POST)([](const crow::request& req) {
        auto body = crow::json::load(req.body);
        db.push_back({ (int)db.size(), body["text"].s(), false });
        return crow::response(200);
    });

    // 3. Delete a task
    CROW_ROUTE(app, "/delete/<int>")([](int id) {
        if (id < db.size()) db.erase(db.begin() + id);
        return crow::response(200);
    });

    app.port(18080).run();
}
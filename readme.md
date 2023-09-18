db.books.insertMany([
    {title: "t1", description: "d1", authors: "a1"},
    {title: "t2", description: "d2", authors: "a1"}
]);

db.books.find({title: "t1"});

db.books.updateOne(
    { _id: "1" },
    { $set: { description: "newDesc", authors: "newAuthors" } }
);
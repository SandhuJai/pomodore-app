let user1 = {
    name: 'Jaikirat'
};

let user2 = {
    name: 'Simran'
};

let hello = []

hello.push(user1);
hello.push(user2);

hello.forEach(user => {
    console.log(user);
});
let currTime = new Date().getTime();

setTimeout(() => {
    console.log((new Date().getTime()) - currTime);
}, 3000);
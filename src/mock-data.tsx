export const users = [
    {
        id: 1,
        name: "Admin One",
        role: "admin",
        username: "adminone",
        password: "123456",
        homePage: "/questions"
    },
    {
        id: 2,
        name: "Admin Two",
        role: "admin",
        username: "admintwo",
        password: "123456",
        homePage: "/questions"
    },
    {
        id: 3,
        name: "ABC User",
        role: "general",
        username: "userone",
        password: "123456",
        homePage: "/"
    },
    {
        id: 4,
        name: "DEF User",
        role: "general",
        username: "usertwo",
        password: "123456",
        homePage: "/"
    },
    {
        id: 5,
        name: "XYZ User",
        role: "general",
        username: "userthree",
        password: "123456",
        homePage: "/"
    }
];


export const defaultQuestions = [
    {
        id: "36b329da-6c8e-4e19-b7a8-81df7040f9a8",
        title: "what is the distance between earth and sun?",
        answers: [
            {
                id: "2e847b2b-f8b9-44c9-87af-670abd200a7d",
                text: "147.96 million km",
                userId: 3
            },
            {
                id: "38bb7db6-735d-4484-985c-6430871bc8e8",
                text: "147 million km",
                userId: 4
            }
        ]
    },
    {
        id: "1522f359-b38c-4905-a56f-1a2318d3d512",
        title: "what is the distance between earth and moon?",
        answers: [
            {
                id: "bddff33b-3a56-44c6-92a6-6d048ddb9cb9",
                text: "384,400 km",
                userId: 5
            },
            {
                id: "ea3e4958-5a3e-43a5-863c-fd1331b188f5",
                text: "384,400 km",
                userId: 4
            }
        ]
    },
    {
        id: "22d13613-0806-4b2e-95a4-20a96013752b",
        title: "what is the distance between earth and mars?",
        answers: [
            {
                id: "bddff33b-3a56-44c6-92a6-6d048ddb9cb9",
                text: "about 140 million miles",
                userId: 3
            },
            {
                id: "ea3e4958-5a3e-43a5-863c-fd1331b188f6",
                text: "about 140 million miles",
                userId: 5
            }
        ]
    }
];
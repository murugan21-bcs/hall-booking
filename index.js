const express = require("express");
const PORT = 4007;
const app = express();
app.use(express.json())

//initilazing the data
const hallData = [
    {
        id:1,
        numberOfSeats:100,
        amenities: ["AC","chairs", "discolights"],
        price:5000,
        ifBooked: "true",
        customerName: "Anitha",
        date:"05-Jun-2023",
        startTime:"10-Jun-2023  at 12PM",
        endTime:"11-Jun-2023 at 11AM",
        RoomId: 201,
        RoomName: "Duplex",
    },

    {
        id:2,
        numberOfSeats:100,
        amenities: ["AC","chairs", "discolights"],
        price:5000,
        ifBooked: "false",
        customerName: "murugan",
        date:"",
        startTime:"",
        endTime:"",
        RoomId: 202,
        RoomName: "Duplex",
    },
    {
        id:3,
        numberOfSeats:50,
        amenities: ["AC","chairs"],
        price:3000,
        ifBooked: "false",
        customerName: "",
        date:"",
        startTime:"",
        endTime:"",
        RoomId: 203,
        RoomName: "Classic",
    },
    {
        id:4,
        numberOfSeats:100,
        amenities: ["AC","chairs", "discolights"],
        price:5000,
        ifBooked: "true",
        customerName: "Hari",
        date:"15-Jun-2023",
        startTime:"20-Jun-2023 at 12PM",
        endTime:"25-Jun-2023 at 11AM",
        RoomId: 204,
        RoomName: "Duplex",
    },
    {
        id:5,
        numberOfSeats:200,
        amenities: ["AC","chairs", "discolights","buffet"],
        price:9000,
        ifBooked: "true",
        customerName: "Kaladharan",
        date:"08-Jun-2023",
        startTime:"12-Jun-2023 at 12PM",
        endTime:"15-Jun-2023 at 11AM",
        RoomId: 205,
        RoomName: "Suite",
    },
]
//get request logic and method
app.get("/hall-details", (request, response) => {
    //to check the details of the booked rooms logic using request.query 
    const { ifBooked, numberOfSeats } = request.query;
    console.log(request.query, ifBooked);
    console.log(request.query, numberOfSeats);
    let filteredHall = hallData;
    if (ifBooked) {
      filteredHall = filteredHall.filter((halls) => halls.ifBooked === ifBooked);
    }
    if (numberOfSeats) {
      filteredHall = filteredHall.filter(
        (halls) => halls.numberOfSeats >= +numberOfSeats
      );
    }
    response.send(filteredHall);
  });

//   getting specific id
  app.get("hall-details/:id", (request, response)=>{
    const { id } = request.params;
    console.log(id);

    const halls = hallData.find((hall) => hall.id === id);
    response.json(halls);
  })

  //posting new hall
 
  app.post("/add/hall-details", (req, res)=>{
    const newHall = {
        id: hallData.length + 1,
        numberOfSeats:req.body.numberOfSeats,
        amenities: req.body.amenities,
        price:req.body.price,
        ifBooked: req.body.ifBooked,
        customerName: req.body.customerName,
        date:req.body.date,
        startTime: req.body.startTime,
        endTime:req.body.endTime,
        RoomId: req.body.RoomId,
        RoomName:req.body.RoomName
    };
    hallData.push(newHall)
    return res.send(hallData)
})

//updating a new hall 
app.put("/hall-details/:id", (req, res)=>{
    const {id} = req.params;
    const halls = hallData.find((hall)=>hall.id === id);

    if(halls.ifBooked === "true"){
        res.status(500).send("This room is already booked");
        return;
    }else halls.customerName = req.body.customerName;
    halls.date = req.body.date;
    halls.startTime = req.body.startTime;
    halls.endTime = req.body.endTime;
    res.json(halls);
});

app.listen(PORT, () => console.log(`Server Running at http://localhost:${PORT}`));

app.get("/", (req,res)=>{res.json("running..")})

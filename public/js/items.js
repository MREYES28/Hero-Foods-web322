var food = [
    {  
    Name: "HERO Burgers",
    description: "Burgers that will turn you into a HERO, delicious bountiful big burgers to get you the nutrients needed to be come a HERO",
    price: "$135.99 /PerMonth",
    itemNo: 1,
    image: "./images/burger",
    topPackage: false
},
    {
    Name: "HERO Steak",
    description: "Mouth-watering Steak to give you the enegry to become a HERO",
    price: "$111.99 /PerMonth",
    itemNo: 2,
    image: "./images/steak",
    topPackage: false
},
{
    Name: "HERO Chicken",
    description: "High protein needed to rebuild those muscles to become a HERO",
    price: "from $109.99 /PerMonth",
    itemNo: 3,
    image: "./images/chicken",
    topPackage: true
},

{
    Name: "HERO Seafood",
    description: "Delicious food from the sea that gives tons of nutrients to become a HERO",
    price: "$79.99 /PerMonth",
    itemNo: 4,
    image: "./images/seafood",
    topPackage: false
}
];

window.onload = function() {

    for (var i = 0; i < food.length; i++){
    var element1 = document.createElement("div");
    element1.setAttribute("id", "arrayitems" + i);
    document.querySelector("#items").appendChild(element1);

    var m_img = document.createElement("img");
    var src = food[i].image + '.jpg';
    m_img.setAttribute("id", "pic");
    m_img.setAttribute('src', src);
    m_img.setAttribute('alt', src);
    document.querySelector("#arrayitems" + i).appendChild(m_img);

    var m_name = document.createElement("p");
    m_name.setAttribute("id", "element");
    m_name.textContent = food[i].Name;
    document.querySelector("#arrayitems"  + i).appendChild(m_name);

    var m_description = document.createElement("p");
    m_description.setAttribute("id", "element");
    m_description.textContent = "Description: " + food[i].description;
    document.querySelector("#arrayitems"  + i).appendChild(m_description);

    var m_price = document.createElement("p");
    m_price.setAttribute("id", "element");
    m_price.textContent = "Price: " + food[i].price;
    document.querySelector("#arrayitems"  + i).appendChild(m_price);


    if(food[i].topPackage == true){

    var m_top = document.createElement("p");
    m_top.setAttribute("id", "elementTop");
    m_top.textContent = "Top Package: ";
    document.querySelector("#arrayitems"  + i).appendChild(m_top);

    var m_topimg = document.createElement("img");
    var srcTop = './images/toppkg.png';
    m_topimg.setAttribute("id", "toppack");
    m_topimg.setAttribute('src', srcTop);
    m_topimg.setAttribute('alt', srcTop);
    document.querySelector("#arrayitems"  + i).appendChild(m_topimg);
}
    }
}
var dbversion = var drivers = [];
var guides = [];
var places = [];
var schedule = [];
var destination_places = [];


var paymentToDriver = "Please give the remaining amount to driver. You can pay through google pay, phonepe, paytm or cash";
var outsideVehicle = "Car or any Vehicle is not allowed inside statue of unity premises. We will drop you at parking area. From there, you have to go inside all places vis their Buses (FREE). For smoother journey you can hire E-Rickshaw(Paid) or E-Car to roam inside (Paid)";
var noLaserShow = "You can see laser show from this location (https://goo.gl/maps/tZok6XnVmGNmdPWv9). For hearing it properly, run this video parallel to get nice audio https://www.youtube.com/watch?v=xdbibPGAEn0";


function getThingsToCarry(p_carry_obj) {
    var winter = "- Sunglasses, Woolen wear" + lb;
    var summer = "- Cap, Sunglasses, Sunscream, Napkin" + lb;
    var monsoon = "- Umbrella, Raincoat, Plastic bag to keep Mobile/ Wallet" + lb;
    var trekking = "- Shoes" + lb;
    var swimming = "- Costume/Swimming clothes, Personal Toilettoires" + lb;
    var common_swimming_monsoon = "- 1 Pair extra clothes, Plastic bags for wet clothes" + lb;
    common_swimming_monsoon += "- Towel/Napkin" + lb;
    var t_to_c = "";
    t_to_c += "- Necessary Medicine, Mask, Sanitizer, Waterbottle" + lb;
    t_to_c += "- Waterbottle, Small Travel Shoulder bag" + lb;

    if(p_carry_obj["TREKKING"] == true){
        t_to_c += trekking;
    }
    if(p_carry_obj["WINTER"] == true){
        t_to_c += winter;
    }
    if(p_carry_obj["SUMMER"] == true){
        t_to_c += summer;
    }
    if(p_carry_obj["MONSOON"] == true){
        t_to_c += monsoon;
    }
    if(p_carry_obj["SWIMMING"] == true){
        t_to_c += swimming;
    }
    if(p_carry_obj["SWIMMING"] == true  || p_carry_obj["MONSOON"] == true){
        t_to_c += common_swimming_monsoon;
    }
    return t_to_c;

}
//Driver Database
function addDriverDatabase() {

    drivers.push({
        driver_name: "Bhavesh Dabhi",
        driver_no: "9925438283",
        car_name: "xCent AC",
        car_number: "GJ18 AZ 8366"
    });
    drivers.push({
        driver_name: "Chirag Patel",
        driver_no: "9925285415",
        car_name: "xCent AC",
        car_number: "GJ01 ET 4229"
    });
    drivers.push({
        driver_name: "Jayesh Valand",
        driver_no: "9427024266",
        car_name: "Innova Crysta AC",
        car_number: "GJ18 AZ 8682"
    });
    drivers.push({
        driver_name: "Tarun Chobisa",
        driver_no: "7568013808",
        car_name: "New Ertiga AC",
        car_number: "GJ01 JT 2931"
    });
    drivers.push({
        driver_name: "Mayank Bhai",
        driver_no: "9714410442",
        car_name: "New Ertiga AC",
        car_number: "GJ18 BT 7205"
    });
    drivers.push({
        driver_name: "Amit Barot",
        driver_no: "9725555215",
        car_name: "xCent AC",
        car_number: "GJ01 HT 5038"
    });
    drivers.push({
        driver_name: "Munna Bhai",
        driver_no: "8140698944",
        car_name: "Ertiga AC",
        car_number: "GJ01 HZ 2771"
    });
    drivers.push({
        driver_name: "Purvesh Patel",
        driver_no: "9898712979",
        car_name: "xCent AC",
        car_number: "GJ18 AZ 5164"
    });
    drivers.push({
        driver_name: "Jayesh Zala",
        driver_no: "9687150808",
        car_name: "xCent AC",
        car_number: "GJ01 FT 3219"
    });
    drivers.push({
        driver_name: "Dharmesh",
        driver_no: "9974406773",
        car_name: "Swift Dzire White",
        car_number: "GJ01 DZ 9973"
    });
    drivers.push({
        driver_name: "Vanraj Sinh",
        driver_no: "9428006800, 9408915944",
        car_name: "Hyundai xCent",
        car_number: "GJ27 X 5944"
    });
    drivers.push({
        driver_name: "Aditya Bhai",
        driver_no: "9265796655",
        car_name: "Innova",
        car_number: "GJ01 BY 2799"
    });
    drivers.push({
        driver_name: "Pravin Bhai",
        driver_no: "7990613902",
        car_name: "Hyundai xCent",
        car_number: "GJ01 FT 0543"
    });
    drivers.push({
        driver_name: "Gopalkrishna",
        driver_no: "7016662076",
        car_name: "Hyundai xCent AC",
        car_number: "GJ01FT7230"
    });
    drivers.push({
        driver_name: "Anil Thakur",
        driver_no: "9825909950",
        car_name: "Maruti Swift Desire",
        car_number: "GJ27 TD 1294"
    });

    drivers.push({
        driver_name: "Other",
        driver_no: "Will Share soon",
        car_name: "Will Share Soon",
        car_number: "Will Share Soon"
    });



}

//Guide Database
function addGuideDatabase() {
    guides.push({
        guide_name: "Bhavesh Dabhi",
        guide_no: "9925438283"
    });
}

function getGuideInfo(p_guidename){
    for (var i = 0; i < guides.length; i++) {
        if (p_guidename == guides[i].guide_name) {
            return guides[i];
        }
    }
    return 0;
}
//Place database
function addPlaceDatabase() {

    //Bakor
    places.push({
        place_name: "Bakor",
        package_name: "Bakor By Non AC Bus - POOJAN",
        schedule: "bakor_by_bus_schedule_poojan",
        needdestination: false
    });
    places.push({
        place_name: "Bakor",
        package_name: "Bakor By Non AC Bus - MOJ",
        schedule: "bakor_by_bus_schedule_moj",
        needdestination: false
    });
    places.push({
        place_name: "Bakor",
        package_name: "One Day Car - Full Package",
        schedule: "bakor_by_car_full",
        needdestination: true
    });
    places.push({
        place_name: "Bakor",
        package_name: "Self Vehicle One Day",
        schedule: "bakor_by_car_full",
        needdestination: true
    });
    places.push({
        place_name: "Bakor",
        package_name: "Self Vehicle 1 Night 2 Days",
        schedule: "bakor_by_car2_full",
        needdestination: true
    });

    //Polo Forest

    places.push({
        place_name: "Polo Forest",
        package_name: "Polo By Non AC Bus",
        schedule: "polo_by_bus",
        needdestination: false
    });
    places.push({
        place_name: "Polo Forest",
        package_name: "One Day Car - Full Package",
        schedule: "polo_by_car",
        needdestination: true
    });
    places.push({
        place_name: "Polo Forest",
        package_name: "Two Days Car - Full Package",
        schedule: "polo_by_car_two_days",
        needdestination: true
    });
    places.push({
        place_name: "Polo Forest",
        package_name: "Self Vehicle One Day",
        schedule: "polo_by_car_self",
        needdestination: true
    });
    places.push({
        place_name: "Polo Forest",
        package_name: "Self Vehicle 1 Night 2 Days",
        schedule: "polo_by_car2_self",
        needdestination: true
    });

    //Statue of unity
    places.push({
        place_name: "Statue Of Unity",
        package_name: "SOU By Non AC Bus",
        schedule: "sou_by_bus",
        needdestination: false
    });

    places.push({
        place_name: "Statue Of Unity",
        package_name: "One Day Car - With Jungle Safari and Pet House",
        schedule: "sou_by_car_js",
        needdestination: false

    });

    //Modhera Patan Sidhpur
    places.push({
        place_name: "Modhera - Patan - Sidhpur",
        package_name: "One Day Car Package",
        schedule: "modhera_schedule",
        needdestination: false
    });

    //AATAPI
    places.push({
        place_name: "AATAPI Wonderland",
        package_name: "One Day Package with Lunch and Hi Tea",
        schedule: "aatapi_schedule_with_lunch",
        needdestination: true
    });
    places.push({
        place_name: "AATAPI Wonderland",
        package_name: "One Day Package without Lunch and Hi Tea",
        schedule: "aatapi_schedule_without_lunch",
        needdestination: true
    });
    places.push({
        place_name: "AATAPI Wonderland",
        package_name: "One Day Package without Ticket",
        schedule: "aatapi_schedule_without_ticket",
        needdestination: true
    });


    //REPARIAN
    places.push({
        place_name: "Riparian Riverside Camp",
        package_name: "One Day Package Lunch to Dinner (Gold)",
        schedule: "reparian_lunch_dinner_gold",
        needdestination: true
    });

    //AHMEDABAD
    places.push({
        place_name: "Ahmedabad Darshan",
        package_name: "Ahmedabad Darshan by AC Car",
        schedule: "ahmedabad_by_ac_car",
        needdestination: false
    });
    places.push({
        place_name: "Ahmedabad Darshan",
        package_name: "Ahmedabad Darshan by Double decker Bus",
        schedule: "ahmedabad_by_bus",
        needdestination: false
    });

    //Nalsarovar and LRK
    places.push({
        place_name: "Nalsarovar and LRK",
        package_name: "One Day Package",
        schedule: "nalsarovar_lrk",
        needdestination: true
    });
    //Ambaji
    places.push({
        place_name: "Ambaji",
        package_name: "One Day Package",
        schedule: "ambaji_one_day",
        needdestination: false
    });
    //Nadabet
    places.push({
        place_name: "Nadabet",
        package_name: "One Day Package",
        schedule: "nadabet_one_day",
        needdestination: false
    });
    //Pavagadh
    places.push({
        place_name: "Pavagadh - Jambughoda",
        package_name: "One day Pavagadh Champaner Jambughoda",
        schedule: "champaner_one_day",
        needdestination: false
    });
    //Orsang
    places.push({
        place_name: "Orsang Resort",
        package_name: "One day Orsang Finch",
        schedule: "orsang_finch",
        needdestination: true
    });
    //Orsang
    places.push({
        place_name: "Devs Camp",
        package_name: "One day Devs Camp Falcon",
        schedule: "devs_falcon",
        needdestination: true
    });
    //Other
    places.push({
        place_name: "Other",
        package_name: "Other",
        schedule: "other",
        needdestination: false
    });

}

function getDestinationInfo(p_destname) {
    for (var i = 0; i < destination_places.length; i++) {
        if (p_destname == destination_places[i].destination_name) {
            return destination_places[i];
        }
    }
    return 0;
}

function addDestinationDatabase() {
    //Destinations
    destination_places.push({
        place_id: "Bakor",
        destination_name: "Mahuvan Farm Stay",
        destination_information: getDestinationString("MAHUVAN")

    });
    destination_places.push({
        place_id: "Bakor",
        destination_name: "Aranakya Farm",
        destination_information: getDestinationString("ARANAKYA")

    });

    //AATAPI
    destination_places.push({
        place_id: "AATAPI Wonderland",
        destination_name: "AATAPI Wonderland",
        destination_information: getDestinationString("AATAPI")

    });
    //Riparian
    destination_places.push({
        place_id: "Riparian Riverside Camp",
        destination_name: "Reparian Riverside Camp",
        destination_information: getDestinationString("REPARIAN")

    });
    //Polo Forest
    destination_places.push({
        place_id: "Polo Forest",
        destination_name: "Ambica Exotica",
        destination_information: getDestinationString("AMBICA")

    });
    destination_places.push({
        place_id: "Polo Forest",
        destination_name: "Polo Retreat",
        destination_information: getDestinationString("POLORETREAT")

    });
    destination_places.push({
        place_id: "Polo Forest",
        destination_name: "Chabutaro",
        destination_information: getDestinationString("CHABUTARO")

    });



    //LRK
    destination_places.push({
        place_id: "Nalsarovar and LRK",
        destination_name: "Bhavna Farm",
        destination_information: getDestinationString("BHAVNA")
    });
    destination_places.push({
        place_id: "Nalsarovar and LRK",
        destination_name: "Desertcoursers",
        destination_information: getDestinationString("DESERTCOURSERS")

    });

    //ORSANG
    destination_places.push({
        place_id: "Orsang Resort",
        destination_name: "Orsang Resort",
        destination_information: getDestinationString("ORSANG")
    });
    //ORSANG
    destination_places.push({
        place_id: "Devs Camp",
        destination_name: "Devs Camp",
        destination_information: getDestinationString("DEVS")
    });


}


function getDestinationString(p_place) {
    var msg = "";
    switch (p_place) {
        case "MAHUVAN":
            msg += "Mahuvan farm" + lb;
            msg += "Location : https://maps.app.goo.gl/zDPjWzC9RXn2hqiy7" + lb2;
            msg += "Contact person" + lb;
            msg += "Chitrang Bhai" + lb;
            msg += "6355641575" + lb2;
            msg += "Nisarg Bhai" + lb;
            msg += "8141720522" + lb2;
            msg += "*Amenities*" + lb;
            msg += "Swimming Pool" + lb;
            msg += "10 High Rope Adventure Activities" + lb;
            msg += "Board Games like ( Carom , Chess, Cards Ludo Etc)" + lb;
            msg += "Outdoor Games like (Cricket , Volley Ball, Badminton, Tug of War)";

            break;

        case "ARANAKYA":
            msg += "Aranakya farm" + lb;
            msg += "Location : https://g.page/aranyakabakor?share" + lb2;
            msg += "Contact person" + lb;
            msg += "Sunil bhai" + lb;
            msg += "94260 07042" + lb2;
            msg += "Jaydeep bhai" + lb;
            msg += "96249 59669";


            break;
        case "AATAPI":
            msg += "AATAPI Wonderland" + lb;
            msg += "Address" + lb;
            msg += "Ajwa Garden, Rayan Talavdi, Village, Vadodara, Gujarat" + lb;
            msg += "Location : https://goo.gl/maps/8CsCSqQAoop6Yvxz8" + lb2;
            msg += "Meet to Amit Bhai at Reception counter and get Belts";
            break;
        case "REPARIAN":
            msg += "Reparian Riverside Camp" + lb;
            msg += "Address" + lb;
            msg += "Lachhanpura, Near Rasulpur, Taluka, Savli, Gujarat 391770" + lb2;
            msg += "Location : https://g.page/riparianresort?share" + lb2;
            msg += "Route : Google map is shwoing odd default root. So go on Savli > Rasulpur > Lachhanpura Route " + lb;
            msg += "Meet at reception counter" + lb;
            msg += "99253 66622 (In case if you have query";
            break;

        case "AMBICA":
            msg += "Ambica Exotica Resort" + lb;
            msg += "Address" + lb;
            msg += "Near Polo Forst, Vijaynagar" + lb2;
            msg += "Location : https://g.page/Ambicaexoticaresort?share" + lb2;
            msg += "Route : Ahmedabad > Vijapur > Polo " + lb;
            msg += "Meet at reception counter Mr. Bhati" + lb;
            msg += "9825594252 (In case if you have query";
            break;

        case "POLORETREAT":
            msg += "Polo Retreat Resort" + lb;
            msg += "Address" + lb;
            msg += "Near Polo Forst, Vijaynagar" + lb2;
            msg += "Location : https://goo.gl/maps/8Tgao2oMn8T4SedV8" + lb2;
            msg += "Route : Ahmedabad > Vijapur > Polo " + lb;
            msg += "Meet at reception counter" + lb;
            msg += "Contact Number : 9327786652";
            break;
        case "CHABUTARO":
            msg += "Chabutaro" + lb;
            msg += "Address" + lb;
            msg += "Polo Forest Road, Village, Abhapur, Gujarat 383460" + lb2;
            msg += "Location : https://goo.gl/maps/7q9FmSsrNnehJH879" + lb2;
            msg += "Route : Ahmedabad > Vijapur > Polo " + lb;
            msg += "Meet at reception counter Mr. Nihir" + lb;
            msg += "Contact Number : 9426064448";
            break;

        case "BHAVNA":
            msg += "Bhavna Resort and Farm" + lb;
            msg += "Address" + lb;
            msg += "In between Patdi and Zainabad" + lb2;
            msg += "Location : https://goo.gl/maps/gZhM6gHTkbTCnmBaA" + lb2;
            msg += "Route : Ahmedabad > Malvan Chowkdi > Patdi " + lb;
            msg += "Meet at reception counter and give your name" + lb;
            msg += "9427216059 (In case if you have query";
            break;
        case "DESERTCOURSERS":
            msg += "Desertcoursers Resort" + lb;
            msg += "Address" + lb;
            msg += "Zainabad" + lb2;
            msg += "Location : https://g.page/desert-coursers?share" + lb2;
            msg += "Route : Ahmedabad > Vijapur > Polo " + lb;
            msg += "Meet Dhanraj Malik at reception counter and give your name" + lb;
            msg += "9998305501";
            break;
        case "ORSANG":
            msg += "Orsang Resort" + lb;
            msg += "Address" + lb;
            msg += "Orsang Resort" + lb2;
            msg += "Location : https://g.page/Orsangcamp?share"+ lb2;
            msg += "Route : Ahmedabad > Vadodara > Dabhoi > Orsang " + lb;
            msg += "Meet at Reception counter" + lb;
            break;
        case "DEVS":
            msg += "Devs Camp" + lb;
            msg += "Address" + lb;
            msg += "Location : https://g.page/devscampecotourism?share"+ lb2;
            msg += "Route : Ahmedabad > Vadodara > Ajwa > 21 Km > Devs Camp " + lb;
            msg += "Meet at Reception counter" + lb;
            msg += "Phone: 075758 06801" + lb;
            break;
    }
    return msg;
}

function getScheduleString(p_schedule, p_destination) {
    var msg = "";
    switch (p_schedule) {
        case "bakor_by_bus_schedule_poojan":
            msg += "- 5:00 AM Pickup Navrangpura Bus Stand" + lb;
            msg += "- 5:30 AM Pickup Naroda Patiya Devi Cinema" + lb;
            msg += "- 9 AM Reach and Reporting" + lb;
            msg += "- Breakfast" + lb;
            msg += "- Jungle Walk" + lb;
            msg += "- Lunch around 1 PM" + lb;
            msg += "- Waterfall" + lb;
            msg += "- At Camp site Archery, Berma bridge, Swimming Pool" + lb;
            msg += "- 4:30 PM or 5:00 PM Around High Tea" + lb;
            msg += "- Kaleshwari Mandir" + lb;
            msg += "- 7:00 PM Dinner" + lb;
            msg += "- 11:30 PM Drop";
            break;
        case "bakor_by_bus_schedule_moj":
            msg += "- 5:00 AM Pickup Golden Triangle , S P Stadium to Saviour Hospital Road, Navrangpura" + lb;
            msg += "- 5:30 AM Pickup Shukan mall , near Rajasthan Hospital,  Shahibaug" + lb;
            msg += "- 6:00 AM Pickup Naroda Patiya Circle" + lb;
            msg += "- 9 AM Reach and Reporting" + lb;
            msg += "- Breakfast" + lb;
            msg += "- Jungle Walk" + lb;
            msg += "- Lunch around 1 PM" + lb;
            msg += "- Waterfall" + lb;
            msg += "- At Camp site Archery, Berma bridge, Swimming Pool" + lb;
            msg += "- 4:30 PM or 5:00 PM Around High Tea" + lb;
            msg += "- Kaleshwari Mandir" + lb;
            msg += "- 7:00 PM Dinner" + lb;
            msg += "- 11:30 PM Drop";
            break;
        case "bakor_by_car_full":
            if (p_destination == "Mahuvan Farm Stay") {
                msg += "- " + getVal("travel_time") + " Pickup" + lb;
                msg += "- 9:00 am around Check-in" + lb;
                msg += "- 9:30 am - Breakfast" + lb;
                msg += "- 10 am - Waterfall visit" + lb;
                msg += "- 1:00 pm- Back to farm & Lunch" + lb;
                msg += "- 1:30 pm to 4:00 pm- Activities & Pool" + lb;
                msg += "- 4:30 pm to 6:30 pm- Kaleshwari Heritage site visit" + lb;
                msg += "- 6:30 pm - Dinner start" + lb;
                msg += "- 7:30 or 8:30 PM Depart from farm";
            }
            else {
                msg += "- " + getVal("travel_time") + " Pickup" + lb;
                msg += "- 9 AM or 9:30 AM Reach and Reporting" + lb;
                msg += "- Breakfast" + lb;
                msg += "- Jungle Trekking" + lb;
                msg += "- Lunch around 1 PM" + lb;
                msg += "- Waterfall" + lb;
                msg += "- At Camp site Archery, Berma bridge, Swimming Pool" + lb;
                msg += "- 4:30 PM or 5:00 PM Around High Tea" + lb;
                msg += "- Kaleshwari Mandir" + lb;
                msg += "- 7:30 PM around Dinner" + lb;
                msg += "- 8:30 PM Leave from Bakor" + lb;
                msg += "- 11:30 PM or 12:30 AM Drop";
            }
            break;

        case "bakor_by_car2_full":
            msg += "Day 1" + lb;
            msg += "- Reach in between 10 AM to 12 PM Reach and Reporting" + lb;
            msg += "- Check-in and refresh" + lb;
            msg += "- Jungle Trekking" + lb;
            msg += "- Lunch around 1 PM" + lb;
            msg += "- Waterfall (Guide will be provided)" + lb;
            msg += "- At Camp site Archery, Berma bridge, Swimming Pool" + lb;
            msg += "- 4:30 PM or 5:00 PM Around High Tea" + lb;
            msg += "- Kadana Dam Visit (Self Vehicle)" + lb;
            msg += "- 7:30 PM around Dinner" + lb;
            msg += "- Night Stay" + lb;
            msg += "Day 2" + lb;
            msg += "- 8:30 to 9:30 AM - Breakfast" + lb;
            msg += "- 10:00 AM Checkout" + lb;
            msg += "- Kaleshwari Mandir";
            break;

        case "polo_by_bus":
            msg += "- Pickup 5.00 A.M, Navrangpura Stadium, Mohan Mithaiwala" + lb;
            msg += "- 5:40 AM Pickup Naroda Patiya Devi Cinema" + lb;
            msg += "- 9 AM Reach and Reporting" + lb;
            msg += "- Breakfast" + lb;
            msg += "- Sightseeing" + lb;
            msg += "- Lunch around 1 PM" + lb;
            msg += "- Waterpark, Swimming pool and other activities" + lb;
            msg += "- 4:30 PM or 5:00 PM Around High Tea" + lb;
            msg += "- Leave from Polo" + lb;
            msg += "- Dinner on highway (Own expense)" + lb;
            msg += "- 10 PM Drop";
            break;

        case "polo_by_car":
            msg += "- " + getVal("travel_time") + " Pickup" + lb;
            msg += "- In between 9 AM to 10 AM Reach and Reporting" + lb;
            msg += "- Breakfast" + lb;
            msg += "- Sightseeing" + lb;
            msg += "- Lunch around 1 PM" + lb;
            msg += "- Waterpark, Swimming pool and other activities" + lb;
            msg += "- 4:30 PM or 5:00 PM Around High Tea" + lb;
            msg += "- Leave from Polo" + lb;
            msg += "- Dinner" + lb;
            msg += "- 11 PM around Drop";
            break;

        case "polo_by_car_two_days":
            msg += "*Day 1*" + lb;
            msg += "- " + getVal("travel_time") + " Pickup" + lb;
            msg += "- 11 Am around Reach and Reporting" + lb;
            msg += "- 12 PM Check in" + lb;
            msg += "- Relax at Resort" + lb;
            msg += "- Take Lunch around 1 PM" + lb;
            msg += "- Sightseeing after Lunch" + lb;
            msg += "- Come back and enjoy Swimming pool and other activities" + lb;
            msg += "- Around 6 or 6:30 PM High Tea" + lb;
            msg += "- 9 PM Dinner time" + lb;
            msg += "- Camp fire, Open air theatre and DJ Party after dinner" + lb;
            msg += "*Day 2*" + lb;
            msg += "- 9 AM Breakfast" + lb;
            msg += "- 10 AM Checkout" + lb;
            msg += "- Will cover other points comes on the way" + lb;
            msg += "- Drop ";
            break;

        case "polo_by_car2_self":
            msg += "*Day 1*" + lb;
            msg += "- 12 PM around Reach and Checkin" + lb;
            msg += "- Relax at Resort" + lb;
            msg += "- Take Lunch around 1 PM" + lb;
            msg += "- Sightseeing after Lunch" + lb;
            msg += "- Come back and relax " + lb;
            msg += "- Around 4:30 to 5:30 PM High Tea" + lb;
            msg += "- 9 PM Dinner time" + lb;
            msg += "*Day 2*" + lb;
            msg += "- 9 AM Breakfast" + lb;
            msg += "- 10 AM Checkout" + lb;
            break;



        case "polo_by_car_self":
            msg += "- In between 10 AM to 11 AM Reach and Reporting" + lb;
            msg += "- Sightseeing" + lb;
            msg += "- Lunch around 1 PM" + lb;
            msg += "- Waterpark, Swimming pool and other activities" + lb;
            msg += "- 4:30 PM or 5:00 PM Around High Tea" + lb;
            msg += "- 6:00 PM around Leave from Polo";
            break;

        case "bakor_by_car2_full":
            msg += "Day 1" + lb;
            msg += "- Reach in between 10 AM to 12 PM Reach and Reporting" + lb;
            msg += "- Check-in and refresh" + lb;
            msg += "- Sightseeingg" + lb;
            msg += "- Lunch around 1 PM" + lb;
            msg += "- At Camp site Swimming Pool, Waterrides, Activities" + lb;
            msg += "- 4:30 PM or 5:00 PM Around High Tea" + lb;
            msg += "- Relax at Resort" + lb;
            msg += "- 7:30 PM around Dinner" + lb;
            msg += "- Night Stay" + lb;
            msg += "Day 2" + lb;
            msg += "- 8:30 to 9:30 AM - Breakfast" + lb;
            msg += "- 10:00 AM Checkout";
            break;

        case "sou_by_bus":
            msg += "- Pickup 6.00 A.M, Sarkhej Cross Road, Sabar Hotel" + lb;
            msg += "- 6:15 AM Prahladnagar Cross Road" + lb;
            msg += "- 6:30 AM Paldi Cross Road, Bharat Petrol Pump" + lb;
            msg += "- 6:45 AM Narol, Isanpur, Ghodasar, Jashoda Cross Road" + lb;
            msg += "- 7:00 AM Surbhi Hotel Baroda Express Highway Junction" + lb;
            msg += "- Breakfast around 9:30 AM (Poha, Tea, Coffee)" + lb;
            msg += "- Lunch around 1 PM (Chhole Puri, Pulav, Sweet, buttermilk, frimes)" + lb;
            msg += "- Dinner around 8:30 PM (Puri, Daal, Shak, Bhat, Buttermilk, Frimes, Salad)" + lb;
            msg += "- 12:30 AM Drop";
            break;

        case "sou_by_car_js":
            msg += "- " + getVal("travel_time") + " Pickup" + lb;
            msg += "- Jungle Safari & Pet house around 11 AM" + lb;
            msg += "- Lunch (Around 1 PM) in SOU Premises (Own Expense)" + lb;
            msg += "- Statue of Unity (After lunch)" + lb;
            msg += "- Sardar Sarovar Dam (Before 5 PM)" + lb;
            msg += "- Valley of flowers" + lb;
            msg += "- Laser Show Around 7:30 or 8:00 PM" + lb;
            msg += "- Departure After Laser Show" + lb;
            msg += "- Dinner on Highway (Own Expense) around 9:30" + lb;
            msg += "- Drop approx 12:30 AM";
            break;

        case "modhera_schedule":
            msg += "- " + getVal("travel_time") + " Pickup" + lb;
            msg += "- 8:30 AM Breakfast halt" + lb;
            msg += "- Reach at modhera sun temple" + lb;
            msg += "- Patola House Patan" + lb;
            msg += "- Rani ki vav" + lb;
            msg += "- Lunch halt" + lb;
            msg += "- Sidhpur bohra haveli, bindu Sarovar, 365 window house" + lb;
            msg += "- Dinner Halt" + lb;
            msg += "- Drop approx 9:30 PM";
            break;

        case "aatapi_schedule_with_lunch":
            msg += "- Reach after 10:00 AM" + lb;
            msg += "- Meet to Amitbhai and pay amount and get belts and food coupons" + lb;
            msg += "- Enter in the park" + lb;
            msg += "- Enjoy Rides" + lb;
            msg += "- Take Lunch " + lb;
            msg += "- Enjoy waterpark and other pending rides" + lb;
            msg += "- Take Hi Tea"+ lb;
            msg += "- Enjoy Other rides and view laser show" + lb;
            msg += "- Leave";
            break;
        case "aatapi_schedule_without_lunch":
            msg += "- Reach after 10:00 AM" + lb;
            msg += "- Meet to Amitbhai and pay amount and get belts" + lb;
            msg += "- Enter in the park" + lb;
            msg += "- Enjoy Rides" + lb;
            msg += "- Take Lunch (from AATAPI's many restaurants- own expense)" + lb;
            msg += "- Enjoy waterpark and other pending rides" + lb;
            msg += "- Take Hi Tea (from AATAPI's many restaurnats - own expense)" + lb;
            msg += "- Enjoy Other rides and view laser show" + lb;
            msg += "- Leave";
            break;
        case "aatapi_schedule_without_ticket":
            msg += "- Reach after 10:00 AM" + lb;
            msg += "- Reach at reception counter and buy tickets " + lb;
            msg += "- Enter in the park" + lb;
            msg += "- Enjoy Rides" + lb;
            msg += "- Take Lunch (from AATAPI's many restaurants- own expense)" + lb;
            msg += "- Enjoy waterpark (as per package) and other pending rides" + lb;
            msg += "- Take Hi Tea (from AATAPI's many restaurnats - own expense)" + lb;
            msg += "- Enjoy Other rides and view laser show (as per package)" + lb;
            msg += "- Leave";
            break;
        case "reparian_lunch_dinner_gold":
            msg += "- Reach after 11:00 AM" + lb;
            msg += "- Meet at Reception" + lb;
            msg += "- Activities time 10:30 AM to 12:30 PM so you can enjoy activities" + lb;
            msg += "- Enjoy River" + lb;
            msg += "- 1:00 PM Around Lunch at Hall" + lb;
            msg += "- 2:00 PM Swimming pool" + lb;
            msg += "- 3:00 PM Activities FREE / PAID (3 PM to 5:30 PM)" + lb;
            msg += "- 5:00 PM Take Hi Tea" + lb;
            msg += "- Enjoy river" + lb;
            msg += "- 8:00 PM Dinner" + lb;
            msg += "- Leave after dinner";
            break;

        case "ahmedabad_by_ac_car":
            msg += "- 10:00 AM - Gandhi ashram" + lb;
            msg += "- Show the Riverfront on the way" + lb;
            msg += "- 11:30 AM - Huthhe singh jain temple (4 km) approx duration 30 mins)" + lb;
            msg += "- Show the Sidi Saiyad Mosque from outside + Lucky tea" + lb;
            msg += "- 12:30 PM - Kalupur Swaminarayan mandir (2 kms) apprix duration 15 mins)" + lb;
            msg += "- 1:00 PM - Lunch at Auto world musuem (approx duration 1.5 hrs) (15 km)" + lb;
            msg += "- 3:00 Pm - Adalaj stepwell (20 km) (Average duration 1 hr)" + lb;
            msg += "- 4:30 PM - Akshardham (15 km)" + lb;
            msg += "- Kankariya Lake" + lb;
            msg += "- Drop after Kankariya";
            break;

        case "ahmedabad_by_bus":
            msg += "- REPORTING TIME : 08:45 AM AT GANDHI ASHRAM" + lb;
            msg += "- TOUR STARTING TIME : 09:00 AM FROM GANDHI ASHRAM" + lb;
            msg += "- VISIT SIDI SAIYAD MOSQUE, BHADRA FORT, BHADRAKALI TEMPLE, TEEN DARWAZA, JAMA MASJID & BACK TO BUS BY WALK" + lb;
            msg += "- DRIVE THROUGH ASTODIYA ROAD, RANI SIPRI MASJID & VISIT KANKARIA LAKE, SHAKING MINARETS, HUTHEESING JAIN TEMPLE" + lb;
            msg += "- LUNCH AT TORAN (AT OWN COST)" + lb;
            msg += "- VISIT RIVERFRONT (ENTARTICA WATER SPORTS)" + lb;
            msg += "- ARRIVAL & VISIT AT GANDHI ASHRAM AT 06:00 PM";
            break;

        case "nalsarovar_lrk":
            msg += "- " + getVal("travel_time") + " Pickup" + lb;
            msg += "- 1.5 hrs from Pickup Reach to Nalsarovar" + lb;
            msg += "- Boating" + lb;
            msg += "- 11 around Leave from Nalsarovar" + lb;
            msg += "- Reach to Patdi for Lunch at Ashirwad Hotel" + lb;
            msg += "- After lunch, we will reach to Desertcourser Resort" + lb;
            msg += "- 4:00 PM Safari start" + lb;
            msg += "- Return from safari after sunset" + lb;
            msg += "- Dinner at Resort" + lb;
            msg += "- Leave from resort" + lb;
            msg += "- 11 PM around drop" + lb;

            break;
        case "ambaji_one_day":
            msg += "- " + getVal("travel_time") + " Pickup" + lb;
            msg += "- 8:30 AM â€“ Breakfast Halt" + lb;
            msg += "- 10:00 AM â€“ Brahma ji mandir (Optional)" + lb;
            msg += "  https://goo.gl/maps/xJ63LJBHd3r4kLUL9" + lb2;

            msg += "- Khedbrahma Ambica Mandir (mini ambaji)" + lb;
            msg += "  https://goo.gl/maps/Kdngf6joFwW529CZA" + lb2;

            msg += "- 12 PM - Koteshwar Mahadev (Rush may be expected due to Shivratri)" + lb;
            msg += "  https://goo.gl/maps/hgT4KXvLjEeTPsAs8" + lb2;

            msg += "- Kamakshi Devi Mandir" + lb;
            msg += "  https://goo.gl/maps/XmBL57MVwtS9M6zs6" + lb2;

            msg += "- Lunch Halt" + lb;
            msg += "- Kumbhariya Jain temple (Optional)" + lb;
            msg += "  https://goo.gl/maps/cckQ8u7USukEKasNA" + lb2;

            msg += "- Mansarovar Kund" + lb;
            msg += "  https://goo.gl/maps/fTSm921TFJA8cu5r8" + lb2;


            msg += "- Ambaji Main Mandir (Darshan time : 12:30 to 4:30 PM)" + lb;
            msg += "  https://goo.gl/maps/xuRzEXrCWZREWvAe8" + lb2;

            msg += "- 51 Shaktipeeth (2.5 km walking )" + lb;
            msg += "  https://goo.gl/maps/sJYinpqCCxzAxLvN6" + lb2;

            msg += "- Gabbar Ropeway (Open till 6 PM)" + lb;
            msg += "  https://goo.gl/maps/AUryS6ztcBn9217S8" + lb2;

            msg += "- Start leaving" + lb;
            msg += "- Dinner Halt" + lb;
            msg += "- Drop" + lb;
            break;
        case "nadabet_one_day":
            msg += "- " + getVal("travel_time") + " Pickup" + lb;
            msg += "- 8:30 AM â€“ Breakfast Halt" + lb;
            msg += "- 1:00 PM â€“ Around reach to T Point" + lb;
            msg += "  https://goo.gl/maps/xDcPuzk3ku93yzg87" + lb2;

            msg += "- 1:30 PM Take the Lunch at Food court of Temple" + lb;
            msg += "- 2:30 PM - Go to Zero Point" + lb;
            msg += "  https://goo.gl/maps/3yeaGFmNLZASNZAT6" + lb2;

            msg += "- 4 PM Back to T Point" + lb;
            msg += "- Enjoy Museum and Activities" + lb;
            msg += "- Visit Nadeshwari Mandir" + lb;
            msg += "- Enjoy parade at Pared Ground during Sunset (If there will be)" + lb;
            msg += "  https://goo.gl/maps/G9oLFfrje9NpiR2eA" + lb2;

            msg += "- Leaving" + lb;
            msg += "- Dinner Halt Near Radhanpur" + lb;
            msg += "- Drop around 1 AM " + lb;
            break;
        case "champaner_one_day":
            msg += "- " + getVal("travel_time") + " Pickup" + lb;
            msg += "- 8 AM breakfast halt" + lb;
            msg += "- 10:30 AM Champaner Heritage Site" + lb;
            msg += "- 12:30 PM Dhanpari eco camp site. Take lunch" + lb;
            msg += "- 2:00 PM Zund Hanuman mandir and Kada lake " + lb;
            msg += "- (Hathni mata waterfall subject to running flow. Local person of jambughoda will share current condition)" + lb;
            msg += "- 5:00 PM Manchi pavagadh" + lb;
            msg += "- 7:00 PM return from pavagadh" + lb;
            msg += "- Leaving from pavagadh" + lb;
            msg += "- 9 Pm dinner halt" + lb;
            msg += "- 11:30 PM or 12:30 AM Drop" + lb;
            break;

            case "orsang_finch":
                msg += "- " + getVal("travel_time") + " Pickup" + lb;
                msg += "- 10:00 AM Reach to Orsang and get Belt" + lb;
                msg += "- 10:15 AM Welcome and Take Breakfast" + lb;
                msg += "- Start adventure activities after breakfast" + lb;
                msg += "- 12:30 PM or 1:00 PM Start Lunch" + lb;
                msg += "- After lunch, enjoy Swimming pool, waterfall & music" + lb;
                msg += "- 5 PM Arond take hi-Tea" + lb;
                msg += "- After Hi-Tea, go for Trekking, pending activities or enjoy paid activities" + lb;
                msg += "- relax and enjoy light music" + lb;
                msg += "- 8:00 or 8:30 PM Around take dinner" + lb;
                msg += "- Leave after dinner" + lb;
                msg += "- Drop after 3 hrs" + lb;
                break;
            case "devs_falcon":
                msg += "- " + getVal("travel_time") + " Pickup" + lb;
                msg += "- 10:00 AM Reach to Devs Camp and get Belt" + lb;
                msg += "- 10:15 AM Welcome and Take Breakfast" + lb;
                msg += "- Start adventure activities after breakfast" + lb;
                msg += "- 12:30 PM or 1:00 PM Start Lunch" + lb;
                msg += "- After lunch, enjoy Swimming pool, rain, music & Paid activities" + lb;
                msg += "- 5 PM Arond take hi-Tea" + lb;
                msg += "- Leave after Hi Tea" + lb;
                break;


        case "other":
            msg += "- " + getVal("travel_time") + " Pickup" + lb;
            break;
    }
    return msg;
}
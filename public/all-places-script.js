hello


$(document).ready(function () {

  updateThingsToCarry();

  //Driver - Call DATABASE.js
  addDriverDatabase();

  //Guide - Call DAATABASE.js
  addGuideDatabase();

  //Add Place and Packages - Call DATABASE.js
  addPlaceDatabase();

  //Add Destination Details - Call DATABASE.js
  addDestinationDatabase();

  //Default parameter load
  defaultLoad();

  //Event initialize
  initInvents();
});

//############################################################
// DEFAULT LOAD
// - Add Driver into the Combobox
// - Add Place and package details in Combobox
// - Show hide fields based on trip type
//############################################################

function defaultLoad() {

  //version number
  $("#versionid").html("<small>" + "DB : " + dbversion + "  <br> " + " MB : " + mbversion + "</small>");
  //All Driver Details
  $('#driver_name').append(new Option("Select Driver", 0));
  for (var i = 0; i < drivers.length; i++) {
    $('#driver_name').append(new Option(drivers[i].driver_name, drivers[i].driver_name));
  }

  //All Guide details
  $('#guide_name').append(new Option("Select Guide/Manager", 0));
  for (var i = 0; i < guides.length; i++) {
    $('#guide_name').append(new Option(guides[i].guide_name, guides[i].guide_name));
  }

  //Add Place Details
  var usedName = [];
  $('#place').append(new Option("Select Place", 0));
  for (var i = 0; i < places.length; i++) {
    var found = false;
    for (var j = 0; j < usedName.length; j++) {
      if (places[i].place_name == usedName[j]) {
        found = true;
      }
    }
    if (found == false) {
      $('#place').append(new Option(places[i].place_name, places[i].place_name));
      usedName.push(places[i].place_name);
    }
  }

  //Show hide trip type
  checkTripType();

  //Show hide guided trip
  onOffGuidedTrip();
}

//############################################################
// INIT EVENT
// - TRIP TYPE Combobox Change Event Handler
// - PLACE Combobox Change Event Handler
// - DESTINATION Combobox Change Event Handler
// - DRIVER Combobox Change Event Handler
// - AMOUNT Textbox Change Event Handler
// - DRIVER AMOUNT Textbox Change Event Handler
// - PACKAGE Combobox Change Event Handler
// - TRAVEL TIME Textbox Change Event Handler
// - PACKAGE AMOUNT Textbox Change Event Handler
//############################################################
function initInvents() {

  //Trip type change event handler
  $('#trip_type').change(function () {
    checkTripType();
  });

  //Place change event handler
  $('#place').change(function () {
    $('#package').html("");
    $('#package').append(new Option("Select Package", 0));
    for (var i = 0; i < places.length; i++) {
      if (places[i].place_name == $('#place').val()) {
        $('#package').append(new Option(places[i].package_name, places[i].package_name));
      }
    }

    updateThingsToCarry($('#place').val());

    $('#destinations').html("");
    $('#destinations').append(new Option("Select Destinations", 0));
    for (var i = 0; i < destination_places.length; i++) {
      if (destination_places[i].place_id == $('#place').val()) {
        $('#destinations').append(new Option(destination_places[i].destination_name, destination_places[i].destination_name));
      }
    }
  });

  //Destination change event handler
  $('#destinations').change(function () {
    var destination_obj = getDestinationInfo($('#destinations').val());
    $("#travel_schedule").val(getSchedule(destination_obj.destination_name));
    $("#destination_info").val(destination_obj.destination_information);
  });


  //Driver Change Event handler
  $('#guide_name').change(function () {
    var guide_obj = getGuideInfo($('#guide_name').val());
    $("#guide_number").val(guide_obj.guide_no);
  });

  $('#guided_trip').change(function () {
    onOffGuidedTrip();
  });

  //Driver Change Event handler
  $('#driver_name').change(function () {
    for (var i = 0; i < drivers.length; i++) {
      if (drivers[i].driver_name == $('#driver_name').val()) {
        $("#driver_number").val(drivers[i].driver_no);
        $("#car_name").val(drivers[i].car_name);
        $("#car_number").val(drivers[i].car_number);
      }
    }
  });

  //Amount Change Event Handler
  $("#paid_amount").blur(function () {
    if ($("#total_amount").val()) {
      var bal = Number($("#total_amount").val()) - Number($("#paid_amount").val());
      $("#pending_amount").val(bal);
    }
  });

  //Driver Amount Change Event Handler
  $("#driver_amount").blur(function () {
    amountChange();
  });

  //Package Change Event Handler
  $("#package").change(function () {
    show_destination_section = false;
    $(".destination_section").hide();
    for (var i = 0; i < places.length; i++) {
      if (places[i].place_name == $('#place').val()) {
        if (places[i].package_name == $('#package').val()) {
          if (places[i].needdestination == true) {
            $(".destination_section").show();
            show_destination_section = true;
          }
        }
      }
    }
  });

  //Travel Time Change Event Handler
  $("#travel_time").change(function () {
    $("#travel_schedule").val(getSchedule());
  });

  //Package Amount Change Event Handler
  $("#package_amount").blur(function () {
    amountChange();
  });

  $('.customer_notes_add').change(function () {
    customerNotesSettings();
  });

  $('.carry_things').change(function () {
    carryThingsSettings();
  });
}
//############################################################
// GENERATE BUTTON PRESS
// - Show hide fields Trip Type
// - Prepare Message
//############################################################
function generate_btn() {

  //Show hide trip type
  checkTripType();

  //Build Message
  var msg = "";
  msg = "Hello " + $("#client_name").val() + lb2;
  msg += "Here are the details about your upcoming trip!!." + lb2;

  var destinationPlace = "Place : *" + getVal("place") + "*" + lb2;



  var things_to_carry = "*Things to Carry*" + lb + getVal("things_to_carry") + lb2;

  //Driver and Car Details
  var driver_car = "";
  if (trip_type != "Self Vehicle") {

    if (isGuidedTrip() == true) {
      driver_car = "*Manager and Car details*" + lb;
      driver_car += "Manager Name : " + getVal("guide_name") + lb;
      driver_car += "Manager Number : " + getVal("guide_number") + lb;
      driver_car += "Vehicle : " + getVal("car_name") + lb;
      driver_car += "Vehicle Number : " + getVal("car_number") + lb2;
    }
    else {
      driver_car = "*Driver and Car details*" + lb;
      driver_car += "Driver Name : " + getVal("driver_name") + lb;
      driver_car += "Driver Number : " + getVal("driver_number") + lb;
      driver_car += "Car : " + getVal("car_name") + lb;
      driver_car += "Car Number : " + getVal("car_number") + lb2;
    }

  }

  //Destination Details
  var destination_str = "";
  if (show_destination_section == true) {
    if (getVal("destination_info") != 0) {
      destination_str += "*Destination*" + lb;
      destination_str += getVal("destination_info") + lb2;
    }
  }


  //Schedule
  var schedules = "*Tentative Schedule*" + lb;
  schedules += $("#travel_schedule").val() + lb2;

  //Customer Payment
  var customer_payment = "*Payment Details*" + lb;
  customer_payment += "Persons : " + getVal("client_person") + lb;
  customer_payment += "Total Amount : Rs. " + getVal("total_amount") + lb;
  customer_payment += "Paid : Rs. " + getVal("paid_amount") + lb;
  customer_payment += "Pending : Rs. " + getVal("pending_amount") + lb2;

  //Customer Notes
  var customer_str = "*Note*" + lb;
  customer_str += "- " + getVal("customer_notes") + lb2;

  //Thanks
  customer_str += "Thank you for choosing Pikniks!!!" + lb2;
  customer_str += "We wish you memorable trip..." + lb2;
  customer_str += "For any query, complain, issue feel free to contact us on 7567951899" + lb2;

  //Greetings
  var footer_text = "Thanks" + lb;
  footer_text += "Pikniks" + lb;
  footer_text += "www.pikniks.in" + lb;

  var msg_customer = msg + destinationPlace + getPickupTimeAndAddress("CUSTOMER") + driver_car + schedules + things_to_carry + destination_str + customer_payment + customer_str + footer_text;

  //Upcoming Trip Driver Welcome message
  var msg_driver = "Your upcoming trip!! " + lb2;
  var msg_manager = "Your upcoming trip!! " + lb2;

  var customer_info = "*Customer Details*" + lb;
  customer_info += "Customer Name : " + getVal("client_name") + lb;
  customer_info += "Mobile : " + getVal("client_number") + lb;
  customer_info += "Persons : " + getVal("client_person") + lb2;

  var manager_info = "";
  var guide_msg = "";
  var driver_amount = "";
  var driver_notes = "";
  var vehicle = "Vehicle - " + getVal("car_name") + lb;

  var manager_notes = "";
  var manager_msg = "";
  var driver_msg = "";

  driver_notes = "*Notes*" + lb;
  driver_notes += "- " + getVal("driver_notes") + lb;

  if (isGuidedTrip() == true) {

    manager_info = "*Manager Details*" + lb;
    manager_info += "Manager Name : " + getVal("guide_name") + lb;
    manager_info += "Mobile : " + getVal("guide_number") + lb2;

    guide_msg = "Customer Pasethi Levana " + getVal("pending_amount") + lb2;
    guide_msg += "Driver ne Apvana " + getVal("driver_amount") + lb2;
    guide_msg += "Tamara " + getVal("guide_amount") + lb2;

    driver_amount += "Manager Tamne Apse " + getVal("driver_amount") + lb2;

    manager_notes = "*Notes*" + lb;
    manager_notes += "- " + getVal("manager_notes") + lb;

    manager_msg = msg_manager + destinationPlace + customer_info + getPickupTimeAndAddress("DRIVER") + schedules + destination_str + guide_msg + manager_notes;
    driver_msg = msg_driver + vehicle + destinationPlace + getPickupTimeAndAddress("DRIVER") + manager_info + schedules + driver_amount + driver_notes;
    $("#message_manager").val(manager_msg);
  }
  else {
    driver_amount = "Customer Pasethi Levana " + getVal("pending_amount") + lb2;
    driver_amount += "Tamara " + getVal("driver_amount") + lb2;

    driver_msg = msg_driver + vehicle + destinationPlace + getPickupTimeAndAddress("DRIVER") + customer_info + schedules + destination_str + driver_amount + driver_notes;
  }
  $("#message_driver").val(driver_msg);
  $("#message_customer").val(msg_customer);
}

function getPickupTimeAndAddress(p_msgfor) {
  var pickupTimeAddress = "Date : " + getVal("travel_date") + lb;


  if (trip_type != "Self Vehicle") {
    pickupTimeAddress += "Pickup time : " + getVal("travel_time") + lb2;
    if (p_msgfor == "CUSTOMER") {
      if ($('#pickup_show').attr('checked') == "checked") {
        pickupTimeAddress+= getSpecificTimeandAddress();
      }
    }
    else{
      pickupTimeAddress+= getSpecificTimeandAddress();
    }
  }
  else {
    pickupTimeAddress += "Reach time : " + getVal("travel_time") + lb2;
  }
  return pickupTimeAddress;
}
function getSpecificTimeandAddress() {
  var str = "Pickup Address :" + lb;
  str += getVal("client_address") + lb;
  if (ifExist("google_map"))
    str += lb + "Map : " + getVal("google_map") + lb2;
  else
    str += lb;
  return str;
}
function amountChange() {
  if ($("#total_amount").val() && $("#driver_amount").val() && $("#package_amount").val()) {
    var bal = Number($("#total_amount").val()) - Number($("#driver_amount").val()) - Number($("#package_amount").val());
    $("#profit_amount").val(bal);
  }
}

function copyToClipboard(element_id) {

  navigator.clipboard.writeText($(element_id).val());
}



function updateThingsToCarry(p_place) {
  //Set things to carry by default
  carryThingsSettings();
}

function carryThingsSettings() {
  var carryObj = {};

  if ($('#carry_winter').attr('checked') == "checked") {
    carryObj["WINTER"] = true;
  }
  if ($('#carry_summer').attr('checked') == "checked") {
    carryObj["SUMMER"] = true;
  }
  if ($('#carry_monsoon').attr('checked') == "checked") {
    carryObj["MONSOON"] = true;
  }
  if ($('#carry_swimmingpool').attr('checked') == "checked") {
    carryObj["SWIMMING"] = true;
  }
  if ($('#carry_trekking').attr('checked') == "checked") {
    carryObj["TREKKING"] = true;
  }
  //$("#customer_notes").val(msg);

  $("#things_to_carry").val(getThingsToCarry(carryObj));
}

function customerNotesSettings() {
  var msg = "";
  if ($('#payment_to_driver').attr('checked') == "checked") {
    msg += "- " + paymentToDriver + lb2;
  }
  if ($('#outside_vehicle').attr('checked') == "checked") {
    msg += "- " + outsideVehicle + lb2;
  }
  if ($('#laser_show').attr('checked') == "checked") {
    msg += "- " + noLaserShow + lb2;
  }
  if ($('#pickup_show').attr('checked') == "checked") {

  }
  $("#customer_notes").val(msg);
}
//*************************************************************
//
//    ABSTRACT FUNCTIONS
//
//*************************************************************

function checkTripType() {
  trip_type = $("#trip_type").val();
  $(".dont_show_for_self_car").show();
  if (trip_type == "Self Vehicle") {
    $(".dont_show_for_self_car").hide();
  }
}

function ifExist(p_div) {
  if ($("#" + p_div).val())
    return true;
  return false;
}

function getVal(p_div) {
  if ($("#" + p_div).val()) {
    return String($("#" + p_div).val()).trim();
  } else {
    if ($("#" + p_div).hasClass("dont_show_for_self_car_field") == true && trip_type == "Self Vehicle") {
      return "";
    }
    else {
      alert("Please fill value of " + p_div);
      return 0;
    }
  }
}
function getSchedule(p_destination) {
  for (var i = 0; i < places.length; i++) {
    if (places[i].place_name == $('#place').val()) {

      if (places[i].package_name == $('#package').val()) {
        return getScheduleString(places[i].schedule, p_destination);
      }
    }
  }
  return "";
}

function onOffGuidedTrip() {
  if (isGuidedTrip() == true) {
    $(".on_guided_trip").show();
  }
  else {
    $(".on_guided_trip").hide();
  }
}

function isGuidedTrip() {
  if ($('#guided_trip').attr('checked') == "checked")
    return true;
  return false;
}
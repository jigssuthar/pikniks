//3.00 (11-10-2022)

//****************************************************
//    INITILIZATION
//****************************************************
var max_persons = 70;
var divSequence = [];jgj

var stages = 0;
var is_peak_season = false;
var is_two_days = false;
var is_customization_required = false;//Version - 3.1
var car, start_place;
var selected_attraction = [];
var selected_on_way_attraction = [];

var common_style = "<div style='font-size:10px; line-height:15px;'>";
var common_style_end = "</div>";
var getTotalPackagePrice;
var totalPrice;
var min_km = 0;

//Classes Main Car Calculator
var car_calculator;
var steps_manager;
var display_manager;
var car_customization;

var selected_destination_class;

//*****************************************************
//
//    MAIN FUNCTIOANLITY
//
//*****************************************************
$(document).ready(function () {

    car_calculator = new CarCalculatorClass();
    steps_manager = new StepsManager();
    display_manager = new DisplayManager();
    car_customization = new CarCustomization();

    refreshCarData(false);

    //Div sequence reset and hide initially
    steps_manager.resetDivSequence();
    steps_manager.hideAll();

    addDestinationCombobox();

    $("#customization_area").hide();

    //Combobox and other events
    $(".select-destination").change(function () {
        btnPressed(null, "step-1");
    });
    $(document).on('change', '.select-members', function () {
        btnPressed(null, "step-2");
    });
    $(".select-start").change(function () {
        btnPressed(null, "step-3");
    });
    $(".select-car").change(function () {
        btnPressed(null, "step-4");
    });
    $(".select-pacakge").live('change', function () {
        btnPressed(null, "step-5-select-package");
    });

    $(".discount_input").live('change', function () {
        btnPressed(null, "step-6-select-discount");
    });

    $("#club_price").live('change', function () {
        btnPressed(null, "step-6-select-discount");
    });
    $("#show_schedule").live('change', function () {
        btnPressed(null, "step-6-select-discount");
    });

    //Checkboxes events
    $("#peak_season").change(function () {
        peakSeasonAddedPrice($("#peak_season").prop('checked'));
    });
    $("#two_days").change(function () {
        twoDaysSet($("#two_days").prop('checked'));
    });
    $("#premium_days").change(function () {
        premiumDaysSet($("#premium_days").prop('checked'));
    });
    //Version - 3.1 - START
    $("#customization_cars").change(function () {
        customizationSet($("#customization_cars").prop('checked'));
    });
    $(".car_custom").keyup(function () {
        customCarRateChange();
    });
    $(".car_custom_change").change(function () {
        customCarRateChange();
    });
    //END

    $(".other-attraction").change(function () {
        busVsIndividualAttractions($(this));
    });
    $(".way-attraction").live('change', function () {
        getListofOntheWayAttraction();
    });

    //Add default sequence
    steps_manager.addUpdateSequence();
});


//**************************************************************** */
//      FIRE FUNCTION WHEN NEXT BUTTON PRESSED
//**************************************************************** */
function btnPressed(p_btn, p_step) {
    steps_manager.setSelectStep(p_btn, p_step);

}
//**************************************************************** */
//      ADD DESTINATION COMBOBOX
//**************************************************************** */
function addDestinationCombobox() {
    $("#destination_combo").empty(str);
    var str = '<option value="NOTSELECTED" >Select Destination</option>';
    for (var i = 0; i < destinationList.length; i++) {
        str += '<option value="' + destinationList[i].obj.getDestinationCode() + '" >' + destinationList[i].obj.getDestinationName() + '</option>';
    }
    $("#destination_combo").append(str);
}
//**************************************************************** */
//      SET THE DESTINATION PLACE
//      FIRE IF p_step == "SELECTDESTINATION"
//      SET stages = 1;
//**************************************************************** */
function setDestinationPlace(p_btn) {
    //If any destination place selected or not
    if ($("#destination_combo").val() != "NOTSELECTED") {
        //Find class of the Destination from Array and get destination object
        //Destination object contain all information about selected destination.
        for (var i = 0; i < destinationList.length; i++) {
            if (destinationList[i].code == $("#destination_combo").val()) {
                selected_destination_class = destinationList[i].obj;
                break;
            }
        }

        //Clear the discount if used previously
        $("#discount").val(0);

        //Add/Update adults and Kids based on the Destinations
        $("#member_count").empty();

        //Adults and Child criteria
        var child_array = selected_destination_class.getAdultChildCriteria();
        for (var j = 0; j < child_array.length; j++) {
            $("#member_count").append(display_manager.addAdultChildCombobox(child_array[j].is_adult, child_array[j].caption, child_array[j].id));
        }

        //Add Div Sequence
        steps_manager.addUpdateSequence();

        if (p_btn)
            steps_manager.showNextDiv(p_btn);

        //If user change this after
        if (start_place)
            getStartPlace();
    }
    else {
        alert("Please select Place first!");
    }
}


//**************************************************************** */
//      GET THE SELECTED CAR
//      FIRE IF p_step == "SELECTPLACE"
//      SET stages = 3;
//**************************************************************** */
function getStartPlace(p_btn) {

    //Get start place from the checkbox
    start_place = $("input[name='start-radio']:checked").val();

    var carsPricesForDestination = selected_destination_class.getAllCarPrices(is_two_days, is_peak_season);

    //Update car price and display on front side
    for (var i = 0; i < carsPricesForDestination.length; i++) {
        var carObj = carsPricesForDestination[i];

        $("#car-" + carObj["car"] + "-price").html(conversion(carObj[getPriceForDisplay(start_place, "COUNT")]));
        $("#car-" + carObj["car"] + "-calc").html("<span style='font-size:10px; font-weight:bold;'>" + carObj[getPriceForDisplay(start_place, "CALC")] + "</span>");
    }

    //Updating the selft drive for next section
    if (start_place == "SELFDRIVE") {
        $("#car-self").prop("checked", true);
    }

    //If user come second time, it call call selection
    if (car)
        getSelectedCar();

    steps_manager.displayTotalAndMoveNext(p_btn);
}

//**************************************************************** */
//
//      GET THE SELECTED CAR
//      FIRE IF p_step == "SELECTCAR"
//      SET stages = 4;
//
//**************************************************************** */
function getSelectedCar(p_btn) {

    //Get selected car from the UI/Input
    if ($("input[name='car-radio']:checked").val()) {

        car = $("input[name='car-radio']:checked").val();

        //Set the car price for the destination
        selected_destination_class.setCarPricesSuper(car, start_place, is_two_days);


        //VERSION - 3.1
        if(selected_destination_class.getDestinationCode()!="SOU"){
            var carCustomObj = {};
            carCustomObj.car = car;
            carCustomObj.pricePerKm = car_calculator.getPricePerKm(car);
            carCustomObj.property = selected_destination_class.getSelectedCarRowProperty("PROPERTY");
            carCustomObj.numberOfDays = $("#number-of-days").val();
            carCustomObj.da = car_calculator.getDaNightAllowance(car, "da");
            carCustomObj.nightAllowanceNights= Number($("#night-count").val());
            carCustomObj.nightAllowance = car_calculator.getDaNightAllowance(car, "nightallowance");

            car_customization.getInitialData(carCustomObj);

            customCarRateChange();
        }

        //END
        //car_calculator.setPeakSeason(p_sesaon);

        //Set selected car
        $("#car_selected").html("Car " + car);

        steps_manager.displayTotalAndMoveNext(p_btn);
    }
    else {
        alert("Please select Car");
    }
}
//VERSION - 3.1
function customCarRateChange() {

    var carCustomObj = {};

    carCustomObj.car = car;
    carCustomObj.carname = $("#car_name_manual").val();
    carCustomObj.pricePerKm = convertToNumber($("#price-per-km").val());
    carCustomObj.numberOfDays = convertToNumber($("#number-of-days").val());

    carCustomObj.totalkm = convertToNumber($("#enter-km").val());
    carCustomObj.toll = convertToNumber($("#toll").val());
    carCustomObj.parking = convertToNumber($("#parking").val());
    carCustomObj.da = convertToNumber($("#da").val());
    carCustomObj.nights = convertToNumber($("#night-count").val());
    carCustomObj.night_allowance = convertToNumber($("#night_allowance").val());
    carCustomObj.rto = convertToNumber($("#rto").val());
    carCustomObj.entry_fees = convertToNumber($("#entry_fees").val());

    car_customization.customCarRateChangeDueToInput(carCustomObj);
    steps_manager.displayTotalAndMoveNext();
}
//END

function convertToNumber(p_txt) {
    if (p_txt) {
        return Number(p_txt);
    }
    return 0;
}


//**************************************************************** */
//
//      SELECT OTHER ATTRACTIONS ONLY FOR SOU
//      FIRE IF p_step == "OTHERATR"
//      SET stages = 6;
//
//**************************************************************** */
function getListofOtherAttraction(p_btn) {

    selected_attraction = selected_destination_class.getSelectedAttractions();
    steps_manager.displayTotalAndMoveNext(p_btn);
}

//**************************************************************** */
//**************************************************************** */
//**************************************************************** */
//**************************************************************** */

//**************************************************************** */
//
// This functions fired when user select / change on the way attractions
//
//**************************************************************** */
function getListofOntheWayAttraction(p_btn) {
    selected_on_way_attraction = selected_destination_class.getOntheWaySelectedAttractions();
    steps_manager.displayTotalAndMoveNext(p_btn);
}



//**************************************************************** */
// Display total count and fill summary area
//**************************************************************** */
function displayTotal(p_btnpressed) {

    var club_price = $("#club_price").prop('checked');

    totalPrice = 0;

    getTotalPackagePrice = selected_destination_class.getTotalPackagePriceBasedOnCount("PACKAGE");

    //Clear the Summary area
    display_manager.clearAllRecords();

    //get total package price and add
    totalPrice += getTotalPackagePrice;//selected_destination_class.getTotalPackagePriceBasedOnCount("PACKAGE");

    //showing summary with price and total
    var packageDisplayObj = {};
    packageDisplayObj.pkg_caption = selected_destination_class.getSelectedPackageCaption();
    packageDisplayObj.pkg_summary = selected_destination_class.getSummary();
    if ($("#show_schedule").prop('checked') == true) {
        packageDisplayObj.schedule = selected_destination_class.getSchedule() + "<br>";
    }
    if (club_price != true) {
        packageDisplayObj.clubString = selected_destination_class.getPackageStringBasedOnCount({ showamount: true, showonlytotal: false, obj: "PACKAGE" });
    }

    //Add row in the summary
    display_manager.addPlaceInSummary(display_manager.createAndGetPackageDiv(packageDisplayObj), conversion(getTotalPackagePrice));

    //Display Discount Area and Minus the discount amount
    totalPrice -= displayDiscount(club_price)

    //selected Attraction
    totalPrice += displaySelectedAttractions();

    //Display on the way attractions
    totalPrice += displayOnTheWayAttractions(club_price);

    //Display Car name
    var carPrice = 0;
    var carName = "";
    if (is_customization_required == true) {
        carPrice = Number(car_customization.getCustomCarObjectProperty("total"));
        if (carPrice > 0) {
            carName = "<b>AC Car : " + car_customization.getCustomCarObjectProperty("carname") + "</b><br>";
        }
    }
    else {
        carPrice = selected_destination_class.getSelectedCarPrice();
        if (carPrice > 0) {
            carName = "<b>AC Car : " + selected_destination_class.getSelectedCar() + "</b><br>";
        }
    }

    //Get Total Car Price
    totalPrice += carPrice;

    if (carPrice > 0) {
        carName += common_style;
        carName += "Including Toll Tax, Driver Allowance, Parking, Home to Home Travelling<br>";
        carName += common_style_end;
    }
    display_manager.addPlaceInSummary(carName, conversion(carPrice), "bg-warning");



    //Total sum of the package
    var totalSum = selected_destination_class.getPackageStringBasedOnCount({ showamount: false, showonlytotal: false, obj: "PACKAGE" });
    var totalPersons = selected_destination_class.getPackageStringBasedOnCount({ showamount: false, showonlytotal: true, obj: "PACKAGE" });

    //Total
    var totalStr = "<b>Total Price</b><br>";
    totalStr += common_style;
    totalStr += "For<br>" + totalSum + "<br>";
    totalStr += "From " + start_place;
    totalStr += common_style_end;

    //Show total persons
    $("#total_person").html("<small>Total Persons</small><br><small>" + totalSum + "</small>");

    var totalPriceStr = conversion(totalPrice) + "<br><br>(" + conversion(Math.round(totalPrice / totalPersons)) + "/Person";
    display_manager.addPlaceInSummary(totalStr, totalPriceStr, "bg-danger", "background-color:#ccc", "TOTAL");

    //Summary title update
    $("#places-covered-title").html("Places Covered & Price Summary - " + selected_destination_class.getDestinationName());

    //Final display
    animatePrice(totalPrice, p_btnpressed);
}

function displayDiscount(p_show_discount) {
    var discountAmount = $("#discount").val();
    var discountTotal = 0;
    var discount_str = "";

    if (discountAmount > 0) {
        var discountType = $("#discounttype").val();
        discount_str = "<b>Discount/Adjust</b><br>";
        discount_str += common_style;
        if (discountType == "Percentage") {
            discount_str += conversion(discountAmount, "xxx", "%", "AFTER") + " - " + discountType + "<br>";
            discountTotal = Math.round((discountAmount * getTotalPackagePrice) / 100);
            discount_str += "<b>" + conversion(getTotalPackagePrice) + " / " + conversion(discountAmount, "xxx", "%", "AFTER") + " = " + conversion(discountTotal) + "</b>";
        }
        if (discountType == "Flat") {
            discountTotal = discountAmount;
            discount_str += "<b>Flat " + conversion(discountTotal) + " Discount</b>";
        }

        totalPrice -= discountTotal;

        discount_str += common_style_end;
        //Add row in the summary
        if (p_show_discount != true)
            display_manager.addPlaceInSummary(discount_str, conversion(-discountTotal));
    }
    return discountTotal;
}

function displaySelectedAttractions() {
    var tempPrice = 0;
    for (var i = 0; i < selected_attraction.length; i++) {
        //attractionstr = attractionstr + selected_attraction[i].name + ",";
        tempPrice += selected_destination_class.getTotalPriceOfTheAttraction(selected_attraction[i]);

        var placeName = "<b>" + selected_attraction[i].org_name + "</b><br>";
        placeName += common_style;
        placeName += "<b>" + selected_destination_class.getPackageStringBasedOnCount({ showamount: true, showonlytotal: false, obj: selected_attraction[i] }) + "</b>";
        placeName += common_style_end;
        display_manager.addPlaceInSummary(placeName, conversion(selected_destination_class.getTotalPackagePriceBasedOnCount(selected_attraction[i])));
    }
    return tempPrice;
}

function displayOnTheWayAttractions(p_club) {
    var tempPrice = 0;
    //on the way places
    for (var i = 0; i < selected_on_way_attraction.length; i++) {
        //onwayattraction = onwayattraction + selected_on_way_attraction[i].name + ",";
        tempPrice += selected_destination_class.getTotalPriceOfTheOntheWayAttraction(selected_on_way_attraction[i], is_two_days, car, start_place);

        var placeName = "<b>" + selected_on_way_attraction[i].org_name + "</b><br>";
        if (selected_on_way_attraction[i].summary)
            placeName += "<small>" + selected_on_way_attraction[i].summary + "</small><br>";
        if (selected_on_way_attraction[i].note1)
            placeName += "<small>" + selected_on_way_attraction[i].note1 + "</small><br>";
        if (selected_on_way_attraction[i].note2)
            placeName += "<small>" + selected_on_way_attraction[i].note2 + "</small><br>";
        if (p_club != true) {
            placeName += common_style;
            placeName += "<b>Travelling + Toll + Parking + Entry Fees : Rs. " + selected_destination_class.getTotalPriceOfTheOntheWayAttraction(selected_on_way_attraction[i], is_two_days, car, start_place) + "</b>";
            placeName += common_style_end;
        }
        display_manager.addPlaceInSummary(placeName, conversion(selected_destination_class.getTotalPriceOfTheOntheWayAttraction(selected_on_way_attraction[i], is_two_days, car, start_place)));
    }
    return tempPrice;
}
function setDestinationPackages() {
    if (selected_destination_class) {
        $("#package-container").html(selected_destination_class.getAllPackagesHTML());
        $("#on_the_way_attraction").html(selected_destination_class.getOnthewayAttractionsHTML());
    }
}
function isDestinationObjectAvailable() {
    if (selected_destination_class)
        return true;
    return false;
}
function getDestinationSequence() {
    return selected_destination_class.getSequence();
}
function resetOntheWayAttractions() {
    selected_on_way_attraction = selected_attraction = [];
}
//**************************************************************** */
// When user click on the attraction with combo of bus and its related
// This is for the Statue of unity only
//**************************************************************** */

function busVsIndividualAttractions(p_checkbox) {
    var groupOfSelectedAttraction = p_checkbox.data("group");
    if (groupOfSelectedAttraction == "bus-group") {
        $(".busonly").each(function (index) {
            $(this).prop('checked', false);
        });
    }
    else if (groupOfSelectedAttraction == "bus-only") {
        $(".busgroup").each(function (index) {
            $(this).prop('checked', false);
        });

    }
    selected_attraction = selected_destination_class.getSelectedAttractions();
    steps_manager.displayTotalAndMoveNext();
}

//***********************************************************
//    SECOND LEVEL FUNCTION
//***********************************************************




//***********************************************************
// Set one or two days
//***********************************************************
function twoDaysSet(p_flag) {
    is_two_days = p_flag;
    if (stages >= 1) {
        getStartPlace();
    }
}

//***********************************************************
// Peak season
//***********************************************************
function premiumDaysSet(p_val) {
    is_peak_season = p_val;
    if (stages >= 1) {
        car_calculator.setPeakSeason(p_sesaon);
        //refreshCarData(is_peak_season);
        getStartPlace();
    }
}

function getPriceForDisplay(p_start_place, p_count_calc) {
    var str = p_start_place;
    if (p_count_calc == "COUNT") {
        if (is_peak_season == true) {
            str = str + "-HIKED";
        }
    }
    else if (p_count_calc == "CALC") {
        if (is_peak_season == true) {
            str = str + "-HIKEDCALC";
        }
        else {
            str = str + "-CALC";
        }
    }
    return str;
}
// VERSION - 3.1 START
//***********************************************************
// Customization
//***********************************************************
function customizationSet(p_val) {
    is_customization_required = p_val;
    if (is_customization_required == true) {
        $("#customization_area").show();
    }
    else {
        $("#customization_area").hide();
    }

    if (car)
        getSelectedCar();
    customCarRateChange();
}
//END

function addCarDataQuickly(p_oneday_price, p_twoday_price, p_daycount) {
    var arr = [
        //add hatnimanta and zand hanuman mandir
        car_calculator.getCarPriceBasedOnKm("XCENT", "ONEDAY", [{ place: "ALL", toll: 0, }], p_oneday_price, p_daycount),
        car_calculator.getCarPriceBasedOnKm("ERTIGA", "ONEDAY", [{ place: "ALL", toll: 0 }], p_oneday_price, p_daycount),
        car_calculator.getCarPriceBasedOnKm("INNOVA", "ONEDAY", [{ place: "ALL", toll: 0 }], p_oneday_price, p_daycount),
        car_calculator.getCarPriceBasedOnKm("CRYSTA", "ONEDAY", [{ place: "ALL", toll: 0 }], p_oneday_price, p_daycount),
        car_calculator.getCarPriceBasedOnKm("TEMPO", "ONEDAY", [{ place: "ALL", toll: 0 }], p_oneday_price, p_daycount),
        car_calculator.getCarPriceBasedOnKm("29SEATER", "ONEDAY", [{ place: "ALL", toll: 0 }], p_oneday_price, p_daycount),
        car_calculator.getCarPriceBasedOnKm("56SEATER", "ONEDAY", [{ place: "ALL", toll: 0 }], p_oneday_price, p_daycount),

        //add hatnimanta and zand hanuman mandir
        car_calculator.getCarPriceBasedOnKm("XCENT", "TWODAYS", [{ place: "ALL", toll: 0 }], p_twoday_price, p_daycount),
        car_calculator.getCarPriceBasedOnKm("ERTIGA", "TWODAYS", [{ place: "ALL", toll: 0 }], p_twoday_price, p_daycount),
        car_calculator.getCarPriceBasedOnKm("INNOVA", "TWODAYS", [{ place: "ALL", toll: 0 }], p_twoday_price, p_daycount),
        car_calculator.getCarPriceBasedOnKm("CRYSTA", "TWODAYS", [{ place: "ALL", toll: 0 }], p_twoday_price, p_daycount),
        car_calculator.getCarPriceBasedOnKm("TEMPO", "TWODAYS", [{ place: "ALL", toll: 0 }], p_twoday_price, p_daycount),
        car_calculator.getCarPriceBasedOnKm("29SEATER", "TWODAYS", [{ place: "ALL", toll: 0 }], p_twoday_price, p_daycount),
        car_calculator.getCarPriceBasedOnKm("56SEATER", "TWODAYS", [{ place: "ALL", toll: 0 }], p_twoday_price, p_daycount)
    ];
    return arr;
}

function isPersonsSelected() {
    if (selected_destination_class.getTotalPersonsCount() == 0) {
        alert("Please select Members");
        return false;
    }
    return true;
}
function isDestinationPackageSet() {
    return selected_destination_class.setDestinationPackage();
}
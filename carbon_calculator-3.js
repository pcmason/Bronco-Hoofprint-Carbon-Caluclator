
"using strict";
function showResult()
{
    /**************************************
        CREATE TABLE RESULT
    ***************************************/
    let trans_total = parseFloat(trans_car_conv()) + parseFloat(trans_bus_conv()) + parseFloat(trans_bart_conv()) + parseFloat(trans_airplane_conv());
    let party_total = parseFloat(partying_conv());
    let cons_total = parseFloat(consumption_textbook_conv()) + parseFloat(consumption_clothing_conv()) + parseFloat(consumption_cellphone_conv()) + parseFloat(consumption_eReader_conv()) + parseFloat(consumption_plastic_bottle_conv()) +  parseFloat(consumption_coffee_conv());
    let energy_total= parseFloat(energy_audit_dorm_conv()) + parseFloat(energy_baseline_conv()) + parseFloat(energy_gas_baseline_conv());
    let food_total = parseFloat(food_conv());
    let waste_total = parseFloat(waste_conv());
    let water_total = parseFloat(water_conv());

    let graph_trans_total = parseFloat(trans_total.toFixed(1));
    let graph_party_total = parseFloat(party_total.toFixed(1));
    let graph_cons_total = parseFloat(cons_total.toFixed(1));
    let graph_energy_total = parseFloat(energy_total.toFixed(1));
    let graph_food_total = parseFloat(food_total.toFixed(1));
    let graph_waste_total = parseFloat(waste_total.toFixed(1));
    let graph_water_total = parseFloat(water_total.toFixed(1));

    let carbon_num_total = trans_total + party_total + cons_total + energy_total + food_total + waste_total + water_total;
    let graph_carbon_total = parseFloat(carbon_num_total.toFixed(2));

    $("#transportation_tab_total").html(trans_total.toFixed(2));
    $("#partying_tab_total").html(party_total.toFixed(2));
    $("#consumption_tab_total").html(cons_total.toFixed(2));
    $("#energy_tab_total").html(energy_total.toFixed(2));
    $("#food_tab_total").html(food_total.toFixed(2));
    $("#waste_tab_total").html(waste_total.toFixed(2));
    $("#water_tab_total").html(water_total.toFixed(2));
    $("#carbon_total").html(carbon_num_total.toFixed(2));

    $("#transportation_tab_percentage").html((trans_total/carbon_num_total*100).toFixed(2));
    $("#partying_tab_percentage").html((party_total/carbon_num_total*100).toFixed(2));
    $("#consumption_tab_percentage").html((cons_total/carbon_num_total*100).toFixed(2));
    $("#energy_tab_percentage").html((energy_total/carbon_num_total*100).toFixed(2));
    $("#food_tab_percentage").html((food_total/carbon_num_total*100).toFixed(2));
    $("#waste_tab_percentage").html((waste_total/carbon_num_total*100).toFixed(2));
    $("#water_tab_percentage").html((water_total/carbon_num_total*100).toFixed(2));
    $("#carbon_total_percentage").html((1*100).toFixed(2));
  
    
    /*******************************END OF TABLE RESULT ***************************

    *******************************START GRAPH ***************************/
     google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        let data = google.visualization.arrayToDataTable([
          ['Area', 'Total'],
          ['Transportation', trans_total],
          ['Party', party_total],
          ['Consumption', cons_total],
          ['Energy', energy_total],
          ['Food',food_total],
          ['Waste',waste_total],
          ['Water',water_total]
        ]);

        let options = {
          title: 'Your Carbon Consumption',
          is3D: true,
        };

        let chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
      }
}
    /*******************************END OF Graph ***************************

*******************************************
    Calculator page handler
*******************************************/

function display_question(action, field_name) {
    if (action=="show"){$("#"+field_name+"_q").show(500);}
    else if (action=="hide") {
        $("#"+field_name+"_q").hide(500);
        $("#"+field_name).val('');
    }
}

function display_tabs(action) {
    if (action=="show") {
        $("#transportation_tab").show(500);
        $("#partying_tab").show(700);
        $("#consumption_tab").show(900);
        $("#energy_tab").show(1100);
        $("#food_tab").show(1300);
        $("#waste_tab").show(1500);
        $("#water_tab").show(1700);
        $("#ethics_tab").show(1900);
        $("#result_tab").show(2100);
    }
    else if (action=="hide") {
        $("#transportation_tab").hide();
        $("#partying_tab").hide();
        $("#consumption_tab").hide();
        $("#energy_tab").hide();
        $("#food_tab").hide();
        $("#waste_tab").hide();
        $("#water_tab").hide();
        $("#ethics_tab").hide();
        $("#result_tab").hide();
    }
}

function display_comment(location, message) {
    $("#"+location).show();
    $("#"+location).html(message);
}

/*******************************************
    TRANSPORTATION
*******************************************/

function trans_car_select_handler() {
    car_type= $("#trans_select_car").val();
    if (car_type=="no_car"){display_question('hide','trans_input_car_miles');}
    else {
        display_question('show','trans_input_car_miles');
    }
}

function trans_car_conv(){
    let result=0.00;
    let car_type= $("#trans_select_car").val(); 
    if(car_type=="small")         {    result = $("#trans_input_car_miles").val() *0.1770274* 33; }
    else if (car_type=="average"){    result = $("#trans_input_car_miles").val() * 0.21404222 * 33; }
    else if (car_type=="suv")    {    result = $("#trans_input_car_miles").val() * 0.29450922 * 33; }
    else if (car_type=="hybrid") {    result = $("#trans_input_car_miles").val() * 0.13518456 * 33; }
    return result;
}

function trans_bus_conv() {
    let result=0.00;
    result = ($("#trans_input_bus_miles").val() * (1 / 0.62137) * 0.11104446 * (1/4) * 33);
    return result;
}

function trans_bart_conv() {
    let result=0.00;
    result = ($("#trans_input_bart_miles").val() * (1 / 0.62137) * 0.0965604 * (1/4) * 33);
    return result;
}


function trans_airplane_conv() {
    let result=0.00;
    result = ($("#trans_input_plane_miles").val() * (1 / 0.62137) * 1.09 * 0.1850741 * (1/4) * 33);
    return result;
}



/*******************************************
    PARTY
*******************************************/
function partying_conv() {
    let result=0;
    let red_cups=0;
    let beer=0
    red_cups = $("#amount_red_cups").val();
    beers = $("#partying_beers").val();
    result = $("#nights_partying").val() * (( red_cups* 0.085) + (beers * 0.5314))* 33;
    return result;
}



/*******************************************
    CONSUMPTION
*******************************************/

function consumption_textbook_conv() {
    let result=0.00;
    let soft_cover = $("#soft_cover_per_quarter").val();
    let hard_cover = $("#hard_cover_per_quarter").val();
    result = ((soft_cover* 2.71)+(hard_cover*7.46)) * 3;
    return result;
}

//this function handles clothing input
function consumption_clothing_conv() {
    let result=0.00;
    let amount_clothes = $("#clothing_per_month").val();
    result = (amount_clothes * .2756 * 6.5 / 4 * 33);
    return result;
}

//this function handles cellphone
function consumption_cellphone_conv() {
    let result = 0.00;
    let years_owned = $("#duration_owning_cell_phone").val();
    let which_cell = $("input[name='is_phone']:checked").val();
    if (which_cell == "smart_phone"){result = 85 + ( 28 / 2 * years_owned * (1/33));}
    else if (which_cell =="mobile_phone"){result = 60 + ( 88 / 4 * years_owned * (1/33));}
    return result;
}


function consumption_eReader_conv() {
    let result = 0.00;
    let years_owned = $("#duration_owning_eReader").val();
    let which_cell = $("input[name='is_eReader']:checked").val();
    if (which_cell == "iPad"){result = 130 + ( 2.72 * years_owned * (1/33));}
    else if (which_cell =="kindle"){result = 168 + ( .8 * years_owned * (1/33));}
    return result;
}

function consumption_plastic_bottle_conv() {
    let result=0.00;
    let total_bottles = 0;
    total_bottles = $("#consumption_plastic_bottle").val();
    result = (total_bottles * 0.828 * 231);
    return result;
}

 // function does not work, no corresponding values found in the index.html file 
 // like "#food_coffee_frequency" does not exist same with teh other one
function consumption_coffee_conv() {
    let result=0.00;
    let coffee_frequency= 0;
    let coffee_type_num = 0;
    let coffee_type=$("#food_coffee_type").val();

    coffee_frequency = $("#food_coffee_frequency").val();

    if (coffee_type=='black_coffee'){coffee_type_num = 284;}
        else if (coffee_type=='cream_sugar'){coffee_type_num=300;}
        else if (coffee_type=='latte'){coffee_type_num=380;}

    result = coffee_type_num * coffee_frequency * 1 / 1000 * 33;
    return 0.00;
}

/*******************************************
    ENERGY
*******************************************/

function fridge_calc(){
    let result=0.00;
    let num_fridges= $("#appliance_1_total").val();
    result= num_fridges * .753 * 24;
    return result;
}

function microwave_calc(){
    let result= 0.00;
    let num_microwaves= $("#appliance_2_total").val();
    result= num_microwaves * 1.44 * .5;
    return result;
}

function coffeemaker_calc(){
    let result= 0.00;
    let num_coffeemakers=$("#appliance_3_total").val();
    result = num_coffeemakers * 2 * .5;
    return result;
}

function UEboom_calc(){
    let result=0.00;
    let num_booms= $("#appliance_4_total").val();
    result= num_booms * .05 * 4;
    return result;
}

function desktop_comp_calc(){
    let result=0.00;
    let num_desk_comps= $("#appliance_5_total").val();
    result= num_desk_comps * 1.312 * 24;
    return result;
}

function labtop_calc(){
    let result=0.00;
    let num_labtops= $("#appliance_6_total").val();
    result= num_labtops * .04 * 8;
    return result;
}

function printer_calc(){
    let result=0.00;
    let num_printers= $("#appliance_7_total").val();
    result= num_printers * .006 * .15;
    return result;
}

function tv_calc(){
    let result=0.00;
    let num_tv= $("#appliance_8_total").val();
    result= num_tv * .0875 * 1.75;
    return result;
}

function air_conditioner_calc(){
    let result=0.00;
    let num_conditioners= $("#appliance_9_total").val();
    result= num_conditioners * 2 * 6;
    return result;
}

function fan_calc(){
    let result=0.00;
    let num_fans= $("#appliance_10_total").val();
    result= num_fans * .03 * 12;
    return result;
}

function heater_calc(){
    let result=0.00;
    let num_heaters= $("#appliance_11_total").val();
    result= num_heaters * 2 * 4;
    return result;
}

function incandescent_bulb_calc(){
    let result=0.00;
    let num_incbulbs= $("#appliance_12_total").val();
    result= num_incbulbs * .03 * 5;
    return result;
}

function compact_bulb_calc(){
    let result=0.00;
    let num_compbulbs= $("#appliance_13_total").val();
    result= num_compbulbs * .07 * 5;
    return result;
}

function vacuum_calc(){
    let result=0.00;
    let num_vacuums= $("#appliance_14_total").val();
    result= num_vacuums * .753 * 24;
    return result;
}

function energy_audit_dorm_conv(){
    let result=0.00;
    let device_total= 0.00;
    device_total= fridge_calc() + microwave_calc() + coffeemaker_calc() + UEboom_calc() + desktop_comp_calc() + labtop_calc() + printer_calc() + tv_calc() + air_conditioner_calc() + fan_calc() +heater_calc() + incandescent_bulb_calc() + compact_bulb_calc() + vacuum_calc();
    result = device_total * 49 * .001 * 7.85 * .354224 * 231;
    return result;
}

function energy_dorms_kwh() {
    let dorms = $("#energy_campus_resident").val();
    let dorms_value=0;
    let result = 0.00;

    if (dorms =="swig"){dorms_value= 17014.94 * 0.1;}
        else if (dorms=="sobrato"){dorms_value=20039.17 * 0.26; }
        else if (dorms=="sanfilippo"){dorms_value=3466.58 *0.10;}
        else if (dorms=="walsh"){dorms_value=11699.04 * 0.1;}
        else if (dorms=="graham"){dorms_value=18788.73 * 0.1;}
        else if (dorms=="dunne"){dorms_value=11326.92 * 0.1;}
        else if (dorms=="casa"){dorms_value=20234.21 * 0.26;}
        else if (dorms=="campisi"){dorms_value=8943.92 * 0.26;}
        else if (dorms=="clare"){dorms_value=2786.199 * 0.33;}
        else if (dorms=="nobili"){dorms_value=8513.42 * 0.1;}
        else if (dorms=="bellarmine"){dorms_value=3446.634 * 0.1;}
        else if (dorms=="none") {dorms_value=0.00;}

    result = dorms_value * 33;
    return result;
}

function energy_baseline_conv() {
    let result =0.00;
    let user_type= $("input[name='radio_commuter']:checked").val();
    let user_num = 0;

    if (user_type =="on_campus") {user_num= 1;}
        else if (user_type =="full_commuter") {user_num = 0.75;}

    result = ((28873922.81 * user_num) + energy_dorms_kwh()) / 10524 * 0.354224;
    return result;
}

function energy_gas_baseline_conv() {
    let apt_therms = 29.178;
    let result =0.00;
    let user_type= $("input[name='radio_commuter']:checked").val();
    let user_num=0;

    if (user_type =="on_campus") {user_num= 1.074;}
        else if (user_type =="full_commuter") {user_num = 0.75;}

    result = ((939439 * user_num / 10524) + apt_therms) / 52 * 33 * 11.7 / 2.204;
    return result;
}


/*******************************************
    FOOD
*******************************************/
function food_coffee_select_handler() {
    let coffee_type= $("#food_coffee_type").val();
    if (coffee_type=="none"){display_question('hide','food_coffee_frequency');}
    else {display_question('show','food_coffee_frequency');}
}

function food_conv() {
    let result=0.00;
    let diet_type_input= $("input[name='is_diet']:checked").val();
    let diet_type=0;
    if (diet_type_input =="vegan"){diet_type=2029;}
        else if (diet_type_input =="vegetarian"){diet_type=3427;}// We need to find out where these numbers came from!!!
        else if (diet_type_input =="meat_eater"){diet_type=6904;}
        else if (diet_type_input =="carnivore"){diet_type=7964;}
    let meal_plan_input = $("input[name='is_meal']:checked").val();
    let meal_type=0;
    if (meal_plan_input =="preferred"){meal_type=0;} // Also where these numbers came from.
        else if (meal_plan_input =="basic"){meal_type = 0.15;}
        else if (meal_plan_input =="junior_senior"){meal_type = 0.42;}
    result = (diet_type - (meal_type*diet_type))*1/1000*231;// Assume the 1/1000 is to change from grams to kg
    return result;
}


/*******************************************
    WASTE
*******************************************/
function waste_conv() {
    let commuter_input= $("input[name='radio_commuter']:checked").val();
    let recycle_input= $("input[name='radio_recycle']:checked").val();
    //let trash_input = $("input[name='radio_trash']:checked").val();

    let commuter_num = 0;
    let recycle_num =0;
    //let trash_num=0;
    let result1 = 0.00;
    let result2 = 0.00;
    let result3 = 0.00;
    let result = 0.00;

    if (commuter_input =="on_campus")    {commuter_num= 1;}//on campus resident+ employees who live on campus + others on campur=1
        else if (commuter_input =="full_commuter") {commuter_num = 0.75;}//not on campus: 

    if (recycle_input =="below_avg"){recycle_num = 0.07;}
        else if (recycle_input =="avg"){recycle_num = 0.17;}
        else{recycle_num = 0.27;}

    result1 = 1451.91 / 10524 * recycle_num * commuter_num / 52 * 33 * 2.79 * 1000;
    result2 = 1451.91 / 10524 * (1 - recycle_num) * commuter_num / 52 * 33 * 1.34 * 1000;
    result3 = 1451.91 / 10524 * commuter_num * 0.1 / 52 * 33 * 1.34 * 1000;
    result = result1 + result2;
    
    return result;

}


/*******************************************
    WATER
*******************************************/
function water_conv() {
    let baseline =0;
    let multiplier = 1;
    let result =1;

    let user_type = $("input[name='radio_commuter']:checked").val();
    let shower_duration = $("#water_showers_duration").val();
    let total_shower = $("#water_showers_times").val();
    let total_laundry = $("#water_laundry").val();
    let total_flush = $("#water_flush").val();
    //let total_cups = $("#water_cups").val();

    if(user_type =="on_campus"){baseline = 10538.709 * multiplier;}
        else if (user_type =="full_commuter") {baseline = 7904.031 * multiplier;}
//so I really could not tell you why this result is multiplied by (well before it was .000001) .001??
    result = baseline + (total_shower * 1.5 * 33) + (13.1 * (total_laundry / 4) * 33) + (1.6*total_flush * 7 * 33)/* + (total_cups * 0.0625 * 7 * 33)*/;
    result = (result * 3.785 * 0.001 * 352 );

    return result;
}


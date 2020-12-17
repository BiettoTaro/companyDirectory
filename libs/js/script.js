const card = (firstName, lastName, location, department, email) => {
    return (`
<div class="card m-1 col-6 col-md-4 col-lg-3 col-xl-2 shadow " style="width: 18rem;">
                <div class="row justify-content-between">
                    <i class="fas fa-trash-alt "></i>
                    <i class="fas fa-edit"></i>
                </div>
                <div class="card-body">
                    <h5 id="name" class="card-title">${firstName} ${lastName}</h5>
                    <p id="location" class="card-text">${location}
                    </p>
                    <p id="department">${department}</p>
                    <a href="" id="email" style="font-size : .75rem; ">${email}</a>
                </div>
            </div>`);
};


$(document).ready(function () {

    $(window).ready(function () {
        $.ajax({
            url: './libs/php/getAll.php',
            type: 'post',
            dataType: 'json',
            success: function (result) {

                // console.log(result);

                result.data.forEach(employee => {
                    // console.log(employee)

                    $('#main').append(card(employee.firstName, employee.lastName, employee.location, employee.department, employee.email));

                });
            }
        })
    });


    $( "#filter" ).submit(function( event ) {
        // let query = [];
        // $( this ).serializeArray().forEach(department => {
            
        //    query.push(department.value)
        // });
        event.preventDefault();
        const dataForm = $(this).serialize();

        $.ajax({
            url: './libs/php/getDepartmentByID.php',
            type: 'post',
            dataType: 'json',
            data: {
                id: dataForm
            },
            success: function(result) {
                console.log(result)
                
            }
        })

        // console.log( $( this ).serializeArray() );
        
      });








});
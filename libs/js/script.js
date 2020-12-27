
const card = (id, firstName, lastName, location, department, email) => {
    return (`
<div class="card m-1 col-6 col-md-4 col-lg-3 col-xl-2 shadow " style="width: 18rem;">
                <div class="row justify-content-between">
                    <span class="deleteBtn"><i class="fas fa-trash-alt "></i></span>
                    <span class="editBtn"><i id="" class="fas fa-edit"></i></span>
                </div>
                <div class="card-body">
                    <p class="id">${id}</p>
                    <h5 class="card-title"><span class="first">${firstName}</span> <span class="last">${lastName}</span></h5>
                    <p class="location card-text">${location}
                    </p>
                    <p class="department">${department}</p>
                    <a href="" class="email" style="font-size : .75rem; ">${email}</a>
                </div>
            </div>`);
};

const getDepartmentId = department => {
    switch (department) {
        case 'Human Resources':
            return 1;
        case 'Sales':
            return 2;
        case 'Marketing':
            return 3;
        case 'Legal':
            return 4;
        case 'Services':
            return 5;
        case 'Research and Development':
            return 6;
        case 'Product Management':
            return 7;
        case 'Training':
            return 8;
        case 'Support':
            return 9;
        case 'Engineering':
            return 10;
        case 'Accounting':
            return 11;
        case 'Businness Development':
            return 12;
        default:
            alert('insert valid department')
    }
}





$(document).ready(function () {
    
    $('#add').click(function(){
        $('#create').show()
                    $('.close').click(function () {
                        $('#create').hide();
                    });

                    window.onclick = function (event) {
                        if (event.target == $('#create')) {
                            $('#create').hide();
                        };
                    };
        })
   

    $(window).ready(function () {
        $.ajax({
            url: './libs/php/getAll.php',
            type: 'post',
            dataType: 'json',
            success: function (result) {
console.log(result)
                result.data.forEach(employee => {

                    $('#main').append(card(employee.id, employee.firstName, employee.lastName, employee.location, employee.department, employee.email));

                });
                
                $('.editBtn').click(event => {

                    $('#id').html($(event.currentTarget).parent().siblings().find('.id').html());
                    $('#UfirstName').val($(event.currentTarget).parent().siblings().find('.first').html());
                    $('#UlastName').val($(event.currentTarget).parent().siblings().find('.last').html());
                    $('#Ulocation').val($(event.currentTarget).parent().siblings().find('.location').html());
                    $('#Udepartment').val($(event.currentTarget).parent().siblings().find('.department').html());
                    $('#Uemail').val($(event.currentTarget).parent().siblings().find('.email').html());

                    $('#edit').show()
                    $('.close, #close').click(function () {
                        $('#edit').hide();
                    });

                    window.onclick = function (event) {
                        if (event.target == $('#edit')) {
                            $('#edit').hide();
                        };
                    };

                });
                $('.deleteBtn').click(event => {
                    $('#deleteID').html($(event.currentTarget).parent().siblings().find('.id').html());

                    $('#delete').show()
                    $('.close, #cancel').click(function () {
                        $('#delete').hide();
                    });

                    window.onclick = function (event) {
                        if (event.target == $('#delete')) {
                            $('#delete').hide();
                        };
                    };
                })

            }

        })
    });

    $('#createBtn').click(function(){
        $.ajax({
            url: './libs/php/insertPersonnel.php',
            type: 'post',
            dataType: 'json',
            data: {
                firstName: $('#CfirstName').val(),
                lastName: $('#ClastName').val(),
                jobTitle: $('#jobTitle').val(),
                departmentID: $('#Cdepartment').val(),
                email: $('#Cemail').val(),

            },
            success: function (result) {
                
                $('#create').hide();
                if(result.status.code == 200){
                    alert('Data updated successfully !');
                    location.reload();
                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                // your error code
                console.warn(jqXHR.responseText)
                console.log(errorThrown);
                console.log(textStatus);
                console.log(jqXHR);
            }
        });
    })

    $('#update').click(function () {
        $.ajax({
            url: './libs/php/updatePersonnel.php',
            type: 'post',
            dataType: 'json',
            data: {
                firstName: $('#UfirstName').val(),
                lastName: $('#UlastName').val(),
                departmentID: getDepartmentId($('#Udepartment').val()),
                email: $('#Uemail').val(),
                id: $('#id').text()
            },
            success: function (result) {
                $('#edit').hide();
                alert('Data updated successfully !');
                location.reload();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // your error code
                console.warn(jqXHR.responseText)
                console.log(errorThrown);
                console.log(textStatus);
                console.log(jqXHR);
            }
        });
    });

    $('#deleteBtn').click(function(){
        console.log('clicked')
        $.ajax({
            url: './libs/php/deletePersonnel.php',
            type: 'post',
            dataType: 'json',
            data: {
                id: $('#deleteID').text()
            },
            success: function (result) {

                if(result.status.code == 200){
                   $('#delete').hide();
                alert('Data deleted successfully !');
                location.reload();
                }
                

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // your error code
                console.warn(jqXHR.responseText)
                console.log(errorThrown);
                console.log(textStatus);
                console.log(jqXHR);
            }
        });
        console.log($('#deleteID').text())
    })


    $("#filter").submit(function (event) {
        let query = [];
        $(this).serializeArray().forEach(department => {

            query.push(department.value)
        });
        event.preventDefault();



        $.ajax({
            url: './libs/php/getDepartmentByID.php',
            type: 'post',
            dataType: 'json',
            data: {
                id: query.join()
            },
            success: function (data) {
                // console.log(data)
                const id = data.data[0].id
                const dep = data.data[0].name
                $.ajax({
                    url: './libs/php/getPersonnelByDep.php',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        depID: id
                    },
                    success: function (result) {
                        // console.log(result)

                        if ($('#main')) {
                            $('#main').html('');
                        }
                        result.data.forEach(employee => {
                            // console.log(employee)

                            $('#main').append(card(employee.firstName, employee.lastName, employee.location, employee.department, employee.email));

                        });
                    }
                })

            }
        })



    });


    $('#nameSearch').keyup(function () {

        $.ajax({
            url: './libs/php/getPersonnelByName.php',
            type: 'post',
            dataType: 'json',
            data: {
                name: $('#nameSearch').val()
            },
            success: function (result) {

                if ($('#main')) {
                    $('#main').html('');
                }
                result.data.forEach(employee => {
                    // console.log(employee)

                    $('#main').append(card(employee.firstName, employee.lastName, employee.location, employee.department, employee.email));

                });

            }
        })
    })





});